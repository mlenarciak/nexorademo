# Nexora - Technical Architecture

**Version**: 1.0  
**Last Updated**: 2025-10-26  
**Status**: Active Development

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Patterns](#architecture-patterns)
4. [Data Architecture](#data-architecture)
5. [Security Architecture](#security-architecture)
6. [Deployment Architecture](#deployment-architecture)
7. [Integration Architecture](#integration-architecture)
8. [Performance & Scalability](#performance--scalability)
9. [Development Workflow](#development-workflow)

---

## System Overview

Nexora is a cloud-native, multi-tenant hospitality property management system built on the Next-Forge framework, leveraging Next.js 14, Neon PostgreSQL, and Prisma ORM.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer (Browser)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐    │
│  │ React 18 App │  │ Real-time    │  │ Progressive       │    │
│  │ (RSC + RCC)  │  │ Collaboration│  │ Enhancement       │    │
│  └──────────────┘  └──────────────┘  └───────────────────┘    │
└───────────────────────────┬─────────────────────────────────────┘
                           │ HTTPS/WebSocket
┌───────────────────────────┴─────────────────────────────────────┐
│                    Vercel Edge Network (CDN)                     │
└───────────────────────────┬─────────────────────────────────────┘
                           │
┌───────────────────────────┴─────────────────────────────────────┐
│                    Application Layer (Next.js)                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │               Next.js 14 App Router                       │  │
│  │  ┌────────────┐  ┌──────────────┐  ┌─────────────────┐  │  │
│  │  │  Server    │  │   Server     │  │    Middleware   │  │  │
│  │  │ Components │  │   Actions    │  │  (Auth, i18n)   │  │  │
│  │  └────────────┘  └──────────────┘  └─────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────┬─────────────────────┬───────────────────────────┘
                │                     │
        ┌───────┴────────┐   ┌────────┴─────────┐
        │                │   │                   │
┌───────▼────────┐  ┌───▼──────┐  ┌────────▼────────┐
│  Neon Database │  │  Clerk   │  │   Liveblocks    │
│  (PostgreSQL)  │  │   Auth   │  │   Real-time     │
│                │  │          │  │                 │
│  ┌──────────┐  │  └──────────┘  └─────────────────┘
│  │  Prisma  │  │
│  │   ORM    │  │
│  └──────────┘  │
└────────────────┘
        │
        │ External Integrations
        ▼
┌─────────────────────────────────────────────────┐
│  RoomCloud  │  Stripe  │  Nexi  │  WhatsApp   │
│  Sentry     │  Vercel  │  i18n  │  Storage    │
└─────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.x | React framework with App Router |
| **React** | 18.x | UI library with Server Components |
| **TypeScript** | 5.x | Type-safe development |
| **Tailwind CSS** | 3.x | Utility-first styling |
| **shadcn/ui** | Latest | Component library |
| **Liveblocks** | Latest | Real-time collaboration |
| **Languine** | Latest | Internationalization |
| **Metabase** | Latest | Embedded analytics & BI |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js API** | 14.x | API routes and Server Actions |
| **Prisma** | 5.x | Type-safe ORM |
| **Neon** | Latest | Serverless PostgreSQL |
| **Clerk** | Latest | Authentication & user management |
| **Zod** | Latest | Runtime validation |

### Infrastructure

| Service | Purpose |
|---------|---------|
| **Vercel** | Hosting, CDN, serverless functions |
| **Neon DB** | PostgreSQL database (serverless) |
| **Vercel Blob** | File storage (images, documents) |
| **Sentry** | Error tracking and monitoring |
| **Vercel Analytics** | Performance monitoring |
| **Metabase** | Self-hosted BI and analytics (Docker) |

### Development

| Tool | Purpose |
|------|---------|
| **pnpm** | Package manager (monorepo) |
| **Turbo** | Monorepo build system |
| **Biome** | Linting and formatting |
| **Vitest** | Unit testing |
| **Playwright** | E2E testing |
| **OpenSpec** | Specification management |

---

## Architecture Patterns

### 1. Monorepo Structure

```
nexora/
├── apps/
│   ├── app/          # Main SaaS application
│   ├── web/          # Marketing website
│   ├── api/          # Standalone API (optional)
│   └── docs/         # Documentation site
├── packages/
│   ├── database/     # Prisma schema & migrations
│   ├── auth/         # Clerk integration
│   ├── design-system/# UI components
│   ├── i18n/         # Internationalization
│   ├── payments/     # Payment integrations
│   ├── channel-manager/  # OTA integrations
│   └── ...           # Other shared packages
└── [config files]
```

**Benefits**:
- Shared code between apps
- Type-safe across packages
- Independent versioning
- Faster builds with Turbo
- Clear separation of concerns

### 2. Server-First Architecture

**Server Components (Default)**:
```typescript
// app/properties/page.tsx
export default async function PropertiesPage() {
  const properties = await getProperties(); // Direct DB access
  return <PropertiesList properties={properties} />;
}
```

**Client Components (When Needed)**:
```typescript
'use client'
export function PropertyForm() {
  const [state, setState] = useState();
  // Interactive UI, hooks, events
}
```

**Server Actions (Mutations)**:
```typescript
'use server'
export async function createProperty(formData: FormData) {
  const user = await auth();
  const data = validatePropertyData(formData);
  const property = await db.property.create({ data });
  revalidatePath('/properties');
  return property;
}
```

### 3. Multi-Tenancy Pattern

**Row-Level Security via Prisma Middleware**:

```typescript
// packages/database/src/middleware.ts
prisma.$use(async (params, next) => {
  const user = getCurrentUser();
  
  if (params.model && params.action.startsWith('find')) {
    params.args.where = {
      ...params.args.where,
      organizationId: user.organizationId,
      deletedAt: null
    };
  }
  
  return next(params);
});
```

**Every Query Includes Tenant Filter**:
```typescript
// ✅ CORRECT
const properties = await prisma.property.findMany({
  where: {
    organizationId: user.organizationId,
    deletedAt: null
  }
});

// ❌ WRONG - Will be rejected by middleware
const properties = await prisma.property.findMany();
```

### 4. Real-time Collaboration

**Liveblocks Integration**:

```typescript
// Room provider
<LiveblocksProvider>
  <RoomProvider id={`property-${propertyId}`}>
    <PropertyEditor />
  </RoomProvider>
</LiveblocksProvider>

// In component
const { others } = useOthers();
const [property, updateProperty] = useMutation(/*...*/);

// Multiple users see changes in real-time
```

### 5. Optimistic Updates

```typescript
async function updateProperty(data: PropertyData) {
  // 1. Optimistic update
  setProperty(data);
  
  try {
    // 2. Server action
    await updatePropertyAction(data);
    revalidatePath('/properties');
  } catch (error) {
    // 3. Rollback on error
    setProperty(originalData);
    toast.error('Update failed');
  }
}
```

---

## Data Architecture

### Database Schema Overview

```
Organization (Tenant)
    │
    ├── Users (Role-based)
    │   └── PropertyAccess (Junction)
    │
    └── Properties
        ├── Seasons (Pricing periods)
        ├── RoomCategories
        │   ├── CategoryAmenities
        │   └── Rooms
        │       ├── RoomAmenities
        │       └── AvailabilityBlocks
        │
        ├── Bookings (Phase 2)
        │   ├── RoomAssignments
        │   ├── Payments (Phase 4)
        │   └── Charges
        │
        └── AuditLogs
```

### Data Isolation Strategy

**1. Database Level**:
- Every table (except global lookups) has `organizationId`
- Composite indexes: `(organizationId, deletedAt, ...)`
- Foreign keys enforce referential integrity

**2. Application Level**:
- Prisma middleware injects tenant filter
- Server Actions validate tenant context
- API routes check permissions

**3. Soft Deletes**:
- All models have `deletedAt` timestamp
- Queries filter `WHERE deletedAt IS NULL`
- Enables data recovery and audit compliance

### Indexing Strategy

```sql
-- Critical indexes for performance
CREATE INDEX idx_property_org_deleted ON "Property" (
  "organizationId", "deletedAt"
);

CREATE INDEX idx_room_property_category_deleted ON "Room" (
  "propertyId", "categoryId", "deletedAt"
);

CREATE INDEX idx_room_status_property ON "Room" (
  "status", "propertyId"
);

-- Unique constraints
CREATE UNIQUE INDEX idx_property_slug ON "Property" ("slug")
  WHERE "deletedAt" IS NULL;

CREATE UNIQUE INDEX idx_guest_email ON "Guest" ("email", "deletedAt");
```

### Data Migration Strategy

**Phase 1: Fresh Start**
- No migration from Scidoo (greenfield)
- Seed data for development/testing

**Phase 2: Import Existing Data**
```typescript
// scripts/migrate-from-scidoo.ts
async function migrateProperties() {
  const scidooData = await fetchFromScidoo();
  
  for (const prop of scidooData) {
    await prisma.property.create({
      data: transformProperty(prop),
    });
  }
}
```

**Backup Strategy**:
- Neon provides automated daily backups
- Point-in-time recovery available
- Manual backups before major migrations

---

## Security Architecture

### Authentication Flow

```
1. User visits app
   ↓
2. Clerk Middleware checks session
   ↓
3a. Authenticated → Set user context
   ↓
4. Server Component accesses user via auth()
   ↓
5. Queries filtered by user.organizationId

3b. Not Authenticated → Redirect to login
   ↓
4. Clerk Universal Login
   ↓
5. OAuth, Email/Password, or MFA
   ↓
6. Create session, redirect back
```

### Authorization

**Role-Based Permissions**:

```typescript
const PERMISSIONS = {
  OWNER: ['*'],
  MANAGER: ['property:*', 'room:*', 'booking:*', 'report:read'],
  RECEPTIONIST: ['booking:*', 'guest:*', 'payment:create'],
  HOUSEKEEPING: ['room:read', 'room:updateStatus'],
  F_AND_B: ['booking:read', 'charge:create'],
  GUEST_SERVICES: ['booking:read', 'service:*'],
};

function checkPermission(role: UserRole, action: string): boolean {
  const permissions = PERMISSIONS[role];
  return permissions.includes('*') || 
         permissions.includes(action) ||
         permissions.some(p => p.endsWith(':*') && action.startsWith(p.split(':')[0]));
}
```

**Middleware Guard**:

```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const user = await auth();
  
  if (!user) {
    return NextResponse.redirect('/sign-in');
  }
  
  // Check permissions
  const action = getActionFromPath(request.nextUrl.pathname);
  if (!checkPermission(user.role, action)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  return NextResponse.next();
}
```

### Data Protection

**1. Input Validation**:
```typescript
import { z } from 'zod';

const propertySchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  // ...
});

export async function createProperty(data: unknown) {
  const validated = propertySchema.parse(data);
  // Safe to use validated data
}
```

**2. SQL Injection Prevention**:
- Prisma uses parameterized queries automatically
- Never use raw SQL with user input

**3. XSS Prevention**:
- React escapes output by default
- Use `dangerouslySetInnerHTML` only for trusted content
- Sanitize rich text with DOMPurify

**4. CSRF Protection**:
- Clerk handles CSRF tokens
- Server Actions use POST only
- SameSite cookies

**5. Rate Limiting**:
```typescript
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'),
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for');
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  
  // Process request
}
```

### Compliance

**GDPR (Europe)**:
- User consent for data processing
- Right to access, download, delete data
- Data retention policies
- Privacy policy and cookie policy

**LGPD (Brazil)**:
- Similar to GDPR
- Data protection officer (DPO) if required
- User consent mechanisms

**PCI DSS (Payments)**:
- Never store full credit card numbers
- Use tokenization (Stripe, Nexi)
- Secure transmission (HTTPS)
- Regular security audits

---

## Deployment Architecture

### Vercel Deployment

```
┌─────────────────────────────────────────┐
│          Vercel Edge Network             │
│  ┌───────────────────────────────────┐  │
│  │   CDN (Static Assets, Images)     │  │
│  └───────────────────────────────────┘  │
│                  │                       │
│  ┌───────────────▼───────────────────┐  │
│  │   Next.js Server (Serverless)     │  │
│  │   ┌────────────┐  ┌────────────┐  │  │
│  │   │  Server    │  │   Server   │  │  │
│  │   │ Components │  │  Actions   │  │  │
│  │   └────────────┘  └────────────┘  │  │
│  └───────────────────────────────────┘  │
└──────────────┬──────────────────────────┘
               │
        ┌──────┴───────┐
        │              │
┌───────▼──────┐  ┌────▼──────┐
│   Neon DB    │  │   Clerk   │
│  (Primary)   │  │   Auth    │
└──────────────┘  └───────────┘
```

### Environment Configuration

**Production**:
```bash
# Database
DATABASE_URL="postgresql://user:pass@neon-prod.aws/nexora?sslmode=require"
DATABASE_URL_UNPOOLED="..." # For migrations

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."

# Features
NEXT_PUBLIC_APP_URL="https://app.nexora.com"
ENABLE_ANALYTICS=true

# Integrations
STRIPE_SECRET_KEY="sk_live_..."
NEXI_API_KEY="..."
ROOMCLOUD_API_KEY="..."
WHATSAPP_API_KEY="..."

# Monitoring
SENTRY_DSN="https://..."
SENTRY_ORG="nexora"
SENTRY_PROJECT="production"
```

**Staging**:
- Separate Neon database
- Clerk development instance
- Test API keys for integrations
- Sentry staging project

**Development**:
- Local Neon database or Docker PostgreSQL
- Clerk development keys
- Mock data and seed scripts

### CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm run lint
      - run: pnpm run type-check
      - run: pnpm run test
      - run: pnpm run build
  
  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Monitoring & Observability

**1. Error Tracking (Sentry)**:
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
```

**2. Performance Monitoring (Vercel)**:
- Web Vitals (FCP, LCP, CLS, FID, TTFB)
- Server-side timing
- Database query performance
- Real User Monitoring (RUM)

**3. Logging**:
```typescript
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  }
});

logger.info({ propertyId }, 'Property created');
logger.error({ error, propertyId }, 'Failed to create property');
```

**4. Alerts**:
- Sentry: > 10 errors/hour
- Vercel: > 5s response time
- Neon: > 80% connection pool usage
- Custom: Booking failures, payment issues

---

## Integration Architecture

### RoomCloud (Channel Manager)

**Endpoints**:
```typescript
// packages/channel-manager/src/roomcloud.ts
export class RoomCloudClient {
  async syncAvailability(propertyId: string, dates: DateRange) {
    // Push availability to RoomCloud
  }
  
  async syncRates(propertyId: string, rates: RateData[]) {
    // Push rates to RoomCloud
  }
  
  async handleWebhook(payload: WebhookPayload) {
    // Process booking updates from RoomCloud
  }
}
```

**Webhook Handler**:
```typescript
// app/api/webhooks/roomcloud/route.ts
export async function POST(request: Request) {
  const signature = request.headers.get('x-roomcloud-signature');
  const payload = await request.json();
  
  // Verify signature
  if (!verifySignature(payload, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }
  
  // Process booking
  await processRoomCloudBooking(payload);
  
  return NextResponse.json({ success: true });
}
```

### Payment Gateways

**Stripe**:
```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createPaymentIntent(amount: number, currency: string) {
  return await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency,
    automatic_payment_methods: { enabled: true },
  });
}
```

**Nexi (Italy)**:
```typescript
export class NexiClient {
  async createPayment(data: PaymentData) {
    const response = await fetch('https://api.nexi.it/v1/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}
```

### WhatsApp Business API

```typescript
export async function sendWhatsAppMessage(to: string, message: string) {
  await fetch('https://graph.facebook.com/v17.0/MESSAGE_ID/messages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: message },
    }),
  });
}
```

### Metabase (Analytics & BI)

**Purpose**: Embedded analytics and business intelligence for property managers

**Deployment**: Self-hosted Metabase instance via Docker

**Architecture**:

```
┌─────────────────────────────────────────────────┐
│          Nexora Application (Next.js)            │
│  ┌──────────────────────────────────────────┐  │
│  │  Reports & Analytics Pages               │  │
│  │  - Embedded iframes (signed URLs)        │  │
│  │  - React components with Metabase SDK    │  │
│  └──────────────────────────────────────────┘  │
│                   │                             │
│                   │ JWT SSO                     │
│                   ▼                             │
│  ┌──────────────────────────────────────────┐  │
│  │        Metabase Container (Docker)       │  │
│  │  ┌────────────────────────────────────┐  │  │
│  │  │  - Dashboard Engine                │  │  │
│  │  │  - Query Builder                   │  │  │
│  │  │  - Visualization Engine            │  │  │
│  │  │  - Embedding API                   │  │  │
│  │  └────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────┘  │
│                   │                             │
│                   │ Read-Only PostgreSQL        │
│                   ▼                             │
│  ┌──────────────────────────────────────────┐  │
│  │    Neon Database (PostgreSQL)            │  │
│  │  - Metabase reads data                   │  │
│  │  - Organization filtering via context    │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

**Setup**:

```yaml
# docker-compose.yml for Metabase
version: '3.8'
services:
  metabase:
    image: metabase/metabase:latest
    container_name: nexora-metabase
    ports:
      - "3001:3000"
    environment:
      MB_DB_TYPE: postgres
      MB_DB_DBNAME: metabase
      MB_DB_PORT: 5432
      MB_DB_USER: metabase_app
      MB_DB_PASS: ${METABASE_DB_PASSWORD}
      MB_DB_HOST: ${METABASE_DB_HOST}
      MB_EMBEDDING_SECRET_KEY: ${METABASE_EMBEDDING_SECRET}
      MB_SITE_URL: ${METABASE_SITE_URL}
      JAVA_OPTS: "-Xmx2g -XX:MaxRAMPercentage=75.0"
    volumes:
      - metabase-data:/metabase-data
    restart: unless-stopped

volumes:
  metabase-data:
```

**Authentication & Security**:

```typescript
// packages/analytics/src/metabase.ts
import jwt from 'jsonwebtoken';

export interface MetabaseEmbedOptions {
  resource: { dashboard: number } | { question: number };
  params?: Record<string, any>;
  exp?: number; // Expiration (default 10 minutes)
}

export function generateMetabaseEmbedUrl(
  options: MetabaseEmbedOptions
): string {
  const METABASE_SITE_URL = process.env.METABASE_SITE_URL!;
  const METABASE_SECRET_KEY = process.env.METABASE_EMBEDDING_SECRET!;
  
  const payload = {
    resource: options.resource,
    params: options.params || {},
    exp: Math.round(Date.now() / 1000) + (options.exp || 600), // 10 min default
  };
  
  const token = jwt.sign(payload, METABASE_SECRET_KEY);
  
  const resourceType = 'dashboard' in options.resource ? 'dashboard' : 'question';
  const resourceId = options.resource[resourceType];
  
  return `${METABASE_SITE_URL}/embed/${resourceType}/${token}#bordered=false&titled=false`;
}

// SSO Integration with Clerk
export async function setupMetabaseSSO(userId: string, userEmail: string) {
  const ssoToken = jwt.sign(
    {
      email: userEmail,
      first_name: user.firstName,
      last_name: user.lastName,
      exp: Math.round(Date.now() / 1000) + 3600, // 1 hour
    },
    METABASE_SECRET_KEY
  );
  
  return ssoToken;
}
```

**Row-Level Security (Multi-tenancy)**:

```sql
-- Create Metabase read-only user
CREATE USER metabase_readonly WITH PASSWORD 'secure_password';

-- Grant read-only access
GRANT CONNECT ON DATABASE nexora TO metabase_readonly;
GRANT USAGE ON SCHEMA public TO metabase_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO metabase_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO metabase_readonly;

-- Create views with organization filtering
CREATE OR REPLACE VIEW metabase_bookings AS
SELECT 
  b.*,
  p.name AS property_name,
  p.organization_id
FROM bookings b
JOIN properties p ON b.property_id = p.id
WHERE p.organization_id = current_setting('app.current_organization_id', true)::text;

-- Set organization context before queries
SET app.current_organization_id = 'org_xxx';
```

**React Component for Embedding**:

```typescript
// packages/design-system/components/analytics/metabase-dashboard.tsx
'use client'

import { useEffect, useState } from 'react';

interface MetabaseDashboardProps {
  dashboardId: number;
  params?: Record<string, any>;
  height?: string;
}

export function MetabaseDashboard({ 
  dashboardId, 
  params, 
  height = '800px' 
}: MetabaseDashboardProps) {
  const [embedUrl, setEmbedUrl] = useState<string>('');
  
  useEffect(() => {
    async function fetchEmbedUrl() {
      const response = await fetch('/api/analytics/embed-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'dashboard',
          id: dashboardId,
          params,
        }),
      });
      
      const data = await response.json();
      setEmbedUrl(data.url);
    }
    
    fetchEmbedUrl();
  }, [dashboardId, params]);
  
  if (!embedUrl) {
    return <div>Loading dashboard...</div>;
  }
  
  return (
    <iframe
      src={embedUrl}
      frameBorder="0"
      width="100%"
      height={height}
      allowTransparency
      className="rounded-lg border"
    />
  );
}
```

**API Route for Embed URLs**:

```typescript
// app/api/analytics/embed-url/route.ts
import { auth } from '@clerk/nextjs';
import { generateMetabaseEmbedUrl } from '@repo/analytics';

export async function POST(request: Request) {
  const { userId, orgId } = auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { type, id, params } = await request.json();
  
  // Add organization filter to params
  const filteredParams = {
    ...params,
    organization_id: orgId,
  };
  
  const url = generateMetabaseEmbedUrl({
    resource: type === 'dashboard' ? { dashboard: id } : { question: id },
    params: filteredParams,
  });
  
  return NextResponse.json({ url });
}
```

**Pre-built Dashboards**:

1. **Property Performance Dashboard**
   - Occupancy rate (current, historical, forecast)
   - Revenue trends
   - ADR (Average Daily Rate)
   - RevPAR (Revenue Per Available Room)
   - Booking source breakdown

2. **Occupancy Analytics**
   - Room category performance
   - Seasonal trends
   - Day-of-week patterns
   - Booking lead time
   - Length of stay distribution

3. **Revenue Analytics**
   - Revenue by source (direct, OTA breakdown)
   - Rate plan performance
   - Discount impact analysis
   - Revenue forecast
   - Channel manager performance

4. **Guest Insights**
   - Demographics (nationality, age groups)
   - Repeat guest rate
   - Guest satisfaction trends
   - Booking patterns
   - Average booking value

5. **Operational Metrics**
   - Check-in/check-out times
   - Housekeeping efficiency
   - Maintenance requests
   - Staff performance
   - Response times

**Custom SQL Queries Example**:

```sql
-- Occupancy Rate Over Time
SELECT 
  date_trunc('day', check_in) AS date,
  COUNT(DISTINCT room_id) AS occupied_rooms,
  (SELECT COUNT(*) FROM rooms WHERE property_id = {{property_id}}) AS total_rooms,
  ROUND(
    COUNT(DISTINCT room_id)::numeric / 
    (SELECT COUNT(*) FROM rooms WHERE property_id = {{property_id}})::numeric * 100, 
    2
  ) AS occupancy_rate
FROM bookings
WHERE property_id = {{property_id}}
  AND check_in >= {{start_date}}
  AND check_in <= {{end_date}}
  AND status IN ('CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT')
GROUP BY date_trunc('day', check_in)
ORDER BY date;
```

**Benefits**:
- ✅ **No custom development**: Leverage Metabase's features
- ✅ **Self-service**: Users create their own reports
- ✅ **Professional visualizations**: Publication-quality charts
- ✅ **Multi-tenancy**: Automatic organization filtering
- ✅ **Secure embedding**: JWT-signed URLs
- ✅ **Scalable**: Handles complex queries efficiently
- ✅ **Cost-effective**: Open-source, no per-seat licensing

**Deployment Notes**:
- Run Metabase in Docker container
- Separate database for Metabase metadata (not main Neon DB)
- Read-only database connection for security
- Regular backups of Metabase configuration
- Monitor query performance and optimize slow queries

---

## Performance & Scalability

### Caching Strategy

**1. Server Component Caching**:
```typescript
export const revalidate = 60; // Revalidate every 60 seconds

export default async function PropertiesPage() {
  const properties = await getProperties(); // Cached
  return <PropertiesList properties={properties} />;
}
```

**2. Data Caching**:
```typescript
import { unstable_cache } from 'next/cache';

const getCachedProperty = unstable_cache(
  async (id: string) => {
    return await prisma.property.findUnique({ where: { id } });
  },
  ['property'],
  { revalidate: 300, tags: ['properties'] }
);
```

**3. Manual Revalidation**:
```typescript
import { revalidatePath, revalidateTag } from 'next/cache';

export async function updateProperty(id: string, data: PropertyData) {
  await prisma.property.update({ where: { id }, data });
  revalidatePath('/properties');
  revalidateTag('properties');
}
```

### Database Optimization

**1. Connection Pooling**:
```typescript
// Prisma automatically pools connections
// Configure in prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"
}
```

**2. Query Optimization**:
```typescript
// ✅ GOOD - Eager loading
const properties = await prisma.property.findMany({
  include: {
    roomCategories: {
      include: {
        rooms: true,
      },
    },
  },
});

// ❌ BAD - N+1 queries
const properties = await prisma.property.findMany();
for (const prop of properties) {
  const categories = await prisma.roomCategory.findMany({
    where: { propertyId: prop.id },
  });
}
```

**3. Pagination**:
```typescript
const pageSize = 20;
const page = 1;

const properties = await prisma.property.findMany({
  take: pageSize,
  skip: (page - 1) * pageSize,
  orderBy: { name: 'asc' },
});

const totalCount = await prisma.property.count();
```

### Image Optimization

**Next.js Image Component**:
```typescript
import Image from 'next/image';

<Image
  src="/room-photo.jpg"
  alt="Deluxe Room"
  width={800}
  height={600}
  priority={isAboveFold}
  placeholder="blur"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

**Vercel Blob Storage**:
- Automatic WebP conversion
- Responsive image generation
- Global CDN distribution
- On-demand optimization

### Horizontal Scaling

**Vercel Automatic Scaling**:
- Serverless functions scale automatically
- No capacity planning needed
- Pay per request
- Edge caching reduces origin load

**Database Scaling (Neon)**:
- Automatic connection pooling
- Read replicas (if needed)
- Vertical scaling (increase resources)
- Branching for development/staging

---

## Development Workflow

### Local Development

**1. Setup**:
```bash
# Clone repository
git clone https://github.com/nexora/nexora.git
cd nexora

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# Run database migrations
pnpm db:migrate

# Seed database
pnpm db:seed

# Start development server
pnpm dev
```

**2. Database Management**:
```bash
# Create migration
pnpm db:migrate:create

# Apply migrations
pnpm db:migrate

# Reset database
pnpm db:reset

# Seed data
pnpm db:seed

# Prisma Studio
pnpm db:studio
```

**3. Code Quality**:
```bash
# Lint code
pnpm lint

# Format code
pnpm format

# Type check
pnpm type-check

# Run tests
pnpm test

# Run E2E tests
pnpm test:e2e
```

### Feature Development

**1. OpenSpec Workflow**:
```bash
# Check existing specs
openspec spec list --long

# Create new change
CHANGE=add-feature-name
mkdir -p openspec/changes/$CHANGE/specs
touch openspec/changes/$CHANGE/proposal.md
touch openspec/changes/$CHANGE/tasks.md

# Validate
openspec validate $CHANGE --strict

# After implementation
openspec archive $CHANGE
```

**2. Git Workflow**:
```bash
# Create feature branch
git checkout -b feature/add-feature-name

# Make changes, commit
git add .
git commit -m "feat: add feature name"

# Push and create PR
git push origin feature/add-feature-name
```

**3. PR Review Checklist**:
- [ ] Tests pass
- [ ] Linting passes
- [ ] Type checking passes
- [ ] Changes documented
- [ ] Database migrations included
- [ ] OpenSpec updated
- [ ] No console errors
- [ ] Accessibility checked
- [ ] Performance tested

### Testing Strategy

**Unit Tests (Vitest)**:
```typescript
// __tests__/utils/property.test.ts
import { describe, it, expect } from 'vitest';
import { calculateOccupancy } from '../utils/property';

describe('calculateOccupancy', () => {
  it('should calculate occupancy percentage', () => {
    expect(calculateOccupancy(80, 100)).toBe(80);
  });
});
```

**Integration Tests**:
```typescript
// __tests__/integration/property.test.ts
import { test, expect } from '@playwright/test';

test('create property', async ({ page }) => {
  await page.goto('/properties/new');
  await page.fill('[name="name"]', 'Test Property');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Property created')).toBeVisible();
});
```

**E2E Tests (Playwright)**:
```typescript
// e2e/booking-flow.spec.ts
test('complete booking flow', async ({ page }) => {
  // Login
  await page.goto('/sign-in');
  await page.fill('[name="email"]', 'test@example.com');
  // ... complete flow
});
```

---

## Decision Log

### Key Architectural Decisions

**ADR-001: Next.js over Custom Backend**
- **Decision**: Use Next.js App Router instead of separate backend
- **Rationale**: Simplified deployment, better DX, Server Components
- **Trade-offs**: Coupled to Next.js, vendor lock-in to Vercel

**ADR-002: Neon over Self-Hosted PostgreSQL**
- **Decision**: Use Neon serverless PostgreSQL
- **Rationale**: Auto-scaling, branching, no ops overhead
- **Trade-offs**: Vendor lock-in, higher cost at scale

**ADR-003: Clerk over NextAuth**
- **Decision**: Use Clerk for authentication
- **Rationale**: Better UX, hosted UI, MFA built-in
- **Trade-offs**: Cost per user, vendor lock-in

**ADR-004: Monorepo over Polyrepo**
- **Decision**: Use monorepo with Turbo
- **Rationale**: Code sharing, atomic changes, easier refactoring
- **Trade-offs**: More complex setup, larger repo

**ADR-005: Prisma over Raw SQL**
- **Decision**: Use Prisma ORM
- **Rationale**: Type-safety, migrations, great DX
- **Trade-offs**: Learning curve, abstraction overhead

---

## Future Considerations

### Mobile Apps
- React Native with shared types from monorepo
- Expo for faster development
- Share business logic via npm packages

### API for Third-Party Integrations
- GraphQL API layer
- Public API documentation
- Rate limiting and authentication
- Webhook system for events

### Advanced Features
- Machine learning for dynamic pricing
- Computer vision for room photos
- Natural language for guest communication
- Blockchain for loyalty programs (?)

---

**END OF ARCHITECTURE DOCUMENT**

