// Metabase Types

export interface MetabaseEmbedOptions {
  resource: { dashboard: number } | { question: number };
  params?: Record<string, any>;
  exp?: number; // Expiration in seconds (default 600 = 10 minutes)
}

export interface MetabaseDashboard {
  id: number;
  name: string;
  description?: string;
  collection_id?: number;
}

export interface MetabaseQuestion {
  id: number;
  name: string;
  description?: string;
  collection_id?: number;
  database_id: number;
}

export interface MetabaseUser {
  email: string;
  first_name?: string;
  last_name?: string;
  groups?: string[];
}

export interface MetabaseEmbedUrlResult {
  url: string;
  expiresAt: number;
}

