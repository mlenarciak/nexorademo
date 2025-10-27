import { PrismaClient } from "@repo/database";
import { PropertyList } from "@repo/design-system/components/property";

// Demo page without auth - for development only
export default async function PropertiesDemoPage() {
  const prisma = new PrismaClient();
  
  try {
    // Get all properties (no org filter for demo)
    const properties = await prisma.property.findMany({
      where: {
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
        createdAt: "desc",
      },
    });

    return (
      <div className="p-8">
        <div className="mb-4 rounded-lg border-2 border-amber-500 bg-amber-50 p-4 dark:bg-amber-950">
          <p className="font-semibold text-amber-800 dark:text-amber-200">
            ⚠️ DEMO MODE - No Authentication Required
          </p>
          <p className="mt-1 text-amber-700 text-sm dark:text-amber-300">
            This page shows all properties without authentication. For the real app with auth, sign in at http://localhost:3000
          </p>
        </div>
        <PropertyList properties={properties} />
      </div>
    );
  } catch (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="font-bold text-2xl">Error loading properties</h2>
          <p className="mt-2 text-muted-foreground">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      </div>
    );
  }
}

export const metadata = {
  title: "Properties Demo | Nexora",
  description: "Demo view of properties (no auth required)",
};

