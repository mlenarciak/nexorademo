import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// *** Temporary helpers to normalize URL env vars and provide sane fallbacks
// *** This is to unblock Vercel builds where values may be missing quotes,
// *** have whitespace, or rely on VERCEL_URL (which lacks a scheme).
// *** Revisit once domains are finalized and env management is stable.
const normalize = (v?: string) => v?.trim().replace(/^['"]|['"]$/g, "");
const withHttps = (v?: string) => {
  const s = normalize(v);
  if (!s) return undefined;
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  return `https://${s}`;
};

export const keys = () =>
  createEnv({
    server: {
      ANALYZE: z.string().optional(),

      // Added by Vercel
      NEXT_RUNTIME: z.enum(["nodejs", "edge"]).optional(),

      // Vercel environment variables
      VERCEL: z.string().optional(),
      VERCEL_ENV: z.enum(["development", "preview", "production"]).optional(),
      VERCEL_URL: z.string().optional(),
      VERCEL_REGION: z.string().optional(),
      VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),
    },
    client: {
      NEXT_PUBLIC_APP_URL: z.url(),
      NEXT_PUBLIC_WEB_URL: z.url(),
      NEXT_PUBLIC_API_URL: z.url().optional(),
      NEXT_PUBLIC_DOCS_URL: z.url().optional(),
    },
    runtimeEnv: {
      ANALYZE: process.env.ANALYZE,
      NEXT_RUNTIME: process.env.NEXT_RUNTIME,
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
      VERCEL_REGION: process.env.VERCEL_REGION,
      VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
      // *** Fallbacks added to avoid failing builds when public URLs are unset
      // *** or provided without scheme (using VERCEL_URL domain).
      NEXT_PUBLIC_APP_URL:
        withHttps(process.env.NEXT_PUBLIC_APP_URL) ?? withHttps(process.env.VERCEL_URL),
      NEXT_PUBLIC_WEB_URL:
        withHttps(process.env.NEXT_PUBLIC_WEB_URL) ?? withHttps(process.env.VERCEL_URL),
      NEXT_PUBLIC_API_URL: withHttps(process.env.NEXT_PUBLIC_API_URL),
      NEXT_PUBLIC_DOCS_URL: withHttps(process.env.NEXT_PUBLIC_DOCS_URL),
    },
  });
