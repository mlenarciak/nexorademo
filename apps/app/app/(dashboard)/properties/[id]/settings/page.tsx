"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getProperty, updateProperty, deleteProperty } from "@/app/actions/properties";
import { getSeasons, createSeason, deleteSeason } from "@/app/actions/seasons";
import { PropertyForm } from "@repo/design-system/components/property";
import { SeasonManager } from "@repo/design-system/components/calendar";
import { Button } from "@repo/design-system/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/design-system/components/ui/alert-dialog";
import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";

export default function PropertySettingsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [seasons, setSeasons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [propertyResult, seasonsResult] = await Promise.all([
        getProperty(params.id),
        getSeasons(params.id),
      ]);

      if (propertyResult.success) {
        setProperty(propertyResult.data);
      }

      if (seasonsResult.success) {
        setSeasons(seasonsResult.data);
      }

      setIsLoading(false);
    }

    loadData();
  }, [params.id]);

  const handleUpdate = async (data: any) => {
    setIsSaving(true);

    try {
      const result = await updateProperty(params.id, data);

      if (result.success) {
        toast.success("Property updated successfully!");
        setProperty(result.data);
      } else {
        toast.error(result.error || "Failed to update property");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const result = await deleteProperty(params.id);

      if (result.success) {
        toast.success("Property deleted");
        router.push("/properties");
      } else {
        toast.error(result.error || "Failed to delete property");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddSeason = async (season: any) => {
    try {
      const result = await createSeason({
        propertyId: params.id,
        ...season,
      });

      if (result.success) {
        toast.success("Season created successfully!");
        setSeasons([...seasons, result.data]);
      } else {
        toast.error(result.error || "Failed to create season");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  const handleDeleteSeason = async (seasonId: string) => {
    try {
      const result = await deleteSeason(seasonId);

      if (result.success) {
        toast.success("Season deleted");
        setSeasons(seasons.filter((s) => s.id !== seasonId));
      } else {
        toast.error(result.error || "Failed to delete season");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Property not found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <Link href={`/properties/${params.id}`}>
          <Button className="mb-4" size="sm" variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Property
          </Button>
        </Link>
        <h1 className="font-bold text-3xl">Property Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage settings for {property.name}
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="seasons">Seasons</TabsTrigger>
          <TabsTrigger value="danger">Danger Zone</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <PropertyForm
            initialData={property}
            isLoading={isSaving}
            onSubmit={handleUpdate}
          />
        </TabsContent>

        <TabsContent value="seasons">
          <SeasonManager
            onAdd={handleAddSeason}
            onDelete={handleDeleteSeason}
            onUpdate={async () => {}}
            seasons={seasons}
          />
        </TabsContent>

        <TabsContent value="danger">
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button disabled={isDeleting} variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Property
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete "{property.name}" and all
                      associated data including rooms, categories, and bookings.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Delete Property
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

