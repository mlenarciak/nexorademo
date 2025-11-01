"use client";

import { Badge } from "@repo/design-system/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import type { ReactNode } from "react";

type FeaturePlaceholderProperties = {
  title: string;
  description: string;
  legacyFeature: string;
  status?: string;
  plannedCapabilities?: string[];
  actions?: ReactNode;
  children?: ReactNode;
};

export const FeaturePlaceholder = ({
  title,
  description,
  legacyFeature,
  status = "In Development",
  plannedCapabilities = [],
  actions,
  children,
}: FeaturePlaceholderProperties) => (
  <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{status}</Badge>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border border-dashed border-muted-foreground/50 bg-muted/30 p-4">
          <p className="font-semibold text-sm text-foreground">
            Legacy reference: {legacyFeature}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            This surface currently mirrors the legacy workflow while the unified
            Nexora experience is under construction.
          </p>
        </div>
        {plannedCapabilities.length > 0 ? (
          <div className="space-y-2">
            <p className="font-medium text-sm text-foreground">
              Planned capabilities
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {plannedCapabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {children}
      </CardContent>
    </Card>
    {actions}
  </div>
);
