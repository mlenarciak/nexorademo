"use client";

import { Bed, Edit, Maximize2, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export interface RoomCategoryCardProps {
  category: {
    id: string;
    name: string;
    shortName?: string | null;
    description?: string | null;
    minCapacity: number;
    maxCapacity: number;
    extraCapacity: number;
    size?: number | null;
    color: string;
    petsAllowed: boolean;
    _count?: {
      rooms: number;
    };
  };
  propertyId: string;
  onDelete?: (id: string) => void;
}

export function RoomCategoryCard({
  category,
  propertyId,
  onDelete,
}: RoomCategoryCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <CardTitle className="text-xl">{category.name}</CardTitle>
            </div>
            {category.shortName && (
              <CardDescription className="mt-1">
                Display: {category.shortName}
              </CardDescription>
            )}
          </div>
          <Badge variant="secondary">{category._count?.rooms || 0} rooms</Badge>
        </div>
      </CardHeader>

      <CardContent>
        {category.description && (
          <p className="mb-4 line-clamp-2 text-muted-foreground text-sm">
            {category.description}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">
                {category.minCapacity} - {category.maxCapacity}
                {category.extraCapacity > 0 && ` +${category.extraCapacity}`}
              </p>
              <p className="text-muted-foreground text-xs">Capacity</p>
            </div>
          </div>

          {category.size && (
            <div className="flex items-center gap-2">
              <Maximize2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{category.size}m²</p>
                <p className="text-muted-foreground text-xs">Size</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          {category.petsAllowed && (
            <Badge className="text-xs" variant="outline">
              Pets Allowed
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        <Link
          className="flex-1"
          href={`/properties/${propertyId}/rooms/categories/${category.id}`}
        >
          <Button className="w-full" variant="outline">
            <Bed className="mr-2 h-4 w-4" />
            Manage Rooms
          </Button>
        </Link>
        <Link
          href={`/properties/${propertyId}/rooms/categories/${category.id}/edit`}
        >
          <Button size="icon" variant="ghost">
            <Edit className="h-4 w-4" />
          </Button>
        </Link>
        {onDelete && (
          <Button
            onClick={() => onDelete(category.id)}
            size="icon"
            variant="ghost"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
