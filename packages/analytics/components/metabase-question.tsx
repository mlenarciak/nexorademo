'use client'

import { useEffect, useState } from 'react';

export interface MetabaseQuestionProps {
  questionId: number;
  params?: Record<string, any>;
  height?: string;
  className?: string;
}

/**
 * Embedded Metabase Question (Single Chart/Table) Component
 * 
 * Use this for embedding individual charts or tables from Metabase
 * Lighter weight than full dashboards
 * 
 * @example
 * ```tsx
 * <MetabaseQuestion 
 *   questionId={42} 
 *   params={{ property_id: '123' }}
 *   height="400px"
 * />
 * ```
 */
export function MetabaseQuestion({
  questionId,
  params,
  height = '400px',
  className = '',
}: MetabaseQuestionProps) {
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEmbedUrl() {
      try {
        const response = await fetch('/api/analytics/embed-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'question',
            id: questionId,
            params,
          }),
        });

        const data = await response.json();
        setEmbedUrl(data.url);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch embed URL:', error);
        setIsLoading(false);
      }
    }

    fetchEmbedUrl();
  }, [questionId, params]);

  if (isLoading || !embedUrl) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ height }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <iframe
      src={embedUrl}
      frameBorder="0"
      width="100%"
      height={height}
      allowTransparency
      className={`rounded ${className}`}
      title={`Metabase Question ${questionId}`}
    />
  );
}

