import { RoomCard } from "@repo/design-system/components/room";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/design-system/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/design-system/components/ui/tabs";
import { Bed, Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoomCategories } from "@/app/actions/room-categories";
import { getRooms } from "@/app/actions/rooms";

export default async function RoomsPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { category?: string; status?: string };
}) {
  const [categoriesResult, roomsResult] = await Promise.all([
    getRoomCategories(params.id),
    getRooms(params.id),
  ]);

  if (!categoriesResult.success) {
    notFound();
  }

  const categories = categoriesResult.data;
  const rooms = roomsResult.success ? roomsResult.data : [];

  // Filter rooms
  let filteredRooms = rooms;

  if (searchParams.category) {
    filteredRooms = filteredRooms.filter(
      (r) => r.categoryId === searchParams.category
    );
  }

  if (searchParams.status) {
    filteredRooms = filteredRooms.filter(
      (r) => r.status === searchParams.status
    );
  }

  // Group by category
  const roomsByCategory = categories.map((category) => ({
    category,
    rooms: filteredRooms.filter((r) => r.categoryId === category.id),
  }));

  const totalRooms = rooms.length;
  const availableRooms = rooms.filter((r) => r.status === "AVAILABLE").length;
  const maintenanceRooms = rooms.filter(
    (r) => r.status === "MAINTENANCE" || r.maintenanceMode
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-bold text-3xl">Room Management</h1>
          <p className="mt-2 text-muted-foreground">
            Manage rooms and categories for this property
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/properties/${params.id}/rooms/categories/new`}>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              New Category
            </Button>
          </Link>
          <Link href={`/properties/${params.id}/rooms/new`}>
            <Button>
              <Bed className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-medium text-sm">Total Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{totalRooms}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-medium text-sm">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl text-green-600">
              {availableRooms}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-medium text-sm">Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl text-amber-600">
              {maintenanceRooms}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-medium text-sm">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{categories.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Tabs */}
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Rooms</TabsTrigger>
            <TabsTrigger value="by-category">By Category</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent className="space-y-4" value="all">
          {filteredRooms.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bed className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 font-semibold text-lg">No rooms yet</h3>
                <p className="mt-2 text-muted-foreground text-sm">
                  Create a room category first, then add rooms
                </p>
                <Link
                  className="mt-4 inline-block"
                  href={`/properties/${params.id}/rooms/categories/new`}
                >
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Category
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} propertyId={params.id} room={room} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent className="space-y-6" value="by-category">
          {roomsByCategory.map(({ category, rooms: categoryRooms }) => (
            <div key={category.id}>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <h2 className="font-semibold text-xl">{category.name}</h2>
                  <Badge variant="secondary">
                    {categoryRooms.length} rooms
                  </Badge>
                </div>
                <Link
                  href={`/properties/${params.id}/rooms/categories/${category.id}/rooms/new`}
                >
                  <Button size="sm" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Room
                  </Button>
                </Link>
              </div>

              {categoryRooms.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground text-sm">
                      No rooms in this category yet
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categoryRooms.map((room) => (
                    <RoomCard
                      key={room.id}
                      propertyId={params.id}
                      room={room}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: "Room Management | Nexora",
    description: "Manage rooms and categories",
  };
}
