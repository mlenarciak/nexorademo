"use client";

import { useEffect, useState } from "react";

export interface MetabaseDashboardProps {
  dashboardId: number;
  params?: Record<string, any>;
  height?: string;
  className?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Embedded Metabase Dashboard Component
 *
 * Securely embeds a Metabase dashboard with JWT-signed URLs
 * Automatically handles organization context and parameter passing
 *
 * @example
 * ```tsx
 * <MetabaseDashboard
 *   dashboardId={1}
 *   params={{ property_id: '123' }}
 *   height="800px"
 * />
 * ```
 */
export function MetabaseDashboard({
  dashboardId,
  params,
  height = "800px",
  className = "",
  onLoad,
  onError,
}: MetabaseDashboardProps) {
  const [embedUrl, setEmbedUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchEmbedUrl() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/analytics/embed-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "dashboard",
            id: dashboardId,
            params,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate embed URL");
        }

        const data = await response.json();
        setEmbedUrl(data.url);
        setIsLoading(false);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
        setIsLoading(false);
        onError?.(error);
      }
    }

    fetchEmbedUrl();
  }, [dashboardId, params, onError]);

  useEffect(() => {
    if (embedUrl && onLoad) {
      // Give iframe time to load
      const timer = setTimeout(onLoad, 1000);
      return () => clearTimeout(timer);
    }
  }, [embedUrl, onLoad]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-center">
          <p className="font-semibold text-red-600">Failed to load dashboard</p>
          <p className="mt-2 text-gray-500 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  if (isLoading || !embedUrl) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-blue-600 border-b-2" />
          <p className="mt-4 text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      allowTransparency
      className={`rounded-lg border ${className}`}
      frameBorder="0"
      height={height}
      src={embedUrl}
      title={`Metabase Dashboard ${dashboardId}`}
      width="100%"
    />
  );
}
