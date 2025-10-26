"use client";

import { PropertyCard } from "./property-card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

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

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Properties</h1>
          <p className="text-muted-foreground mt-1">
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
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search properties by name or city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <p className="text-2xl font-bold">{properties.length}</p>
          <p className="text-sm text-muted-foreground">Total Properties</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-2xl font-bold">
            {properties.filter((p) => p.status === "ACTIVE").length}
          </p>
          <p className="text-sm text-muted-foreground">Active</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-2xl font-bold">
            {properties.reduce((acc, p) => acc + (p._count?.rooms || 0), 0)}
          </p>
          <p className="text-sm text-muted-foreground">Total Rooms</p>
        </div>
      </div>

      {/* Property Grid */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}

