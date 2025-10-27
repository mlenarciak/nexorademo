"use client";

import { PropertyForm } from "@repo/design-system/components/property";
import { Button } from "@repo/design-system/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { createProperty } from "@/app/actions/properties";

export default function NewPropertyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Record<string, unknown>) => {
    setIsLoading(true);

    try {
      const result = await createProperty(data);

      if (result.success) {
        toast.success("Property created successfully!");
        router.push(`/properties/${result.data.id}`);
      } else {
        toast.error(result.error || "Failed to create property");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <Link href="/properties">
          <Button className="mb-4" size="sm" variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Button>
        </Link>
        <h1 className="font-bold text-3xl">Create New Property</h1>
        <p className="mt-2 text-muted-foreground">
          Add a new property to your organization
        </p>
      </div>

      {/* Form */}
      <PropertyForm isLoading={isLoading} onSubmit={handleSubmit} />
    </div>
  );
}
