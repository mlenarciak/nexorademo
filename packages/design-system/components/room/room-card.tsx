"use client";

import { AlertCircle, Edit, Settings, Wrench } from "lucide-react";
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

export interface RoomCardProps {
  room: {
    id: string;
    number: string;
    floor?: string | null;
    status: string;
    bookable: boolean;
    maintenanceMode: boolean;
    category: {
      name: string;
      color: string;
    };
  };
  propertyId: string;
  onEdit?: (id: string) => void;
}

const statusConfig: Record<
  string,
  {
    label: string;
    variant: "default" | "success" | "warning" | "destructive" | "secondary";
  }
> = {
  AVAILABLE: { label: "Available", variant: "success" },
  OCCUPIED: { label: "Occupied", variant: "destructive" },
  CLEANING: { label: "Cleaning", variant: "warning" },
  MAINTENANCE: { label: "Maintenance", variant: "secondary" },
  BLOCKED: { label: "Blocked", variant: "default" },
};

export function RoomCard({ room, propertyId, onEdit }: RoomCardProps) {
  const status = statusConfig[room.status] || statusConfig.AVAILABLE;

  return (
    <Card
      className="transition-shadow hover:shadow-md"
      style={{ borderTopColor: room.category.color, borderTopWidth: 3 }}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">Room {room.number}</CardTitle>
            <CardDescription className="mt-1">
              {room.category.name}
              {room.floor && ` • Floor ${room.floor}`}
            </CardDescription>
          </div>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {!room.bookable && (
            <div className="flex items-center gap-2 text-amber-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>Not bookable online</span>
            </div>
          )}

          {room.maintenanceMode && (
            <div className="flex items-center gap-2 text-amber-600 text-sm">
              <Wrench className="h-4 w-4" />
              <span>Under maintenance</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        <Link
          className="flex-1"
          href={`/properties/${propertyId}/rooms/${room.id}`}
        >
          <Button className="w-full" variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Details
          </Button>
        </Link>
        {onEdit && (
          <Button onClick={() => onEdit(room.id)} size="icon" variant="ghost">
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
