"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export interface Season {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  color: string;
}

export interface SeasonManagerProps {
  seasons: Season[];
  onAdd: (season: Omit<Season, "id">) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, season: Partial<Season>) => Promise<void>;
}

export function SeasonManager({
  seasons,
  onAdd,
  onDelete,
  onUpdate,
}: SeasonManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newSeason, setNewSeason] = useState({
    name: "",
    startDate: "",
    endDate: "",
    color: "#3B82F6",
  });

  const handleAdd = async () => {
    if (!newSeason.name || !newSeason.startDate || !newSeason.endDate) {
      return;
    }

    await onAdd({
      name: newSeason.name,
      startDate: new Date(newSeason.startDate),
      endDate: new Date(newSeason.endDate),
      color: newSeason.color,
    });

    setNewSeason({
      name: "",
      startDate: "",
      endDate: "",
      color: "#3B82F6",
    });
    setIsAdding(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Seasonal Periods</CardTitle>
            <CardDescription>
              Define seasons for pricing and calendar visualization
            </CardDescription>
          </div>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Season
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {isAdding && (
          <Card>
            <CardContent className="grid gap-4 pt-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Season Name</Label>
                <Input
                  id="name"
                  onChange={(e) =>
                    setNewSeason({ ...newSeason, name: e.target.value })
                  }
                  placeholder="e.g., High Season"
                  value={newSeason.name}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    onChange={(e) =>
                      setNewSeason({ ...newSeason, startDate: e.target.value })
                    }
                    type="date"
                    value={newSeason.startDate}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    onChange={(e) =>
                      setNewSeason({ ...newSeason, endDate: e.target.value })
                    }
                    type="date"
                    value={newSeason.endDate}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="color">Color</Label>
                <div className="flex gap-2">
                  <Input
                    className="flex-1"
                    id="color"
                    onChange={(e) =>
                      setNewSeason({ ...newSeason, color: e.target.value })
                    }
                    type="color"
                    value={newSeason.color}
                  />
                  <Input
                    className="w-32"
                    onChange={(e) =>
                      setNewSeason({ ...newSeason, color: e.target.value })
                    }
                    placeholder="#3B82F6"
                    value={newSeason.color}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAdd}>Add Season</Button>
                <Button
                  onClick={() => setIsAdding(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-2">
          {seasons.map((season) => (
            <div
              className="flex items-center justify-between rounded-lg border p-4"
              key={season.id}
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-8 w-8 rounded"
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
              <Button
                onClick={() => onDelete(season.id)}
                size="icon"
                variant="ghost"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {seasons.length === 0 && !isAdding && (
            <p className="py-8 text-center text-muted-foreground">
              No seasons defined. Click "Add Season" to create one.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

