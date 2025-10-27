import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createProperty,
  deleteProperty,
  getProperties,
  getProperty,
  updateProperty,
} from "../../app/actions/properties";

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
      findMany: vi.fn(),
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    user: {
      findUnique: vi.fn(),
    },
    auditLog: {
      create: vi.fn(),
    },
  };

  return {
    PrismaClient: vi.fn(() => mockPrisma),
  };
});

// Mock Next.js cache
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("Property Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getProperties", () => {
    it("should return properties for the current organization", async () => {
      const mockProperties = [
        {
          id: "prop_1",
          name: "Test Property",
          organizationId: "org_test123",
          city: "Florence",
          country: "IT",
          type: "BNB",
          status: "ACTIVE",
          roomCategories: [],
          _count: { rooms: 5, roomCategories: 2 },
        },
      ];

      const { PrismaClient } = await import("@repo/database");
      const prisma = new PrismaClient();
      vi.mocked(prisma.property.findMany).mockResolvedValue(
        mockProperties as any
      );

      const result = await getProperties();

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockProperties);
      expect(prisma.property.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            organizationId: "org_test123",
            deletedAt: null,
          }),
        })
      );
    });

    it("should handle errors gracefully", async () => {
      const { PrismaClient } = await import("@repo/database");
      const prisma = new PrismaClient();
      vi.mocked(prisma.property.findMany).mockRejectedValue(
        new Error("Database error")
      );

      const result = await getProperties();

      expect(result.success).toBe(false);
      expect(result.error).toBe("Failed to fetch properties");
    });
  });

  describe("createProperty", () => {
    it("should create a property with valid data", async () => {
      const mockUser = { id: "user_internal_123" };
      const mockProperty = {
        id: "prop_new",
        name: "New Property",
        slug: "new-property-123",
        type: "BNB",
        organizationId: "org_test123",
      };

      const { PrismaClient } = await import("@repo/database");
      const prisma = new PrismaClient();
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any);
      vi.mocked(prisma.property.create).mockResolvedValue(mockProperty as any);
      vi.mocked(prisma.auditLog.create).mockResolvedValue({} as any);

      const propertyData = {
        name: "New Property",
        type: "BNB" as const,
        address: "Test Address 123",
        city: "Florence",
        postalCode: "50100",
        country: "IT",
        phone: "+39 055 1234567",
        email: "test@property.com",
        checkInTime: "15:00",
        checkOutTime: "11:00",
        currency: "EUR",
        timezone: "Europe/Rome",
      };

      const result = await createProperty(propertyData);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockProperty);
      expect(prisma.property.create).toHaveBeenCalled();
      expect(prisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            action: "CREATE",
            resourceType: "Property",
          }),
        })
      );
    });

    it("should reject invalid data", async () => {
      const invalidData = {
        name: "AB", // Too short
        type: "INVALID_TYPE" as any,
        address: "Test",
        city: "F",
        postalCode: "123",
        country: "IT",
        phone: "123",
        email: "invalid-email",
        checkInTime: "25:00", // Invalid time
        checkOutTime: "11:00",
        currency: "EUR",
        timezone: "Europe/Rome",
      };

      const result = await createProperty(invalidData);

      expect(result.success).toBe(false);
      expect(result.error).toBe("Validation error");
    });
  });

  describe("updateProperty", () => {
    it("should update property with valid data", async () => {
      const mockExisting = {
        id: "prop_1",
        name: "Old Name",
        organizationId: "org_test123",
      };

      const mockUpdated = {
        ...mockExisting,
        name: "New Name",
      };

      const mockUser = { id: "user_internal_123" };

      const { PrismaClient } = await import("@repo/database");
      const prisma = new PrismaClient();
      vi.mocked(prisma.property.findFirst).mockResolvedValue(
        mockExisting as any
      );
      vi.mocked(prisma.property.update).mockResolvedValue(mockUpdated as any);
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any);
      vi.mocked(prisma.auditLog.create).mockResolvedValue({} as any);

      const result = await updateProperty("prop_1", { name: "New Name" });

      expect(result.success).toBe(true);
      expect(result.data?.name).toBe("New Name");
    });

    it("should return error if property not found", async () => {
      const { PrismaClient } = await import("@repo/database");
      const prisma = new PrismaClient();
      vi.mocked(prisma.property.findFirst).mockResolvedValue(null);

      const result = await updateProperty("nonexistent", { name: "New Name" });

      expect(result.success).toBe(false);
      expect(result.error).toBe("Property not found");
    });
  });

  describe("deleteProperty", () => {
    it("should soft delete a property", async () => {
      const mockExisting = {
        id: "prop_1",
        name: "Test Property",
        organizationId: "org_test123",
      };

      const mockDeleted = {
        ...mockExisting,
        deletedAt: new Date(),
      };

      const mockUser = { id: "user_internal_123" };

      const { PrismaClient } = await import("@repo/database");
      const prisma = new PrismaClient();
      vi.mocked(prisma.property.findFirst).mockResolvedValue(
        mockExisting as any
      );
      vi.mocked(prisma.property.update).mockResolvedValue(mockDeleted as any);
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any);
      vi.mocked(prisma.auditLog.create).mockResolvedValue({} as any);

      const result = await deleteProperty("prop_1");

      expect(result.success).toBe(true);
      expect(prisma.property.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: "prop_1" },
          data: expect.objectContaining({
            deletedAt: expect.any(Date),
          }),
        })
      );
    });
  });
});
