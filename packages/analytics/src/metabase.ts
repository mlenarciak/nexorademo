// Metabase Integration Utilities

import jwt from 'jsonwebtoken';
import type { MetabaseEmbedOptions, MetabaseEmbedUrlResult, MetabaseUser } from './types';

/**
 * Generate a signed Metabase embed URL for dashboards or questions
 * 
 * @param options - Embed configuration options
 * @returns Signed embed URL with expiration
 * 
 * @example
 * ```ts
 * const url = generateMetabaseEmbedUrl({
 *   resource: { dashboard: 1 },
 *   params: { organization_id: 'org_123' },
 * });
 * ```
 */
export function generateMetabaseEmbedUrl(
  options: MetabaseEmbedOptions
): MetabaseEmbedUrlResult {
  const METABASE_SITE_URL = process.env.METABASE_SITE_URL;
  const METABASE_SECRET_KEY = process.env.METABASE_EMBEDDING_SECRET;

  if (!METABASE_SITE_URL || !METABASE_SECRET_KEY) {
    throw new Error('Metabase configuration is missing. Check environment variables.');
  }

  const expiresAt = Math.round(Date.now() / 1000) + (options.exp || 600);

  const payload = {
    resource: options.resource,
    params: options.params || {},
    exp: expiresAt,
  };

  const token = jwt.sign(payload, METABASE_SECRET_KEY);

  const resourceType = 'dashboard' in options.resource ? 'dashboard' : 'question';
  const resourceId = options.resource[resourceType];

  const url = `${METABASE_SITE_URL}/embed/${resourceType}/${token}#bordered=false&titled=false&theme=transparent`;

  return {
    url,
    expiresAt,
  };
}

/**
 * Generate a JWT token for Metabase SSO
 * This allows users to access Metabase without separate login
 * 
 * @param user - User information from Clerk or other auth provider
 * @returns JWT token for Metabase SSO
 * 
 * @example
 * ```ts
 * const token = generateMetabaseSSO({
 *   email: 'user@example.com',
 *   first_name: 'John',
 *   last_name: 'Doe',
 *   groups: ['Property Managers'],
 * });
 * ```
 */
export function generateMetabaseSSO(user: MetabaseUser): string {
  const METABASE_JWT_SECRET = process.env.METABASE_JWT_SECRET;

  if (!METABASE_JWT_SECRET) {
    throw new Error('Metabase JWT secret is not configured.');
  }

  const payload = {
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    groups: user.groups || [],
    exp: Math.round(Date.now() / 1000) + 3600, // 1 hour
  };

  return jwt.sign(payload, METABASE_JWT_SECRET);
}

/**
 * Fetch Metabase API data
 * Requires METABASE_API_KEY environment variable
 * 
 * @param endpoint - API endpoint path (e.g., '/api/dashboard/1')
 * @returns Parsed JSON response
 */
export async function fetchMetabaseAPI<T = any>(endpoint: string): Promise<T> {
  const METABASE_SITE_URL = process.env.METABASE_SITE_URL;
  const METABASE_API_KEY = process.env.METABASE_API_KEY;

  if (!METABASE_SITE_URL || !METABASE_API_KEY) {
    throw new Error('Metabase API configuration is missing.');
  }

  const response = await fetch(`${METABASE_SITE_URL}${endpoint}`, {
    headers: {
      'X-API-KEY': METABASE_API_KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Metabase API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * List all dashboards accessible to the current Metabase API key
 * 
 * @returns Array of dashboard metadata
 */
export async function listDashboards() {
  return fetchMetabaseAPI('/api/dashboard');
}

/**
 * Get dashboard details by ID
 * 
 * @param id - Dashboard ID
 * @returns Dashboard details including cards and parameters
 */
export async function getDashboard(id: number) {
  return fetchMetabaseAPI(`/api/dashboard/${id}`);
}

/**
 * Execute a saved question and return results
 * Useful for custom data exports or processing
 * 
 * @param questionId - Question ID in Metabase
 * @param params - Query parameters
 * @returns Query results
 */
export async function executeQuestion(questionId: number, params?: Record<string, any>) {
  const queryParams = params 
    ? '?' + new URLSearchParams(params as any).toString()
    : '';
  
  return fetchMetabaseAPI(`/api/card/${questionId}/query${queryParams}`);
}

