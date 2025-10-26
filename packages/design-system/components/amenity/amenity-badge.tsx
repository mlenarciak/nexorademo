"use client";

import { Badge } from "../ui/badge";

export interface AmenityBadgeProps {
  amenity: {
    name: string;
    category: string;
    icon?: string | null;
  };
  source?: "property" | "category" | "room";
  variant?: "default" | "secondary" | "outline";
}

const sourceColors: Record<string, "default" | "secondary" | "outline"> = {
  property: "outline",
  category: "secondary",
  room: "default",
};

export function AmenityBadge({
  amenity,
  source,
  variant,
}: AmenityBadgeProps) {
  const badgeVariant = variant || (source ? sourceColors[source] : "default");

  return (
    <Badge className="gap-1" variant={badgeVariant}>
      {amenity.icon && <span>{amenity.icon}</span>}
      {amenity.name}
      {source && (
        <span className="ml-1 text-muted-foreground text-xs">({source})</span>
      )}
    </Badge>
  );
}

