'use server'

import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@repo/database';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation Schemas
const propertySchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(100),
  type: z.enum(['BNB', 'RESORT_VILLAGGI', 'OPEN_AIR_RESORT', 'SMALL_HOTEL', 'HOSTEL', 'VACATION_RENTAL', 'OTHER']),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().optional(),
  postalCode: z.string(),
  country: z.string().length(2),
  phone: z.string().min(10),
  email: z.string().email(),
  website: z.string().url().optional().or(z.literal('')),
  logoUrl: z.string().url().optional().or(z.literal('')),
  // Fiscal
  vatNumber: z.string().optional(),
  fiscalCode: z.string().optional(),
  cin: z.string().optional(),
  cir: z.string().optional(),
  brazilianTaxId: z.string().optional(),
  // Operational
  checkInTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  checkOutTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  currency: z.string().length(3),
  timezone: z.string(),
  status: z.enum(['SETUP', 'ACTIVE', 'INACTIVE', 'SUSPENDED']).optional(),
  settings: z.record(z.any()).optional(),
});

/**
 * Get all properties for the current organization
 */
export async function getProperties() {
  const { userId, orgId } = auth();
  
  if (!userId || !orgId) {
    throw new Error('Unauthorized');
  }

  try {
    const properties = await prisma.property.findMany({
      where: {
        organizationId: orgId,
        deletedAt: null,
      },
      include: {
        roomCategories: {
          where: { deletedAt: null },
          include: {
            rooms: {
              where: { deletedAt: null },
            },
          },
        },
        _count: {
          select: {
            rooms: true,
            roomCategories: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { success: true, data: properties };
  } catch (error) {
    console.error('Error fetching properties:', error);
    return { success: false, error: 'Failed to fetch properties' };
  }
}

/**
 * Get a single property by ID
 */
export async function getProperty(id: string) {
  const { userId, orgId } = auth();
  
  if (!userId || !orgId) {
    throw new Error('Unauthorized');
  }

  try {
    const property = await prisma.property.findFirst({
      where: {
        id,
        organizationId: orgId,
        deletedAt: null,
      },
      include: {
        roomCategories: {
          where: { deletedAt: null },
          include: {
            rooms: {
              where: { deletedAt: null },
            },
          },
        },
        seasons: {
          where: { deletedAt: null },
        },
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
    });

    if (!property) {
      return { success: false, error: 'Property not found' };
    }

    return { success: true, data: property };
  } catch (error) {
    console.error('Error fetching property:', error);
    return { success: false, error: 'Failed to fetch property' };
  }
}

/**
 * Create a new property
 */
export async function createProperty(data: z.infer<typeof propertySchema>) {
  const { userId, orgId } = auth();
  
  if (!userId || !orgId) {
    throw new Error('Unauthorized');
  }

  try {
    // Validate input
    const validatedData = propertySchema.parse(data);

    // Generate slug from name
    const slug = validatedData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Create property
    const property = await prisma.property.create({
      data: {
        ...validatedData,
        slug: `${slug}-${Date.now()}`, // Ensure uniqueness
        organizationId: orgId,
        status: validatedData.status || 'SETUP',
        settings: validatedData.settings || {},
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: await getUserIdFromClerk(userId),
        propertyId: property.id,
        action: 'CREATE',
        resourceType: 'Property',
        resourceId: property.id,
        newValues: validatedData,
      },
    });

    revalidatePath('/properties');
    revalidatePath('/');

    return { success: true, data: property };
  } catch (error) {
    console.error('Error creating property:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Validation error', details: error.errors };
    }
    return { success: false, error: 'Failed to create property' };
  }
}

/**
 * Update a property
 */
export async function updateProperty(id: string, data: Partial<z.infer<typeof propertySchema>>) {
  const { userId, orgId } = auth();
  
  if (!userId || !orgId) {
    throw new Error('Unauthorized');
  }

  try {
    // Verify property belongs to organization
    const existing = await prisma.property.findFirst({
      where: {
        id,
        organizationId: orgId,
        deletedAt: null,
      },
    });

    if (!existing) {
      return { success: false, error: 'Property not found' };
    }

    // Validate partial data
    const partialSchema = propertySchema.partial();
    const validatedData = partialSchema.parse(data);

    // Update property
    const property = await prisma.property.update({
      where: { id },
      data: validatedData,
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: await getUserIdFromClerk(userId),
        propertyId: property.id,
        action: 'UPDATE',
        resourceType: 'Property',
        resourceId: property.id,
        oldValues: existing,
        newValues: validatedData,
      },
    });

    revalidatePath('/properties');
    revalidatePath(`/properties/${id}`);

    return { success: true, data: property };
  } catch (error) {
    console.error('Error updating property:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Validation error', details: error.errors };
    }
    return { success: false, error: 'Failed to update property' };
  }
}

/**
 * Delete a property (soft delete)
 */
export async function deleteProperty(id: string) {
  const { userId, orgId } = auth();
  
  if (!userId || !orgId) {
    throw new Error('Unauthorized');
  }

  try {
    // Verify property belongs to organization
    const existing = await prisma.property.findFirst({
      where: {
        id,
        organizationId: orgId,
        deletedAt: null,
      },
    });

    if (!existing) {
      return { success: false, error: 'Property not found' };
    }

    // Soft delete
    const property = await prisma.property.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: await getUserIdFromClerk(userId),
        propertyId: property.id,
        action: 'DELETE',
        resourceType: 'Property',
        resourceId: property.id,
        oldValues: existing,
      },
    });

    revalidatePath('/properties');

    return { success: true, data: property };
  } catch (error) {
    console.error('Error deleting property:', error);
    return { success: false, error: 'Failed to delete property' };
  }
}

/**
 * Helper function to get user ID from Clerk ID
 */
async function getUserIdFromClerk(clerkId: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return user.id;
}

