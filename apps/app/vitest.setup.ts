import { vi } from "vitest";

// Mock Next.js modules that aren't available in test environment
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));

// Mock Clerk auth globally (via @repo/auth wrapper)
vi.mock("@repo/auth/server", () => ({
  auth: vi.fn(() => ({
    userId: "user_test123",
    orgId: "org_test123",
  })),
}));

// Mock Prisma Client
vi.mock("@repo/database", () => {
  const mockPrisma = {
    property: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    roomCategory: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    room: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    amenity: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    season: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    availabilityBlock: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    propertyAmenity: {
      count: vi.fn(),
    },
    categoryAmenity: {
      deleteMany: vi.fn(),
      createMany: vi.fn(),
      count: vi.fn(),
    },
    roomAmenity: {
      deleteMany: vi.fn(),
      createMany: vi.fn(),
      count: vi.fn(),
    },
    user: {
      findUnique: vi.fn(() =>
        Promise.resolve({
          id: "user_internal_123",
          clerkId: "user_test123",
        })
      ),
    },
    auditLog: {
      create: vi.fn(),
    },
  };

  return {
    PrismaClient: vi.fn(() => mockPrisma),
  };
});

