import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createRoomCategory,
  deleteRoomCategory,
  getRoomCategories,
  getRoomCategory,
  updateRoomCategory,
} from "../../app/actions/room-categories";

// Mock Clerk auth
vi.mock("@clerk/nextjs", () => ({
  auth: vi.fn(() => ({
    userId: "user_test123",
    orgId: "org_test123",
  })),
}));

// Mock Prisma Client
vi.mock("@repo/database", () => {
  const mockPrisma = {
    property: {
      findFirst: vi.fn(),
    },
    roomCategory: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
  };

  return {
    PrismaClient: vi.fn(() => mockPrisma),
  };
});

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("Room Category Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getRoomCategories", () => {
    it("should return room categories for a property", async () => {
      const mockProperty = {
        id: "prop_1",
        organizationId: "org_test123",
      };

      const mockCategories = [
        {
          id: "cat_1",
          name: "Standard Double",
          propertyId: "prop_1",
          minCapacity: 1,
          maxCapacity: 2,
          rooms: [],
          _count: { rooms: 3 },
        },
      ];

      const { PrismaClient } = await import("@repo/database");
      const prisma = new PrismaClient();
      vi.mocked(prisma.property.findFirst).mockResolvedValue(
        mockProperty as any
      );
      vi.mocked(prisma.roomCategory.findMany).mockResolvedValue(
        mockCategories as any
      );

      const result = await getRoomCategories("prop_1");

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockCategories);
    });

    it("should return error if property not found", async () => {
      const { PrismaClient } = await import("@repo/database");
      const prisma = new PrismaClient();
      vi.mocked(prisma.property.findFirst).mockResolvedValue(null);

      const result = await getRoomCategories("nonexistent");

      expect(result.success).toBe(false);
      expect(result.error).toBe("Property not found");
    });
  });

  describe("createRoomCategory", () => {
    it("should create a room category with valid data", async () => {
      const mockProperty = {
        id: "prop_1",
        organizationId: "org_test123",
      };

      const mockCategory = {
        id: "cat_new",
        name: "Deluxe Suite",
        propertyId: "prop_1",
      };

      const { PrismaClient } = await import("@repo/database");
      const prisma = new PrismaClient();
      vi.mocked(prisma.property.findFirst).mockResolvedValue(
        mockProperty as any
      );
      vi.mocked(prisma.roomCategory.create).mockResolvedValue(
        mockCategory as any
      );

      const categoryData = {
        propertyId: "prop_1",
        name: "Deluxe Suite",
        minCapacity: 2,
        maxCapacity: 4,
        extraCapacity: 1,
        bedConfigurations: [
          {
            id: "config1",
            name: "King Bed",
            beds: [{ type: "king", count: 1 }],
          },
        ],
        defaultBedConfig: {
          id: "config1",
          name: "King Bed",
          beds: [{ type: "king", count: 1 }],
        },
        color: "#3B82F6",
        petsAllowed: false,
        smokingAllowed: false,
        order: 1,
      };

      const result = await createRoomCategory(categoryData);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockCategory);
    });

    it("should reject if min capacity exceeds max capacity", async () => {
      const mockProperty = {
        id: "prop_1",
        organizationId: "org_test123",
      };

      const { PrismaClient } = await import("@repo/database");
      const prisma = new PrismaClient();
      vi.mocked(prisma.property.findFirst).mockResolvedValue(
        mockProperty as any
      );

      const invalidData = {
        propertyId: "prop_1",
        name: "Invalid Category",
        minCapacity: 5,
        maxCapacity: 2, // Invalid: min > max
        extraCapacity: 0,
        bedConfigurations: [],
        defaultBedConfig: { id: "1", name: "Test", beds: [] },
        color: "#000000",
        petsAllowed: false,
        smokingAllowed: false,
        order: 1,
      };

      const result = await createRoomCategory(invalidData);

      expect(result.success).toBe(false);
      expect(result.error).toContain("capacity");
    });
  });

  describe("deleteRoomCategory", () => {
    it("should prevent deletion if category has rooms", async () => {
      const mockCategory = {
        id: "cat_1",
        propertyId: "prop_1",
        property: { organizationId: "org_test123" },
        rooms: [{ id: "room_1" }, { id: "room_2" }],
      };

      const { PrismaClient } = await import("@repo/database");
      const prisma = new PrismaClient();
      vi.mocked(prisma.roomCategory.findFirst).mockResolvedValue(
        mockCategory as any
      );

      const result = await deleteRoomCategory("cat_1");

      expect(result.success).toBe(false);
      expect(result.error).toContain("Cannot delete category with");
      expect(prisma.roomCategory.update).not.toHaveBeenCalled();
    });

    it("should soft delete if category has no rooms", async () => {
      const mockCategory = {
        id: "cat_1",
        propertyId: "prop_1",
        property: { organizationId: "org_test123" },
        rooms: [],
      };

      const { PrismaClient } = await import("@repo/database");
      const prisma = new PrismaClient();
      vi.mocked(prisma.roomCategory.findFirst).mockResolvedValue(
        mockCategory as any
      );
      vi.mocked(prisma.roomCategory.update).mockResolvedValue({
        ...mockCategory,
        deletedAt: new Date(),
      } as any);

      const result = await deleteRoomCategory("cat_1");

      expect(result.success).toBe(true);
      expect(prisma.roomCategory.update).toHaveBeenCalled();
    });
  });
});
