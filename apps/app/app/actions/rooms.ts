"use server";

import { auth } from "@clerk/nextjs";
import { PrismaClient } from "@repo/database";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation Schemas
const roomSchema = z.object({
  propertyId: z.string(),
  categoryId: z.string(),
  number: z.string().min(1).max(50),
  floor: z.string().optional(),
  bookable: z.boolean().default(true),
  status: z
    .enum(["AVAILABLE", "OCCUPIED", "CLEANING", "MAINTENANCE", "BLOCKED"])
    .default("AVAILABLE"),
  overrides: z.record(z.any()).optional(),
  specificCIN: z.string().optional(),
  maintenanceMode: z.boolean().default(false),
  maintenanceFrom: z.date().optional(),
  maintenanceTo: z.date().optional(),
  maintenanceNote: z.string().optional(),
  order: z.number().int().min(0).default(0),
});

/**
 * Get all rooms for a property
 */
export async function getRooms(propertyId: string) {
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

    const rooms = await prisma.room.findMany({
      where: {
        propertyId,
        deletedAt: null,
      },
      include: {
        category: true,
        amenities: {
          include: {
            amenity: true,
          },
        },
        availabilityBlocks: {
          where: {
            deletedAt: null,
          },
        },
      },
      orderBy: [{ category: { order: "asc" } }, { order: "asc" }],
    });

    return { success: true, data: rooms };
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return { success: false, error: "Failed to fetch rooms" };
  }
}

/**
 * Get rooms by category
 */
export async function getRoomsByCategory(categoryId: string) {
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
    });

    if (!category) {
      return { success: false, error: "Room category not found" };
    }

    const rooms = await prisma.room.findMany({
      where: {
        categoryId,
        deletedAt: null,
      },
      include: {
        category: true,
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
      orderBy: {
        order: "asc",
      },
    });

    return { success: true, data: rooms };
  } catch (error) {
    console.error("Error fetching rooms by category:", error);
    return { success: false, error: "Failed to fetch rooms" };
  }
}

/**
 * Get a single room by ID
 */
export async function getRoom(id: string) {
  const { userId, orgId } = auth();

  if (!(userId && orgId)) {
    throw new Error("Unauthorized");
  }

  try {
    const room = await prisma.room.findFirst({
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
        category: true,
        amenities: {
          include: {
            amenity: true,
          },
        },
        availabilityBlocks: {
          where: { deletedAt: null },
          orderBy: { startDate: "asc" },
        },
      },
    });

    if (!room) {
      return { success: false, error: "Room not found" };
    }

    return { success: true, data: room };
  } catch (error) {
    console.error("Error fetching room:", error);
    return { success: false, error: "Failed to fetch room" };
  }
}

/**
 * Create a new room
 */
export async function createRoom(data: z.infer<typeof roomSchema>) {
  const { userId, orgId } = auth();

  if (!(userId && orgId)) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify property and category belong to organization
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

    const category = await prisma.roomCategory.findFirst({
      where: {
        id: data.categoryId,
        propertyId: data.propertyId,
        deletedAt: null,
      },
    });

    if (!category) {
      return { success: false, error: "Room category not found" };
    }

    // Check for duplicate room number
    const existing = await prisma.room.findFirst({
      where: {
        propertyId: data.propertyId,
        number: data.number,
        deletedAt: null,
      },
    });

    if (existing) {
      return {
        success: false,
        error: `Room ${data.number} already exists in this property`,
      };
    }

    // Validate input
    const validatedData = roomSchema.parse(data);

    // Create room
    const room = await prisma.room.create({
      data: {
        ...validatedData,
        overrides: validatedData.overrides || null,
      },
      include: {
        category: true,
      },
    });

    revalidatePath(`/properties/${data.propertyId}/rooms`);

    return { success: true, data: room };
  } catch (error) {
    console.error("Error creating room:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation error",
        details: error.errors,
      };
    }
    return { success: false, error: "Failed to create room" };
  }
}

/**
 * Update a room
 */
export async function updateRoom(
  id: string,
  data: Partial<z.infer<typeof roomSchema>>
) {
  const { userId, orgId } = auth();

  if (!(userId && orgId)) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify room belongs to organization
    const existing = await prisma.room.findFirst({
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
      return { success: false, error: "Room not found" };
    }

    // Validate partial data
    const partialSchema = roomSchema.partial();
    const validatedData = partialSchema.parse(data);

    // Update room
    const room = await prisma.room.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath(`/properties/${existing.propertyId}/rooms`);

    return { success: true, data: room };
  } catch (error) {
    console.error("Error updating room:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation error",
        details: error.errors,
      };
    }
    return { success: false, error: "Failed to update room" };
  }
}

/**
 * Delete a room (soft delete)
 */
export async function deleteRoom(id: string) {
  const { userId, orgId } = auth();

  if (!(userId && orgId)) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify room belongs to organization
    const existing = await prisma.room.findFirst({
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
      return { success: false, error: "Room not found" };
    }

    // Soft delete
    const room = await prisma.room.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    revalidatePath(`/properties/${existing.propertyId}/rooms`);

    return { success: true, data: room };
  } catch (error) {
    console.error("Error deleting room:", error);
    return { success: false, error: "Failed to delete room" };
  }
}

/**
 * Set room to maintenance mode
 */
export async function setRoomMaintenance(
  id: string,
  maintenanceMode: boolean,
  from?: Date,
  to?: Date,
  note?: string
) {
  const { userId, orgId } = auth();

  if (!(userId && orgId)) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify room belongs to organization
    const existing = await prisma.room.findFirst({
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
      return { success: false, error: "Room not found" };
    }

    // Update room
    const room = await prisma.room.update({
      where: { id },
      data: {
        maintenanceMode,
        maintenanceFrom: from || null,
        maintenanceTo: to || null,
        maintenanceNote: note || null,
        status: maintenanceMode ? "MAINTENANCE" : "AVAILABLE",
      },
    });

    revalidatePath(`/properties/${existing.propertyId}/rooms`);
    revalidatePath(`/properties/${existing.propertyId}/availability`);

    return { success: true, data: room };
  } catch (error) {
    console.error("Error setting room maintenance:", error);
    return { success: false, error: "Failed to update maintenance status" };
  }
}

/**
 * Bulk update rooms
 */
export async function bulkUpdateRooms(
  roomIds: string[],
  data: { floor?: string; bookable?: boolean; status?: string }
) {
  const { userId, orgId } = auth();

  if (!(userId && orgId)) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify all rooms belong to organization
    const rooms = await prisma.room.findMany({
      where: {
        id: { in: roomIds },
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

    if (rooms.length !== roomIds.length) {
      return { success: false, error: "Some rooms not found" };
    }

    // Update all rooms
    await prisma.room.updateMany({
      where: {
        id: { in: roomIds },
      },
      data,
    });

    // Revalidate all affected properties
    const propertyIds = [...new Set(rooms.map((r) => r.propertyId))];
    for (const propId of propertyIds) {
      revalidatePath(`/properties/${propId}/rooms`);
    }

    return { success: true, count: rooms.length };
  } catch (error) {
    console.error("Error bulk updating rooms:", error);
    return { success: false, error: "Failed to bulk update rooms" };
  }
}
