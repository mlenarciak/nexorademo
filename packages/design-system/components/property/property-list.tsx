"use client";

import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PropertyCard } from "./property-card";

export interface PropertyListProps {
  properties: Array<{
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
  }>;
}

export function PropertyList({ properties }: PropertyListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl">Properties</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your hospitality properties
          </p>
        </div>
        <Link href="/properties/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Property
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search properties by name or city..."
          value={searchQuery}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border p-4">
          <p className="font-bold text-2xl">{properties.length}</p>
          <p className="text-muted-foreground text-sm">Total Properties</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="font-bold text-2xl">
            {properties.filter((p) => p.status === "ACTIVE").length}
          </p>
          <p className="text-muted-foreground text-sm">Active</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="font-bold text-2xl">
            {properties.reduce((acc, p) => acc + (p._count?.rooms || 0), 0)}
          </p>
          <p className="text-muted-foreground text-sm">Total Rooms</p>
        </div>
      </div>

      {/* Property Grid */}
      {filteredProperties.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            {searchQuery ? "No properties found" : "No properties yet"}
          </p>
          {!searchQuery && (
            <Link href="/properties/new">
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Property
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
