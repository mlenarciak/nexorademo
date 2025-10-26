"use server";

import { auth } from "@clerk/nextjs";
import { PrismaClient } from "@repo/database";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation Schema
const amenitySchema = z.object({
  name: z.string().min(2).max(100),
  i18nKey: z.string().min(2),
  category: z.enum([
    "ROOM_FEATURES",
    "BATHROOM",
    "ENTERTAINMENT",
    "KITCHEN",
    "SAFETY",
    "ACCESSIBILITY",
    "OUTDOOR",
    "SERVICES",
    "CUSTOM",
  ]),
  icon: z.string().optional(),
  description: z.string().optional(),
  isCustom: z.boolean().default(false),
});

/**
 * Get all amenities
 */
export async function getAmenities() {
  try {
    const amenities = await prisma.amenity.findMany({
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });

    return { success: true, data: amenities };
  } catch (error) {
    console.error("Error fetching amenities:", error);
    return { success: false, error: "Failed to fetch amenities" };
  }
}

/**
 * Get amenities by category
 */
export async function getAmenitiesByCategory(category: string) {
  try {
    const amenities = await prisma.amenity.findMany({
      where: { category: category as any },
      orderBy: { name: "asc" },
    });

    return { success: true, data: amenities };
  } catch (error) {
    console.error("Error fetching amenities by category:", error);
    return { success: false, error: "Failed to fetch amenities" };
  }
}

/**
 * Create a custom amenity
 */
export async function createAmenity(data: z.infer<typeof amenitySchema>) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    // Validate input
    const validatedData = amenitySchema.parse(data);

    // Check for duplicate i18nKey
    const existing = await prisma.amenity.findUnique({
      where: { i18nKey: validatedData.i18nKey },
    });

    if (existing) {
      return { success: false, error: "Amenity with this key already exists" };
    }

    // Get user ID from Clerk
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true },
    });

    // Create amenity
    const amenity = await prisma.amenity.create({
      data: {
        ...validatedData,
        createdBy: user?.id,
      },
    });

    revalidatePath("/properties");

    return { success: true, data: amenity };
  } catch (error) {
    console.error("Error creating amenity:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation error",
        details: error.errors,
      };
    }
    return { success: false, error: "Failed to create amenity" };
  }
}

/**
 * Update an amenity
 */
export async function updateAmenity(
  id: string,
  data: Partial<z.infer<typeof amenitySchema>>
) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    // Validate partial data
    const partialSchema = amenitySchema.partial();
    const validatedData = partialSchema.parse(data);

    // Update amenity
    const amenity = await prisma.amenity.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath("/properties");

    return { success: true, data: amenity };
  } catch (error) {
    console.error("Error updating amenity:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation error",
        details: error.errors,
      };
    }
    return { success: false, error: "Failed to update amenity" };
  }
}

/**
 * Delete an amenity
 */
export async function deleteAmenity(id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    // Check if amenity is in use
    const [propertyCount, categoryCount, roomCount] = await Promise.all([
      prisma.propertyAmenity.count({ where: { amenityId: id } }),
      prisma.categoryAmenity.count({ where: { amenityId: id } }),
      prisma.roomAmenity.count({ where: { amenityId: id } }),
    ]);

    const totalUse = propertyCount + categoryCount + roomCount;

    if (totalUse > 0) {
      return {
        success: false,
        error: `Cannot delete amenity. It is used in ${totalUse} location(s)`,
      };
    }

    // Delete amenity
    await prisma.amenity.delete({
      where: { id },
    });

    revalidatePath("/properties");

    return { success: true };
  } catch (error) {
    console.error("Error deleting amenity:", error);
    return { success: false, error: "Failed to delete amenity" };
  }
}

/**
 * Get amenities for a specific room
 */
export async function getRoomAmenities(roomId: string) {
  const { userId, orgId } = auth();

  if (!(userId && orgId)) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify room belongs to organization
    const room = await prisma.room.findFirst({
      where: {
        id: roomId,
        deletedAt: null,
        property: {
          organizationId: orgId,
          deletedAt: null,
        },
      },
      include: {
        amenities: {
          include: {
            amenity: true,
          },
        },
        category: {
          include: {
            amenities: {
              include: {
                amenity: true,
              },
            },
          },
        },
        property: {
          include: {
            amenities: {
              include: {
                amenity: true,
              },
            },
          },
        },
      },
    });

    if (!room) {
      return { success: false, error: "Room not found" };
    }

    // Combine property, category, and room amenities
    const propertyAmenities = room.property.amenities.map((a) => ({
      ...a.amenity,
      source: "property",
    }));
    const categoryAmenities = room.category.amenities.map((a) => ({
      ...a.amenity,
      source: "category",
    }));
    const roomAmenities = room.amenities.map((a) => ({
      ...a.amenity,
      source: "room",
    }));

    // Remove duplicates, prioritize room > category > property
    const allAmenities = [
      ...roomAmenities,
      ...categoryAmenities.filter(
        (ca) => !roomAmenities.find((ra) => ra.id === ca.id)
      ),
      ...propertyAmenities.filter(
        (pa) =>
          !(
            roomAmenities.find((ra) => ra.id === pa.id) ||
            categoryAmenities.find((ca) => ca.id === pa.id)
          )
      ),
    ];

    return { success: true, data: allAmenities };
  } catch (error) {
    console.error("Error fetching room amenities:", error);
    return { success: false, error: "Failed to fetch room amenities" };
  }
}

/**
 * Assign amenities to a room
 */
export async function assignAmenitiesToRoom(
  roomId: string,
  amenityIds: string[]
) {
  const { userId, orgId } = auth();

  if (!(userId && orgId)) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify room belongs to organization
    const room = await prisma.room.findFirst({
      where: {
        id: roomId,
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

    if (!room) {
      return { success: false, error: "Room not found" };
    }

    // Delete existing amenity associations
    await prisma.roomAmenity.deleteMany({
      where: { roomId },
    });

    // Create new associations
    if (amenityIds.length > 0) {
      await prisma.roomAmenity.createMany({
        data: amenityIds.map((amenityId) => ({
          roomId,
          amenityId,
        })),
      });
    }

    revalidatePath(`/properties/${room.propertyId}/rooms/${roomId}`);

    return { success: true };
  } catch (error) {
    console.error("Error assigning amenities to room:", error);
    return { success: false, error: "Failed to assign amenities" };
  }
}
