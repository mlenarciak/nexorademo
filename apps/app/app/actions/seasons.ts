"use server";

import { auth } from "@clerk/nextjs";
import { PrismaClient } from "@repo/database";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation Schema
const seasonSchema = z.object({
  propertyId: z.string(),
  name: z.string().min(2).max(100),
  startDate: z.date(),
  endDate: z.date(),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i)
    .default("#3B82F6"),
});

/**
 * Get all seasons for a property
 */
export async function getSeasons(propertyId: string) {
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

    const seasons = await prisma.season.findMany({
      where: {
        propertyId,
        deletedAt: null,
      },
      orderBy: {
        startDate: "asc",
      },
    });

    return { success: true, data: seasons };
  } catch (error) {
    console.error("Error fetching seasons:", error);
    return { success: false, error: "Failed to fetch seasons" };
  }
}

/**
 * Create a new season
 */
export async function createSeason(data: z.infer<typeof seasonSchema>) {
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
    const validatedData = seasonSchema.parse(data);

    // Check date validity
    if (validatedData.endDate <= validatedData.startDate) {
      return { success: false, error: "End date must be after start date" };
    }

    // Check for overlapping seasons
    const overlapping = await prisma.season.findFirst({
      where: {
        propertyId: data.propertyId,
        deletedAt: null,
        OR: [
          {
            AND: [
              { startDate: { lte: validatedData.startDate } },
              { endDate: { gte: validatedData.startDate } },
            ],
          },
          {
            AND: [
              { startDate: { lte: validatedData.endDate } },
              { endDate: { gte: validatedData.endDate } },
            ],
          },
          {
            AND: [
              { startDate: { gte: validatedData.startDate } },
              { endDate: { lte: validatedData.endDate } },
            ],
          },
        ],
      },
    });

    if (overlapping) {
      return {
        success: false,
        error: `Season overlaps with existing season: ${overlapping.name}`,
      };
    }

    // Create season
    const season = await prisma.season.create({
      data: validatedData,
    });

    revalidatePath(`/properties/${data.propertyId}`);
    revalidatePath(`/properties/${data.propertyId}/availability`);

    return { success: true, data: season };
  } catch (error) {
    console.error("Error creating season:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation error",
        details: error.errors,
      };
    }
    return { success: false, error: "Failed to create season" };
  }
}

/**
 * Update a season
 */
export async function updateSeason(
  id: string,
  data: Partial<z.infer<typeof seasonSchema>>
) {
  const { userId, orgId } = auth();

  if (!(userId && orgId)) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify season belongs to organization
    const existing = await prisma.season.findFirst({
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
      return { success: false, error: "Season not found" };
    }

    // Validate partial data
    const partialSchema = seasonSchema.partial();
    const validatedData = partialSchema.parse(data);

    // If dates are being changed, check for overlaps
    if (validatedData.startDate || validatedData.endDate) {
      const newStart = validatedData.startDate || existing.startDate;
      const newEnd = validatedData.endDate || existing.endDate;

      if (newEnd <= newStart) {
        return { success: false, error: "End date must be after start date" };
      }

      // Check for overlaps with other seasons
      const overlapping = await prisma.season.findFirst({
        where: {
          id: { not: id },
          propertyId: existing.propertyId,
          deletedAt: null,
          OR: [
            {
              AND: [
                { startDate: { lte: newStart } },
                { endDate: { gte: newStart } },
              ],
            },
            {
              AND: [
                { startDate: { lte: newEnd } },
                { endDate: { gte: newEnd } },
              ],
            },
            {
              AND: [
                { startDate: { gte: newStart } },
                { endDate: { lte: newEnd } },
              ],
            },
          ],
        },
      });

      if (overlapping) {
        return {
          success: false,
          error: `Season would overlap with: ${overlapping.name}`,
        };
      }
    }

    // Update season
    const season = await prisma.season.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath(`/properties/${existing.propertyId}`);
    revalidatePath(`/properties/${existing.propertyId}/availability`);

    return { success: true, data: season };
  } catch (error) {
    console.error("Error updating season:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation error",
        details: error.errors,
      };
    }
    return { success: false, error: "Failed to update season" };
  }
}

/**
 * Delete a season (soft delete)
 */
export async function deleteSeason(id: string) {
  const { userId, orgId } = auth();

  if (!(userId && orgId)) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify season belongs to organization
    const existing = await prisma.season.findFirst({
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
      return { success: false, error: "Season not found" };
    }

    // Soft delete
    const season = await prisma.season.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    revalidatePath(`/properties/${existing.propertyId}`);
    revalidatePath(`/properties/${existing.propertyId}/availability`);

    return { success: true, data: season };
  } catch (error) {
    console.error("Error deleting season:", error);
    return { success: false, error: "Failed to delete season" };
  }
}
