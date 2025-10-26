"use client";

import { Building2, MapPin, Calendar, Bed } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";

export interface PropertyCardProps {
  property: {
    id: string;
    name: string;
    type: string;
    city: string;
    country: string;
    status: string;
    _count?: {
      rooms: number;
      roomCategories: number;
    };
  };
}

const propertyTypeLabels: Record<string, string> = {
  BNB: "B&B",
  RESORT_VILLAGGI: "Resort Villaggi",
  OPEN_AIR_RESORT: "Open Air Resort",
  SMALL_HOTEL: "Small Hotel",
  HOSTEL: "Hostel",
  VACATION_RENTAL: "Vacation Rental",
  OTHER: "Other",
};

const statusColors: Record<string, "default" | "success" | "warning" | "destructive"> = {
  SETUP: "warning",
  ACTIVE: "success",
  INACTIVE: "default",
  SUSPENDED: "destructive",
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{property.name}</CardTitle>
            <CardDescription className="mt-1 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {property.city}, {property.country}
            </CardDescription>
          </div>
          <Badge variant={statusColors[property.status] || "default"}>
            {property.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Building2 className="h-4 w-4" />
          {propertyTypeLabels[property.type] || property.type}
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">
                {property._count?.roomCategories || 0}
              </p>
              <p className="text-muted-foreground text-xs">Categories</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Bed className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">{property._count?.rooms || 0}</p>
              <p className="text-muted-foreground text-xs">Rooms</p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="gap-2">
        <Link href={`/properties/${property.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        <Link href={`/properties/${property.id}/settings`}>
          <Button variant="ghost">Settings</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

