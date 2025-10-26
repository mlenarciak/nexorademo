"use server";

import { auth } from "@clerk/nextjs";
import { PrismaClient } from "@repo/database";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation Schemas
const bedConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  beds: z.array(
    z.object({
      type: z.string(),
      count: z.number().positive(),
    })
  ),
});

const roomCategorySchema = z.object({
  propertyId: z.string(),
  name: z.string().min(2).max(100),
  shortName: z.string().max(20).optional(),
  description: z.string().optional(),
  minCapacity: z.number().int().positive(),
  maxCapacity: z.number().int().positive(),
  extraCapacity: z.number().int().min(0).default(0),
  extraCapacityTypes: z.record(z.number()).optional(),
  size: z.number().positive().optional(),
  floor: z.string().optional(),
  bedConfigurations: z.array(bedConfigSchema),
  defaultBedConfig: bedConfigSchema,
  petsAllowed: z.boolean().default(false),
  maxPets: z.number().int().positive().optional(),
  smokingAllowed: z.boolean().default(false),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i)
    .default("#3B82F6"),
  order: z.number().int().min(0).default(0),
  photos: z.array(z.object({ url: z.string(), alt: z.string() })).default([]),
  videos: z.array(z.string()).optional(),
  virtualTour: z.string().url().optional(),
});

/**
 * Get all room categories for a property
 */
export async function getRoomCategories(propertyId: string) {
  const { userId, orgId } = auth();

  if (!(userId && orgId)) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify property belongs to organization
    const property = await prisma.property.findFirst({
      where: {
        id: propertyId,
        organizationId: orgId,
        deletedAt: null,
      },
    });

    if (!property) {
      return { success: false, error: "Property not found" };
    }

    const categories = await prisma.roomCategory.findMany({
      where: {
        propertyId,
        deletedAt: null,
      },
      include: {
        rooms: {
          where: { deletedAt: null },
          orderBy: { order: "asc" },
        },
        amenities: {
          include: {
            amenity: true,
          },
        },
        _count: {
          select: {
            rooms: true,
          },
        },
      },
      orderBy: {
        order: "asc",
      },
    });

    return { success: true, data: categories };
  } catch (error) {
    console.error("Error fetching room categories:", error);
    return { success: false, error: "Failed to fetch room categories" };
  }
}

/**
 * Get a single room category by ID
 */
export async function getRoomCategory(id: string) {
  const { userId, orgId } = auth();

  if (!(userId && orgId)) {
    throw new Error("Unauthorized");
  }

  try {
    const category = await prisma.roomCategory.findFirst({
      where: {
        id,
        deletedAt: null,
        property: {
          organizationId: orgId,
          deletedAt: null,
        },
      },
      include: {
        property: true,
        rooms: {
          where: { deletedAt: null },
          orderBy: { order: "asc" },
        },
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
    });

    if (!category) {
      return { success: false, error: "Room category not found" };
    }

    return { success: true, data: category };
  } catch (error) {
    console.error("Error fetching room category:", error);
    return { success: false, error: "Failed to fetch room category" };
  }
}

/**
 * Create a new room category
 */
export async function createRoomCategory(
  data: z.infer<typeof roomCategorySchema>
) {
  const { userId, orgId } = auth();

  if (!(userId && orgId)) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify property belongs to organization
    const property = await prisma.property.findFirst({
      where: {
        id: data.propertyId,
        organizationId: orgId,
        deletedAt: null,
      },
    });

    if (!property) {
      return { success: false, error: "Property not found" };
    }

    // Validate input
    const validatedData = roomCategorySchema.parse(data);

    // Validate capacity
    if (validatedData.minCapacity > validatedData.maxCapacity) {
      return {
        success: false,
        error: "Min capacity cannot exceed max capacity",
      };
    }

    // Create room category
    const category = await prisma.roomCategory.create({
      data: {
        ...validatedData,
        extraCapacityTypes: validatedData.extraCapacityTypes || {},
        photos: validatedData.photos || [],
        videos: validatedData.videos || [],
      },
    });

    revalidatePath(`/properties/${data.propertyId}`);
    revalidatePath(`/properties/${data.propertyId}/rooms`);

    return { success: true, data: category };
  } catch (error) {
    console.error("Error creating room category:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation error",
        details: error.errors,
      };
    }
    return { success: false, error: "Failed to create room category" };
  }
}

/**
 * Update a room category
 */
export async function updateRoomCategory(
  id: string,
  data: Partial<z.infer<typeof roomCategorySchema>>
) {
  const { userId, orgId } = auth();

  if (!(userId && orgId)) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify category belongs to organization
    const existing = await prisma.roomCategory.findFirst({
      where: {
        id,
        deletedAt: null,
        property: {
          organizationId: orgId,
          deletedAt: null,
        },
      },
      include: {
        property: true,
      },
    });

    if (!existing) {
      return { success: false, error: "Room category not found" };
    }

    // Validate partial data
    const partialSchema = roomCategorySchema.partial();
    const validatedData = partialSchema.parse(data);

    // Update category
    const category = await prisma.roomCategory.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath(`/properties/${existing.propertyId}`);
    revalidatePath(`/properties/${existing.propertyId}/rooms`);

    return { success: true, data: category };
  } catch (error) {
    console.error("Error updating room category:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation error",
        details: error.errors,
      };
    }
    return { success: false, error: "Failed to update room category" };
  }
}

/**
 * Delete a room category (soft delete)
 */
export async function deleteRoomCategory(id: string) {
  const { userId, orgId } = auth();

  if (!(userId && orgId)) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify category belongs to organization
    const existing = await prisma.roomCategory.findFirst({
      where: {
        id,
        deletedAt: null,
        property: {
          organizationId: orgId,
          deletedAt: null,
        },
      },
      include: {
        property: true,
        rooms: {
          where: { deletedAt: null },
        },
      },
    });

    if (!existing) {
      return { success: false, error: "Room category not found" };
    }

    // Check if category has rooms
    if (existing.rooms.length > 0) {
      return {
        success: false,
        error: `Cannot delete category with ${existing.rooms.length} active room(s)`,
      };
    }

    // Soft delete
    const category = await prisma.roomCategory.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    revalidatePath(`/properties/${existing.propertyId}`);
    revalidatePath(`/properties/${existing.propertyId}/rooms`);

    return { success: true, data: category };
  } catch (error) {
    console.error("Error deleting room category:", error);
    return { success: false, error: "Failed to delete room category" };
  }
}

/**
 * Assign amenities to a room category
 */
export async function assignAmenitiesToCategory(
  categoryId: string,
  amenityIds: string[]
) {
  const { userId, orgId } = auth();

  if (!(userId && orgId)) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify category belongs to organization
    const category = await prisma.roomCategory.findFirst({
      where: {
        id: categoryId,
        deletedAt: null,
        property: {
          organizationId: orgId,
          deletedAt: null,
        },
      },
      include: {
        property: true,
      },
    });

    if (!category) {
      return { success: false, error: "Room category not found" };
    }

    // Delete existing amenity associations
    await prisma.categoryAmenity.deleteMany({
      where: { categoryId },
    });

    // Create new associations
    await prisma.categoryAmenity.createMany({
      data: amenityIds.map((amenityId) => ({
        categoryId,
        amenityId,
      })),
    });

    revalidatePath(
      `/properties/${category.propertyId}/rooms/categories/${categoryId}`
    );

    return { success: true };
  } catch (error) {
    console.error("Error assigning amenities:", error);
    return { success: false, error: "Failed to assign amenities" };
  }
}
