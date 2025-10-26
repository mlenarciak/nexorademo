import { getProperty } from "@/app/actions/properties";
import { getRoomCategories } from "@/app/actions/room-categories";
import { getSeasons } from "@/app/actions/seasons";
import { RoomCategoryCard } from "@repo/design-system/components/room";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import {
  Building2,
  Calendar,
  Mail,
  MapPin,
  Phone,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [propertyResult, categoriesResult, seasonsResult] = await Promise.all([
    getProperty(params.id),
    getRoomCategories(params.id),
    getSeasons(params.id),
  ]);

  if (!propertyResult.success || !propertyResult.data) {
    notFound();
  }

  const property = propertyResult.data;
  const categories = categoriesResult.success ? categoriesResult.data : [];
  const seasons = seasonsResult.success ? seasonsResult.data : [];

  const totalRooms =
    property.roomCategories?.reduce(
      (acc, cat) => acc + (cat.rooms?.length || 0),
      0
    ) || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-3xl">{property.name}</h1>
            <Badge
              variant={property.status === "ACTIVE" ? "success" : "secondary"}
            >
              {property.status}
            </Badge>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {property.city}, {property.country}
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {property.email}
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {property.phone}
            </div>
          </div>
        </div>
        <Link href={`/properties/${property.id}/settings`}>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Rooms</CardDescription>
            <CardTitle className="text-3xl">{totalRooms}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Room Categories</CardDescription>
            <CardTitle className="text-3xl">
              {property.roomCategories?.length || 0}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Seasons</CardDescription>
            <CardTitle className="text-3xl">{seasons.length}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Occupancy</CardDescription>
            <CardTitle className="text-3xl">--%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rooms">Room Categories</TabsTrigger>
          <TabsTrigger value="seasons">Seasons</TabsTrigger>
        </TabsList>

        <TabsContent className="space-y-4" value="overview">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Property Information */}
            <Card>
              <CardHeader>
                <CardTitle>Property Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Type</p>
                  <p className="text-muted-foreground">{property.type}</p>
                </div>
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">
                    {property.address}
                    <br />
                    {property.postalCode} {property.city}
                    {property.state && `, ${property.state}`}
                  </p>
                </div>
                {property.website && (
                  <div>
                    <p className="font-medium">Website</p>
                    <a
                      className="text-primary hover:underline"
                      href={property.website}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {property.website}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Operational Details */}
            <Card>
              <CardHeader>
                <CardTitle>Operational Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Check-in / Check-out</p>
                  <p className="text-muted-foreground">
                    {property.checkInTime} / {property.checkOutTime}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Currency</p>
                  <p className="text-muted-foreground">{property.currency}</p>
                </div>
                <div>
                  <p className="font-medium">Timezone</p>
                  <p className="text-muted-foreground">{property.timezone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Fiscal Information */}
            {(property.cin || property.cir || property.vatNumber || property.brazilianTaxId) && (
              <Card>
                <CardHeader>
                  <CardTitle>Fiscal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {property.cin && (
                    <div>
                      <p className="font-medium">CIN</p>
                      <p className="text-muted-foreground">{property.cin}</p>
                    </div>
                  )}
                  {property.cir && (
                    <div>
                      <p className="font-medium">CIR</p>
                      <p className="text-muted-foreground">{property.cir}</p>
                    </div>
                  )}
                  {property.vatNumber && (
                    <div>
                      <p className="font-medium">VAT Number</p>
                      <p className="text-muted-foreground">{property.vatNumber}</p>
                    </div>
                  )}
                  {property.brazilianTaxId && (
                    <div>
                      <p className="font-medium">CNPJ</p>
                      <p className="text-muted-foreground">
                        {property.brazilianTaxId}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent className="space-y-4" value="rooms">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {categories.length} room {categories.length === 1 ? "category" : "categories"}
            </p>
            <Link href={`/properties/${property.id}/rooms/categories/new`}>
              <Button>
                <Building2 className="mr-2 h-4 w-4" />
                New Category
              </Button>
            </Link>
          </div>

          {categories.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 font-semibold text-lg">No room categories yet</h3>
                <p className="mt-2 text-muted-foreground text-sm">
                  Create your first room category to start adding rooms
                </p>
                <Link
                  className="mt-4 inline-block"
                  href={`/properties/${property.id}/rooms/categories/new`}
                >
                  <Button>
                    <Building2 className="mr-2 h-4 w-4" />
                    Create Category
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <RoomCategoryCard
                  category={category}
                  key={category.id}
                  propertyId={property.id}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent className="space-y-4" value="seasons">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {seasons.length} seasonal {seasons.length === 1 ? "period" : "periods"}
            </p>
          </div>

          {seasons.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 font-semibold text-lg">No seasons defined</h3>
                <p className="mt-2 text-muted-foreground text-sm">
                  Define seasonal periods for pricing and calendar visualization
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {seasons.map((season) => (
                <Card key={season.id}>
                  <CardContent className="flex items-center justify-between pt-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded"
                        style={{ backgroundColor: season.color }}
                      />
                      <div>
                        <p className="font-medium">{season.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {new Date(season.startDate).toLocaleDateString()} -{" "}
                          {new Date(season.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const result = await getProperty(params.id);

  if (!result.success) {
    return {
      title: "Property Not Found | Nexora",
    };
  }

  return {
    title: `${result.data.name} | Nexora`,
    description: `Manage ${result.data.name} property`,
  };
}

