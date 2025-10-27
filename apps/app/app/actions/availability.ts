"use server";

import { auth } from "@repo/auth/server";
import { PrismaClient } from "@repo/database";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation Schema
const availabilityBlockSchema = z.object({
  roomId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
});

/**
 * Get availability for a property within a date range
 */
export async function getAvailability(
  propertyId: string,
  startDate: Date,
  endDate: Date
) {
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

    // Get all rooms with their blocks
    const rooms = await prisma.room.findMany({
      where: {
        propertyId,
        deletedAt: null,
      },
      include: {
        category: true,
        availabilityBlocks: {
          where: {
            deletedAt: null,
            OR: [
              {
                AND: [
                  { startDate: { lte: endDate } },
                  { endDate: { gte: startDate } },
                ],
              },
            ],
          },
        },
      },
      orderBy: [{ category: { order: "asc" } }, { order: "asc" }],
    });

    return { success: true, data: rooms };
  } catch (error) {
    console.error("Error fetching availability:", error);
    return { success: false, error: "Failed to fetch availability" };
  }
}

/**
 * Create an availability block (manual block/maintenance)
 */
export async function createAvailabilityBlock(
  data: z.infer<typeof availabilityBlockSchema>
) {
  const { userId, orgId } = auth();

  if (!(userId && orgId)) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify room belongs to organization
    const room = await prisma.room.findFirst({
      where: {
        id: data.roomId,
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

    // Validate input
    const validatedData = availabilityBlockSchema.parse(data);

    // Check date validity
    if (validatedData.endDate <= validatedData.startDate) {
      return { success: false, error: "End date must be after start date" };
    }

    // Get user ID
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Create block
    const block = await prisma.availabilityBlock.create({
      data: {
        ...validatedData,
        createdBy: user.id,
      },
    });

    revalidatePath(`/properties/${room.propertyId}/availability`);

    return { success: true, data: block };
  } catch (error) {
    console.error("Error creating availability block:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation error",
        details: error.errors,
      };
    }
    return { success: false, error: "Failed to create availability block" };
  }
}

/**
 * Delete an availability block
 */
export async function deleteAvailabilityBlock(id: string) {
  const { userId, orgId } = auth();

  if (!(userId && orgId)) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify block belongs to organization
    const existing = await prisma.availabilityBlock.findFirst({
      where: {
        id,
        deletedAt: null,
        room: {
          property: {
            organizationId: orgId,
            deletedAt: null,
          },
        },
      },
      include: {
        room: {
          include: {
            property: true,
          },
        },
      },
    });

    if (!existing) {
      return { success: false, error: "Availability block not found" };
    }

    // Soft delete
    const block = await prisma.availabilityBlock.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    revalidatePath(`/properties/${existing.room.propertyId}/availability`);

    return { success: true, data: block };
  } catch (error) {
    console.error("Error deleting availability block:", error);
    return { success: false, error: "Failed to delete availability block" };
  }
}

/**
 * Get available rooms for a date range
 */
export async function getAvailableRooms(
  propertyId: string,
  startDate: Date,
  endDate: Date
) {
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

    // Get all rooms
    const allRooms = await prisma.room.findMany({
      where: {
        propertyId,
        deletedAt: null,
        bookable: true,
        status: { not: "MAINTENANCE" },
      },
      include: {
        category: true,
        availabilityBlocks: {
          where: {
            deletedAt: null,
            OR: [
              {
                AND: [
                  { startDate: { lte: endDate } },
                  { endDate: { gte: startDate } },
                ],
              },
            ],
          },
        },
      },
    });

    // Filter out rooms with availability blocks
    const availableRooms = allRooms.filter(
      (room) => room.availabilityBlocks.length === 0
    );

    return { success: true, data: availableRooms };
  } catch (error) {
    console.error("Error fetching available rooms:", error);
    return { success: false, error: "Failed to fetch available rooms" };
  }
}

/**
 * Get occupancy statistics for a property
 */
export async function getOccupancyStats(
  propertyId: string,
  startDate: Date,
  endDate: Date
) {
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

    // Get total rooms
    const totalRooms = await prisma.room.count({
      where: {
        propertyId,
        deletedAt: null,
        bookable: true,
      },
    });

    // Get blocked rooms
    const blockedRooms = await prisma.availabilityBlock.count({
      where: {
        deletedAt: null,
        room: {
          propertyId,
          deletedAt: null,
        },
        OR: [
          {
            AND: [
              { startDate: { lte: endDate } },
              { endDate: { gte: startDate } },
            ],
          },
        ],
      },
    });

    // Calculate availability percentage
    const availableRooms = totalRooms - blockedRooms;
    const availabilityPercentage =
      totalRooms > 0 ? Math.round((availableRooms / totalRooms) * 100) : 0;

    return {
      success: true,
      data: {
        totalRooms,
        availableRooms,
        blockedRooms,
        availabilityPercentage,
      },
    };
  } catch (error) {
    console.error("Error fetching occupancy stats:", error);
    return { success: false, error: "Failed to fetch occupancy statistics" };
  }
}
