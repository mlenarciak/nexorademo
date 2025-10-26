"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../../lib/utils";

export interface Amenity {
  id: string;
  name: string;
  i18nKey: string;
  category: string;
  icon?: string | null;
}

export interface AmenitySelectorProps {
  amenities: Amenity[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  placeholder?: string;
}

const categoryLabels: Record<string, string> = {
  ROOM_FEATURES: "Room Features",
  BATHROOM: "Bathroom",
  ENTERTAINMENT: "Entertainment",
  KITCHEN: "Kitchen",
  SAFETY: "Safety",
  ACCESSIBILITY: "Accessibility",
  OUTDOOR: "Outdoor",
  SERVICES: "Services",
  CUSTOM: "Custom",
};

export function AmenitySelector({
  amenities,
  selectedIds,
  onChange,
  placeholder = "Select amenities...",
}: AmenitySelectorProps) {
  const [open, setOpen] = useState(false);

  const selectedAmenities = amenities.filter((a) =>
    selectedIds.includes(a.id)
  );

  // Group amenities by category
  const amenitiesByCategory = amenities.reduce(
    (acc, amenity) => {
      if (!acc[amenity.category]) {
        acc[amenity.category] = [];
      }
      acc[amenity.category].push(amenity);
      return acc;
    },
    {} as Record<string, Amenity[]>
  );

  const toggleAmenity = (amenityId: string) => {
    const newSelected = selectedIds.includes(amenityId)
      ? selectedIds.filter((id) => id !== amenityId)
      : [...selectedIds, amenityId];
    onChange(newSelected);
  };

  return (
    <div className="space-y-2">
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            className="w-full justify-start"
            role="combobox"
            variant="outline"
          >
            {selectedAmenities.length > 0
              ? `${selectedAmenities.length} amenities selected`
              : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[400px] p-0">
          <Command>
            <CommandInput placeholder="Search amenities..." />
            <CommandList>
              <CommandEmpty>No amenities found.</CommandEmpty>
              <ScrollArea className="h-[300px]">
                {Object.entries(amenitiesByCategory).map(
                  ([category, categoryAmenities]) => (
                    <CommandGroup
                      heading={categoryLabels[category] || category}
                      key={category}
                    >
                      {categoryAmenities.map((amenity) => (
                        <CommandItem
                          key={amenity.id}
                          onSelect={() => toggleAmenity(amenity.id)}
                          value={amenity.name}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedIds.includes(amenity.id)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {amenity.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )
                )}
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedAmenities.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedAmenities.map((amenity) => (
            <Badge
              className="cursor-pointer"
              key={amenity.id}
              onClick={() => toggleAmenity(amenity.id)}
              variant="secondary"
            >
              {amenity.name}
              <span className="ml-1">×</span>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

