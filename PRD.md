# Nexora - Product Requirements Document (PRD)

**Version**: 1.0  
**Date**: October 26, 2025  
**Status**: Draft  
**Author**: AI Assistant + Max  

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Product Vision](#product-vision)
3. [Target Market](#target-market)
4. [User Personas](#user-personas)
5. [Feature Requirements](#feature-requirements)
6. [Technical Architecture](#technical-architecture)
7. [Data Model](#data-model)
8. [Integrations](#integrations)
9. [Internationalization](#internationalization)
10. [Security & Compliance](#security--compliance)
11. [Performance Requirements](#performance-requirements)
12. [Phased Delivery Plan](#phased-delivery-plan)
13. [Success Metrics](#success-metrics)

---

## Executive Summary

Nexora is a next-generation hospitality property management system (PMS) designed to modernize operations for small to medium-sized properties in Italy and Brazil. Built on the Next-Forge framework with Neon DB and Prisma ORM, Nexora replaces legacy systems like Scidoo with a contemporary, cloud-based solution that emphasizes performance, scalability, and user experience.

### Key Highlights

- **Multi-tenant SaaS**: Support multiple properties under one organization
- **Modern Stack**: Next.js 14+, Neon PostgreSQL, Prisma, Clerk Auth
- **Desktop-First**: Optimized for desktop web browsers
- **Phased Approach**: MVP focuses on Property/Room Management, with scaffolding for future features
- **International**: Italy (primary), Brazil (secondary), with i18n support

---

## Product Vision

### Mission Statement

To provide hospitality property owners and managers with a powerful, intuitive platform that streamlines operations, increases revenue, and enhances guest satisfaction through modern technology and intelligent automation.

### Value Proposition

- **For Property Owners**: Centralized management of multiple properties with real-time insights
- **For Managers**: Streamlined operations with role-based access and automation
- **For Staff**: Intuitive interfaces that reduce training time and errors
- **For Guests**: Seamless booking experiences across multiple channels

### Differentiation from Scidoo

1. **Modern Architecture**: Cloud-native, serverless, scalable
2. **Better UX**: Contemporary design using shadcn/ui
3. **Real-time Collaboration**: Multiple users can work simultaneously
4. **Extensible**: Monorepo structure for easy feature additions
5. **API-First**: Built for future mobile apps and third-party integrations

---

## Target Market

### Geographic Markets

#### Primary: Italy
- **Market Size**: ~33,000 hospitality properties
- **Regulatory**: Full Italian fiscal compliance (ISTAT, tourist tax, electronic invoicing)
- **Language**: Italian (primary), English (secondary)
- **Payment**: Nexi, Stripe, local payment methods

#### Secondary: Brazil
- **Market Size**: ~25,000 target properties
- **Regulatory**: Brazilian fiscal requirements (placeholder initially)
- **Language**: Portuguese (primary), English (secondary)
- **Payment**: Local Brazilian payment processors

### Property Types

1. **Small B&Bs** (5-15 rooms)
   - Family-owned
   - Personal service focus
   - Simple operations

2. **Resort Villaggi** (20-100 units)
   - Multiple accommodation types
   - Additional services (F&B, activities)
   - Seasonal operations

3. **Open Air Resorts** (50-200 sites)
   - Camping, glamping, RV sites
   - Complex pricing structures
   - Peak season management

4. **Small Hotels** (15-100 rooms)
   - Business and leisure travelers
   - Restaurant/bar operations
   - Conference facilities

### User Scale

- **Concurrent Users**: Up to 50 per property
- **Departments**: Front office, Housekeeping, F&B, Maintenance, Management, Guest Services
- **Properties per Organization**: 1-20 (typical), scalable to 100+

---

## User Personas

### 1. Maria - Property Owner

**Demographics**: 45-65 years old, owns 2-3 properties  
**Tech Savvy**: Moderate  
**Goals**:
- Monitor performance across all properties
- Make data-driven pricing decisions
- Ensure staff compliance

**Pain Points**:
- Managing multiple properties in different systems
- Limited visibility into operations
- Complex reporting

**Nexora Solutions**:
- Multi-property dashboard
- Consolidated reporting
- Role-based access for managers

### 2. Giovanni - Hotel Manager

**Demographics**: 30-50 years old, manages single property  
**Tech Savvy**: High  
**Goals**:
- Maximize occupancy and revenue
- Coordinate staff efficiently
- Handle guest requests promptly

**Pain Points**:
- Juggling multiple systems
- Manual processes
- Channel manager sync issues

**Nexora Solutions**:
- Unified platform for all operations
- Automated channel updates
- Real-time collaboration

### 3. Alessandra - Receptionist

**Demographics**: 20-35 years old, front desk operations  
**Tech Savvy**: Moderate  
**Goals**:
- Quick check-in/check-out
- Accurate bookings
- Handle guest issues

**Pain Points**:
- Complex software interfaces
- Training time
- Double bookings

**Nexora Solutions**:
- Intuitive UI
- Guided workflows
- Conflict prevention

### 4. Carlos - Housekeeping Manager

**Demographics**: 30-55 years old, housekeeping operations  
**Tech Savvy**: Low to Moderate  
**Goals**:
- Efficient room assignments
- Track cleaning status
- Manage staff schedules

**Pain Points**:
- Paper-based tracking
- Communication gaps
- Prioritization

**Nexora Solutions**:
- Digital room status
- Mobile-friendly (future)
- Priority indicators

### 5. Sofia - F&B Manager

**Demographics**: 28-45 years old, restaurant/bar operations  
**Tech Savvy**: Moderate  
**Goals**:
- Track guest charges
- Manage inventory
- Coordinate with front desk

**Pain Points**:
- Separate POS systems
- Manual guest billing
- Stock management

**Nexora Solutions**:
- Integrated guest accounts
- Unified billing
- Inventory tracking (future)

---

## Feature Requirements

### Phase 1: Property & Room Management (MVP - Comprehensive)

#### 1.1 Multi-Property Management

**Priority**: P0 (Must Have)

**Requirements**:
- Organization-level account hierarchy
- Multiple properties per organization
- Property-level settings and configuration
- Switch between properties seamlessly
- Consolidated reporting across properties

**User Stories**:
- As an owner, I can add multiple properties to my organization
- As an owner, I can assign managers to specific properties
- As a manager, I can only access my assigned properties
- As an owner, I can view aggregated data across all properties

**Acceptance Criteria**:
- [ ] Organization model with properties relationship
- [ ] Property CRUD operations with permissions
- [ ] Property switcher in UI
- [ ] Data isolation between properties enforced
- [ ] Bulk operations across properties

#### 1.2 Property Configuration

**Priority**: P0 (Must Have)

**Requirements**:
- Basic property information (name, address, contact)
- Check-in/check-out times
- Property type classification
- Amenities and facilities
- Policies (cancellation, pets, smoking)
- Fiscal identifiers (CIN, CIR, VAT number)
- Season/period definitions
- Currency settings

**User Stories**:
- As a manager, I can configure my property's basic information
- As a manager, I can set check-in/check-out times
- As a manager, I can define seasonal periods for pricing
- As a manager, I can manage property-level amenities

**Acceptance Criteria**:
- [ ] Property settings page with form validation
- [ ] Support for Italian fiscal requirements (CIN, CIR)
- [ ] Support for Brazilian requirements (placeholder)
- [ ] Season/period calendar with color coding
- [ ] Amenity management with categories

#### 1.3 Room Category Management

**Priority**: P0 (Must Have)

**Requirements**:
- Create and manage room categories (types)
- Category attributes:
  - Name and short name (for calendar display)
  - Capacity (min/max occupants)
  - Extra person capacity by age group
  - Room size (square meters)
  - Bed configurations
  - Default bed arrangement
  - Color coding for calendar
  - Pet policy
  - Description and marketing copy
  - Photos and virtual tours
  - Category-specific amenities
- Category-level pricing rules
- Occupancy-based pricing support
- Per-person pricing support

**User Stories**:
- As a manager, I can create room categories with detailed attributes
- As a manager, I can define multiple bed configurations per category
- As a manager, I can set capacity limits including extra persons
- As a manager, I can upload photos and videos for each category
- As a manager, I can configure which amenities apply to each category

**Acceptance Criteria**:
- [ ] Room category CRUD with rich attributes
- [ ] Bed configuration management
- [ ] Photo/video upload and management
- [ ] Amenity association
- [ ] Capacity validation rules
- [ ] Color picker for calendar display
- [ ] Preview of how category appears to guests

#### 1.4 Individual Room Management

**Priority**: P0 (Must Have)

**Requirements**:
- Individual rooms within categories
- Room-specific overrides:
  - Custom name/number
  - Specific floor/location
  - Bookable status (online/offline)
  - Specific amenities (if different from category)
  - Maintenance status
  - Specific CIN (if required per room)
- Room ordering and grouping
- Bulk operations (assign category, set status)

**User Stories**:
- As a manager, I can create individual rooms within a category
- As a manager, I can override category settings for specific rooms
- As a manager, I can take rooms offline for maintenance
- As a manager, I can reorder rooms for calendar display
- As a manager, I can bulk-assign attributes to multiple rooms

**Acceptance Criteria**:
- [ ] Room CRUD with category inheritance
- [ ] Override mechanism for room-specific settings
- [ ] Maintenance mode with date ranges
- [ ] Drag-and-drop room ordering
- [ ] Bulk edit interface
- [ ] Room availability status indicators

#### 1.5 Capacity & Availability Management

**Priority**: P0 (Must Have)

**Requirements**:
- Real-time availability calculation
- Capacity tracking per room category
- Overbooking controls
- Date range availability views
- Available vs. sold vs. blocked rooms
- Integration with booking system (Phase 2)
- Channel manager sync (Phase 3)

**User Stories**:
- As a manager, I can view availability for all room types
- As a manager, I can manually block dates for maintenance
- As a manager, I can see occupancy percentages
- As a receptionist, I can quickly check which rooms are available

**Acceptance Criteria**:
- [ ] Availability calendar view (month, week, day)
- [ ] Color-coded availability status
- [ ] Capacity calculations respect category settings
- [ ] Manual block/unblock functionality
- [ ] Export availability data
- [ ] Real-time updates with Liveblocks

#### 1.6 Room Amenities System

**Priority**: P0 (Must Have)

**Requirements**:
- Predefined amenity categories:
  - Room features (AC, heating, WiFi)
  - Bathroom (shower, tub, hairdryer)
  - Entertainment (TV, streaming, games)
  - Kitchen (mini-fridge, kitchenette, coffee maker)
  - Safety (safe, smoke detector, first aid)
  - Accessibility (wheelchair accessible, grab bars)
- Custom amenity creation
- Icon support for each amenity
- Multi-language amenity names
- Amenity filtering for guest searches

**User Stories**:
- As a manager, I can select from pre-defined amenities
- As a manager, I can create custom amenities
- As a manager, I can assign amenities at category or room level
- As a guest (future), I can filter rooms by amenities

**Acceptance Criteria**:
- [ ] Amenity library with categories
- [ ] Icon selection or upload
- [ ] Multi-language support via languine
- [ ] Bulk amenity assignment
- [ ] Amenity analytics (most requested, etc.)

### Phase 2: Booking Management (Scaffolding)

**Priority**: P1 (High Priority, Future)

**Placeholder Requirements**:
- Booking creation and management
- Guest information capture
- Check-in/check-out workflow
- Booking modifications and cancellations
- Split bookings (room changes mid-stay)
- Group bookings
- Guest history and preferences
- Booking notes and comments

**Scaffolding Deliverables**:
- [ ] Database schema for bookings
- [ ] API endpoint stubs
- [ ] UI placeholders in navigation
- [ ] Basic booking list view (mock data)
- [ ] Documentation of booking lifecycle

### Phase 3: Channel Manager Integration (Scaffolding)

**Priority**: P1 (High Priority, Future)

**Placeholder Requirements**:
- RoomCloud integration (primary)
- Airbnb connection via RoomCloud
- Booking.com connection via RoomCloud
- Expedia connection via RoomCloud
- Trivago metasearch
- Real-time inventory sync
- Price and availability updates
- Booking import
- Two-way communication

**Scaffolding Deliverables**:
- [ ] Channel manager settings page (UI only)
- [ ] RoomCloud API integration points documented
- [ ] Webhook handlers (stubs)
- [ ] Sync status dashboard (mock)
- [ ] Direct integration placeholders (Airbnb, Booking.com)

### Phase 4: Payment Processing (Scaffolding)

**Priority**: P1 (High Priority, Future)

**Placeholder Requirements**:
- Deposit management (caparra)
- Partial payments (acconti)
- Full payment (saldo)
- Payment methods: Credit card, bank transfer, cash
- Payment gateway integration: Stripe, Nexi, Revolut
- Payment history and receipts
- Refunds and chargebacks
- Split payments across bookings
- Payment status tracking

**Scaffolding Deliverables**:
- [ ] Payment schema in database
- [ ] Payment settings page (UI)
- [ ] Gateway integration placeholders
- [ ] Payment workflow documentation
- [ ] Receipt generation placeholder

### Phase 5: Fiscal & Tax Compliance (Scaffolding)

**Priority**: P1 (High Priority, Future)

**Placeholder Requirements**:

#### Italy
- ISTAT reporting
- Tourist tax (imposta di soggiorno)
- Electronic invoicing (Fattura Elettronica)
- Cassetto Fiscale integration
- Team System integration
- Alloggiati web (guest registry)
- Split payment (scissione dei pagamenti)

#### Brazil
- Brazilian fiscal requirements (placeholder)
- Tax calculation rules
- Invoice generation (NFe)

**Scaffolding Deliverables**:
- [ ] Tax settings page per country
- [ ] ISTAT export placeholder
- [ ] Invoice generation UI (mock)
- [ ] Integration documentation
- [ ] Tax calculation engine (stub)

### Phase 6: Price Lists & Revenue Management (Scaffolding)

**Priority**: P1 (High Priority, Future)

**Placeholder Requirements**:
- Per-person pricing
- Per-occupancy pricing
- Mixed pricing models
- Seasonal pricing
- Age-based pricing (adults, children, infants)
- Length-of-stay discounts
- Last-minute discounts
- Early booking discounts
- Derived pricing (from base rates)
- Price rules and restrictions
- Minimum stay requirements
- Channel-specific pricing
- Dynamic pricing (future)

**Scaffolding Deliverables**:
- [ ] Pricing schema in database
- [ ] Price list management UI (basic)
- [ ] Season/period calendar (from Phase 1)
- [ ] Price calculation engine (documented)
- [ ] Rate plan inheritance model

### Phase 7: Guest Communication (Scaffolding)

**Priority**: P2 (Nice to Have, Future)

**Placeholder Requirements**:
- WhatsApp integration
- Email templates
- SMS notifications
- Automated messages:
  - Booking confirmation
  - Check-in reminders
  - Check-out reminders
  - Payment confirmations
- Manual messaging
- Message history per guest
- Multi-language support

**Scaffolding Deliverables**:
- [ ] Communication settings page
- [ ] WhatsApp Business API documentation
- [ ] Message template editor (UI only)
- [ ] Message log table (schema)

### Phase 8: Statistics & Reporting (Scaffolding)

**Priority**: P2 (Nice to Have, Future)

**Placeholder Requirements**:
- Occupancy reports
- Revenue reports
- Guest demographics
- Source of business analysis
- Room performance
- Rate performance
- Forecast reports
- Custom report builder
- Export to Excel/PDF

**Scaffolding Deliverables**:
- [ ] Reports dashboard (UI)
- [ ] Sample reports with mock data
- [ ] Data aggregation requirements documented
- [ ] Export functionality placeholder

### Phase 9: Booking Engine (Scaffolding)

**Priority**: P2 (Nice to Have, Future)

**Placeholder Requirements**:
- White-label booking widget
- Customizable design
- Real-time availability check
- Multi-language support
- Payment gateway integration
- Mobile-responsive
- SEO optimization
- Analytics tracking

**Scaffolding Deliverables**:
- [ ] Booking engine settings page
- [ ] Widget embed code (non-functional)
- [ ] Design customization UI
- [ ] API endpoints documented

### Phase 10: Hardware Integration (Scaffolding)

**Priority**: P3 (Low Priority, Future)

**Placeholder Requirements**:
- Thermal printer support
- Cash register (POS) integration
- Key card systems
- Door lock systems
- Payment terminals

**Scaffolding Deliverables**:
- [ ] Hardware settings page
- [ ] Integration documentation
- [ ] Printer driver requirements
- [ ] POS integration specs

---

## Technical Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Users (Web)                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTPS
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vercel Edge Network                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Next.js 14 Application                   │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │  │
│  │  │ App Router │  │  Server    │  │  Server    │     │  │
│  │  │   Pages    │  │ Components │  │  Actions   │     │  │
│  │  └────────────┘  └────────────┘  └────────────┘     │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────┬───────────────────────────────────────────────┘
             │
             ├──────────────────┬─────────────────────────────┐
             │                  │                             │
             ▼                  ▼                             ▼
┌────────────────────┐  ┌──────────────────┐  ┌──────────────────────┐
│   Neon Database    │  │  Clerk Auth      │  │   Liveblocks         │
│   (PostgreSQL)     │  │  Authentication  │  │   Real-time Collab   │
│                    │  │                  │  │                      │
│  ┌──────────────┐  │  │  - OAuth        │  │  - Presence          │
│  │    Prisma    │  │  │  - Sessions     │  │  - Cursors           │
│  │     ORM      │  │  │  - MFA          │  │  - Comments          │
│  └──────────────┘  │  │                  │  │                      │
└────────────────────┘  └──────────────────┘  └──────────────────────┘
             │
             │
             ▼
┌────────────────────────────────────────────────────────────┐
│                    External Integrations                    │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │ RoomCloud  │  │   Stripe   │  │   Nexi     │           │
│  │  Channel   │  │  Payments  │  │  Payments  │           │
│  │  Manager   │  │            │  │            │           │
│  └────────────┘  └────────────┘  └────────────┘           │
│                                                             │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │   Sentry   │  │  WhatsApp  │  │ Team System│           │
│  │   Error    │  │  Business  │  │   Fiscal   │           │
│  │  Tracking  │  │    API     │  │            │           │
│  └────────────┘  └────────────┘  └────────────┘           │
└────────────────────────────────────────────────────────────┘
```

### Monorepo Structure

```
nexora/
├── apps/
│   ├── app/                    # Main application
│   │   ├── app/
│   │   │   ├── (auth)/        # Auth routes
│   │   │   ├── (dashboard)/   # Main dashboard
│   │   │   │   ├── properties/
│   │   │   │   ├── rooms/
│   │   │   │   ├── bookings/  # Phase 2
│   │   │   │   ├── payments/  # Phase 4
│   │   │   │   └── settings/
│   │   │   └── api/           # API routes
│   │   └── instrumentation.ts
│   ├── api/                    # Separate API app (optional)
│   ├── web/                    # Marketing site
│   └── docs/                   # Documentation
├── packages/
│   ├── database/               # Prisma, migrations
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   └── src/
│   │       ├── client.ts
│   │       └── seed.ts
│   ├── auth/                   # Clerk integration
│   ├── design-system/          # shadcn/ui components
│   │   ├── components/
│   │   │   ├── ui/            # Base components
│   │   │   └── composite/     # Business components
│   │   └── styles/
│   ├── internationalization/   # Languine i18n
│   │   └── dictionaries/
│   │       ├── en.json
│   │       ├── it.json
│   │       └── pt.json
│   ├── payments/               # Stripe, Nexi, Revolut
│   ├── channel-manager/        # RoomCloud integration
│   ├── notifications/          # Email, SMS, WhatsApp
│   └── analytics/              # Tracking, reporting
├── openspec/                   # Specifications
│   ├── project.md
│   ├── AGENTS.md
│   ├── specs/
│   └── changes/
└── package.json
```

### Data Flow Patterns

#### Server-Side Rendering (SSR)
```typescript
// Page Component (Server Component)
export default async function PropertiesPage() {
  const properties = await getProperties(); // Direct DB call
  return <PropertiesList properties={properties} />;
}
```

#### Server Actions
```typescript
// Server Action
'use server'
export async function createProperty(formData: FormData) {
  const data = validatePropertyData(formData);
  const property = await db.property.create({ data });
  revalidatePath('/properties');
  return property;
}
```

#### Real-time Collaboration
```typescript
// Client Component with Liveblocks
'use client'
export function CollaborativeRoomEditor() {
  const { others } = useOthers();
  const [room, updateRoom] = useMutation(/* ... */);
  // Multiple users editing simultaneously
}
```

### Authentication Flow

```
User Login
    │
    ├──> Clerk Universal Login
    │        │
    │        ├──> Email/Password
    │        ├──> OAuth (Google, Microsoft)
    │        └──> MFA (if enabled)
    │
    ├──> JWT Token Issued
    │
    ├──> Middleware: Check user.organizationId
    │
    ├──> Redirect to Properties (tenant isolation)
    │
    └──> Server Components: Access user via auth()
```

### Multi-tenancy Implementation

**Strategy**: Shared database with tenant isolation via foreign keys

```prisma
model User {
  id             String   @id @default(cuid())
  clerkId        String   @unique
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id])
  // ...
}

model Property {
  id             String   @id @default(cuid())
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id])
  // ...
}

// Every query MUST include organizationId filter
```

**Row-Level Security**:
```typescript
// Every Prisma query
const properties = await prisma.property.findMany({
  where: {
    organizationId: user.organizationId, // REQUIRED
    // ... other filters
  }
});
```

### Caching Strategy

- **Static Pages**: ISR with 60s revalidation
- **Dynamic Pages**: Server Components (auto-cached by React)
- **API Routes**: 
  - GET: 30s cache for read-heavy operations
  - POST/PUT/DELETE: No cache, revalidate affected paths
- **Database**: Prisma query caching (default)
- **CDN**: Vercel Edge Network for static assets

---

## Data Model

### Core Entities

#### Organization
```prisma
model Organization {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  country     String   // 'IT' | 'BR'
  settings    Json     // Organization-level settings
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  deletedAt   DateTime?
  
  properties  Property[]
  users       User[]
}
```

#### User
```prisma
model User {
  id             String   @id @default(cuid())
  clerkId        String   @unique
  email          String   @unique
  name           String
  role           UserRole // OWNER, MANAGER, RECEPTIONIST, etc.
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id])
  propertyAccess PropertyAccess[] // Which properties user can access
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  deletedAt      DateTime?
}

enum UserRole {
  OWNER
  MANAGER
  RECEPTIONIST
  HOUSEKEEPING
  F_AND_B
  GUEST_SERVICES
  MAINTENANCE
}
```

#### Property
```prisma
model Property {
  id                String   @id @default(cuid())
  organizationId    String
  organization      Organization @relation(fields: [organizationId], references: [id])
  
  // Basic Information
  name              String
  slug              String   @unique
  type              PropertyType
  address           String
  city              String
  state             String?
  postalCode        String
  country           String
  phone             String
  email             String
  website           String?
  
  // Fiscal Information
  vatNumber         String?
  fiscalCode        String?
  cin               String?  // Codice Identificativo Nazionale (Italy)
  cir               String?  // Codice Identificativo Regionale (Italy)
  brazilianTaxId    String?  // CNPJ (Brazil)
  
  // Operational Settings
  checkInTime       String   // e.g., "14:00"
  checkOutTime      String   // e.g., "10:00"
  currency          String   @default("EUR")
  timezone          String   @default("Europe/Rome")
  
  // Settings
  settings          Json     // Property-specific settings
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  deletedAt         DateTime?
  
  roomCategories    RoomCategory[]
  rooms             Room[]
  seasons           Season[]
  amenities         PropertyAmenity[]
}

enum PropertyType {
  BNB
  RESORT_VILLAGGI
  OPEN_AIR_RESORT
  SMALL_HOTEL
  OTHER
}
```

#### Season (Period)
```prisma
model Season {
  id          String   @id @default(cuid())
  propertyId  String
  property    Property @relation(fields: [propertyId], references: [id])
  
  name        String   // e.g., "High Season", "Low Season"
  startDate   DateTime
  endDate     DateTime
  color       String   // Hex color for calendar display
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  deletedAt   DateTime?
}
```

#### RoomCategory
```prisma
model RoomCategory {
  id              String   @id @default(cuid())
  propertyId      String
  property        Property @relation(fields: [propertyId], references: [id])
  
  // Basic Information
  name            String
  shortName       String?  // For calendar display
  description     String?  @db.Text
  
  // Capacity
  minCapacity     Int      @default(1)
  maxCapacity     Int
  extraCapacity   Int      @default(0)
  extraCapacityTypes Json  // { "adults": 2, "children": 1, "infants": 1 }
  
  // Physical Attributes
  size            Float?   // Square meters
  floor           String?
  
  // Bed Configuration
  bedConfigurations Json   // Array of bed configurations
  defaultBedConfig  Json   // Default configuration
  
  // Policies
  petsAllowed     Boolean  @default(false)
  maxPets         Int?
  smokingAllowed  Boolean  @default(false)
  
  // Display
  color           String   // For calendar
  order           Int      @default(0)
  
  // Media
  photos          Json     // Array of photo URLs
  videos          Json?    // Array of video URLs
  virtualTour     String?  // URL to virtual tour
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  deletedAt       DateTime?
  
  rooms           Room[]
  amenities       CategoryAmenity[]
}
```

#### Room
```prisma
model Room {
  id              String   @id @default(cuid())
  propertyId      String
  property        Property @relation(fields: [propertyId], references: [id])
  categoryId      String
  category        RoomCategory @relation(fields: [categoryId], references: [id])
  
  // Identification
  number          String   // Room number/name
  floor           String?
  
  // Availability
  bookable        Boolean  @default(true)  // Online bookable
  status          RoomStatus @default(AVAILABLE)
  
  // Overrides (if different from category)
  overrides       Json?    // Specific overrides
  specificCIN     String?  // If room needs individual CIN
  
  // Maintenance
  maintenanceMode Boolean  @default(false)
  maintenanceFrom DateTime?
  maintenanceTo   DateTime?
  maintenanceNote String?
  
  order           Int      @default(0)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  deletedAt       DateTime?
  
  amenities       RoomAmenity[]
}

enum RoomStatus {
  AVAILABLE
  OCCUPIED
  CLEANING
  MAINTENANCE
  BLOCKED
}
```

#### Amenity
```prisma
model Amenity {
  id          String   @id @default(cuid())
  
  name        String   // Will be translated via i18n
  i18nKey     String   // Key for translation
  category    AmenityCategory
  icon        String?  // Icon name or URL
  description String?
  
  isCustom    Boolean  @default(false)
  createdBy   String?  // User who created (if custom)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  propertyAmenities  PropertyAmenity[]
  categoryAmenities  CategoryAmenity[]
  roomAmenities      RoomAmenity[]
}

enum AmenityCategory {
  ROOM_FEATURES
  BATHROOM
  ENTERTAINMENT
  KITCHEN
  SAFETY
  ACCESSIBILITY
  OUTDOOR
  SERVICES
  CUSTOM
}

// Junction tables for amenities
model PropertyAmenity {
  propertyId String
  property   Property @relation(fields: [propertyId], references: [id])
  amenityId  String
  amenity    Amenity  @relation(fields: [amenityId], references: [id])
  
  @@id([propertyId, amenityId])
}

model CategoryAmenity {
  categoryId String
  category   RoomCategory @relation(fields: [categoryId], references: [id])
  amenityId  String
  amenity    Amenity      @relation(fields: [amenityId], references: [id])
  
  @@id([categoryId, amenityId])
}

model RoomAmenity {
  roomId    String
  room      Room    @relation(fields: [roomId], references: [id])
  amenityId String
  amenity   Amenity @relation(fields: [amenityId], references: [id])
  
  @@id([roomId, amenityId])
}
```

### Phase 2+ Entities (Schema Only)

#### Booking
```prisma
model Booking {
  id              String   @id @default(cuid())
  propertyId      String
  confirmationCode String  @unique
  
  // Dates
  checkIn         DateTime
  checkOut        DateTime
  nights          Int
  
  // Guest
  guestId         String
  guest           Guest    @relation(fields: [guestId], references: [id])
  
  // Rooms
  roomAssignments RoomAssignment[]
  
  // Pricing
  totalAmount     Decimal
  paidAmount      Decimal  @default(0)
  currency        String
  
  // Status
  status          BookingStatus
  source          BookingSource
  
  // Agency/OTA
  agencyId        String?
  agency          Agency?  @relation(fields: [agencyId], references: [id])
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  deletedAt       DateTime?
}

enum BookingStatus {
  QUOTE
  CONFIRMED
  CHECKED_IN
  CHECKED_OUT
  CANCELLED
}

enum BookingSource {
  DIRECT
  PHONE
  EMAIL
  BOOKING_ENGINE
  AIRBNB
  BOOKING_COM
  EXPEDIA
  OTHER_OTA
}
```

#### Payment
```prisma
model Payment {
  id          String   @id @default(cuid())
  bookingId   String
  booking     Booking  @relation(fields: [bookingId], references: [id])
  
  amount      Decimal
  currency    String
  type        PaymentType
  method      PaymentMethod
  status      PaymentStatus
  
  gateway     String?  // stripe, nexi, revolut
  gatewayId   String?  // External payment ID
  
  processedAt DateTime?
  refundedAt  DateTime?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum PaymentType {
  DEPOSIT      // Caparra
  PARTIAL      // Acconto
  FULL         // Saldo
  REFUND
}

enum PaymentMethod {
  CREDIT_CARD
  BANK_TRANSFER
  CASH
  ONLINE
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}
```

---

## Integrations

### Channel Manager: RoomCloud

**Purpose**: Synchronize availability, rates, and bookings with OTAs

**Integration Type**: REST API + Webhooks

**Endpoints**:
- `POST /api/roomcloud/sync` - Manual sync trigger
- `POST /api/roomcloud/webhook` - Receive booking updates
- `GET /api/roomcloud/status` - Connection status

**Data Flow**:
```
Nexora → RoomCloud:
  - Availability updates (real-time)
  - Rate updates (on change)
  - Restrictions (min stay, close-out)

RoomCloud → Nexora:
  - New bookings (webhook)
  - Booking modifications (webhook)
  - Booking cancellations (webhook)
```

**Configuration**:
- RoomCloud credentials (property-level)
- Room mapping (Nexora rooms ↔ RoomCloud products)
- Rate mapping (Nexora rates ↔ RoomCloud rates)

### Payment Gateways

#### Stripe
**Purpose**: International credit card processing  
**Integration**: stripe npm package  
**Features**: 
- Payment intents
- Webhooks for status updates
- Refunds
- Multi-currency

#### Nexi
**Purpose**: Italian payment processing  
**Integration**: REST API  
**Features**:
- Italian cards
- POS terminal integration
- Split payment support

#### Revolut
**Purpose**: International payments, low fees  
**Integration**: Revolut Business API  
**Features**:
- Multiple currencies
- Lower fees than Stripe
- Instant settlements

### Fiscal Systems (Italy)

#### Team System
**Purpose**: Accounting software integration  
**Integration**: REST API  
**Features**:
- Invoice synchronization
- Chart of accounts mapping
- Automated bookkeeping

#### Cassetto Fiscale
**Purpose**: Italian government fiscal portal  
**Integration**: SOAP API  
**Features**:
- Electronic invoice submission
- Tax reporting
- Compliance verification

#### ISTAT
**Purpose**: Italian statistics agency reporting  
**Integration**: XML file export  
**Features**:
- Guest statistics
- Occupancy data
- Submission format compliance

### Communication

#### WhatsApp Business API
**Purpose**: Guest communication  
**Integration**: WhatsApp Cloud API  
**Features**:
- Automated messages
- Two-way communication
- Media sharing
- Template messages

---

## Internationalization

### Languages

- **English (en)**: Default, fallback language
- **Italian (it)**: Primary market
- **Portuguese (pt)**: Brazil market

### Implementation

**Framework**: Languine (already in project)

**Structure**:
```
packages/internationalization/
└── dictionaries/
    ├── en.json
    ├── it.json
    └── pt.json
```

**Usage**:
```typescript
import { getDictionary } from '@repo/i18n';

export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang);
  return <h1>{dict.property.title}</h1>;
}
```

### Language Detection

1. **IP-based**: Detect user's country on first visit
2. **User Preference**: Store in profile
3. **Manual Override**: Language selector in UI

### Translation Keys Structure

```json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete"
  },
  "property": {
    "title": "Properties",
    "create": "Create Property",
    "edit": "Edit Property",
    "fields": {
      "name": "Property Name",
      "address": "Address"
    }
  },
  "room": {
    "category": {
      "title": "Room Categories",
      "create": "Create Category"
    }
  }
}
```

### Date & Number Formatting

- **Dates**: Use `Intl.DateTimeFormat`
- **Numbers**: Use `Intl.NumberFormat`
- **Currency**: Display based on property currency

---

## Security & Compliance

### Authentication

- **Provider**: Clerk
- **Methods**: Email/password, OAuth (Google, Microsoft), MFA
- **Session**: JWT tokens, httpOnly cookies
- **Expiration**: 24 hours, sliding window

### Authorization

**Role-Based Access Control (RBAC)**:

```typescript
const permissions = {
  OWNER: ['*'], // All permissions
  MANAGER: ['property:*', 'room:*', 'booking:*', 'report:read'],
  RECEPTIONIST: ['booking:*', 'guest:*', 'payment:create'],
  HOUSEKEEPING: ['room:read', 'room:updateStatus'],
  F_AND_B: ['booking:read', 'charge:create'],
  GUEST_SERVICES: ['booking:read', 'service:*'],
};
```

**Implementation**:
```typescript
// Middleware
export async function checkPermission(
  userId: string,
  action: string
): Promise<boolean> {
  const user = await getUser(userId);
  return hasPermission(user.role, action);
}
```

### Data Security

- **Encryption at Rest**: Neon provides encryption
- **Encryption in Transit**: HTTPS only, TLS 1.3
- **PII Protection**: GDPR compliant
- **Backups**: Daily automated backups (Neon)
- **Audit Logs**: Track all data modifications

### Compliance

#### GDPR (EU)
- [ ] User consent management
- [ ] Right to access data
- [ ] Right to deletion
- [ ] Data portability
- [ ] Privacy policy
- [ ] Cookie policy

#### LGPD (Brazil)
- [ ] Similar to GDPR
- [ ] User consent
- [ ] Data minimization
- [ ] Security measures

#### PCI DSS (Payments)
- [ ] Use certified payment gateways (Stripe, Nexi)
- [ ] Never store full credit card numbers
- [ ] Tokenization for recurring payments
- [ ] Secure transmission

### Italian Fiscal Compliance

- **Electronic Invoicing**: Required for B2B and B2C
- **Guest Registry**: Alloggiati web submission
- **ISTAT Reporting**: Monthly statistics
- **Tourist Tax**: Collection and reporting
- **Data Retention**: 10 years for invoices

---

## Performance Requirements

### Response Times

- **Page Load (First Contentful Paint)**: < 1.5s
- **Page Load (Largest Contentful Paint)**: < 2.0s
- **Time to Interactive**: < 2.5s
- **Server Actions**: < 500ms
- **API Routes**: < 300ms
- **Database Queries**: < 100ms (average)

### Scalability

- **Concurrent Users**: 50 per property
- **Total Users**: 10,000+ across all properties
- **Database Connections**: Pooled via Prisma
- **Request Rate**: 100 req/s per property (peak)

### Optimization Strategies

1. **Server Components**: Reduce client-side JavaScript
2. **Streaming**: Stream UI as data arrives
3. **Caching**: 
   - Static pages: ISR
   - Dynamic data: React cache
   - API: HTTP cache headers
4. **Database**:
   - Indexes on frequently queried columns
   - Connection pooling
   - Query optimization
5. **Images**:
   - Next.js Image component
   - Automatic WebP conversion
   - Lazy loading
6. **Code Splitting**: Automatic by Next.js

---

## Phased Delivery Plan

### Phase 1: Foundation (Weeks 1-4) ✅ IN PROGRESS

**Goal**: Property & Room Management MVP

**Deliverables**:
- [x] Project setup with Next-Forge
- [x] OpenSpec initialization
- [x] PRD completion
- [ ] Database schema (comprehensive)
- [ ] Multi-property management
- [ ] Property configuration
- [ ] Room category management
- [ ] Individual room management
- [ ] Amenities system
- [ ] Availability tracking
- [ ] Basic calendar view

**Success Criteria**:
- Can create and manage multiple properties
- Can define room categories with all attributes
- Can manage individual rooms
- Can view availability calendar
- Unit tests for core functions
- Documentation complete

### Phase 2: Booking System (Weeks 5-8)

**Goal**: Complete booking lifecycle

**Deliverables**:
- [ ] Booking creation (all types)
- [ ] Guest management
- [ ] Check-in/check-out
- [ ] Booking modifications
- [ ] Split bookings
- [ ] Group bookings
- [ ] Booking calendar integration
- [ ] Guest history

**Success Criteria**:
- Can create bookings via UI
- Can check guests in/out
- Can modify bookings
- Can split bookings mid-stay
- Integration tests for booking flow

### Phase 3: Channel Manager (Weeks 9-12)

**Goal**: OTA integration via RoomCloud

**Deliverables**:
- [ ] RoomCloud API integration
- [ ] Room/rate mapping
- [ ] Availability sync
- [ ] Booking import
- [ ] Webhook handlers
- [ ] Sync status dashboard
- [ ] Conflict resolution

**Success Criteria**:
- Can connect to RoomCloud
- Availability syncs bi-directionally
- Bookings import correctly
- No double bookings
- Sync errors handled gracefully

### Phase 4: Payments & Pricing (Weeks 13-16)

**Goal**: Payment processing and dynamic pricing

**Deliverables**:
- [ ] Payment gateway integrations
- [ ] Deposit/partial/full payment flows
- [ ] Price list management
- [ ] Seasonal pricing
- [ ] Derived rates
- [ ] Payment history
- [ ] Receipt generation

**Success Criteria**:
- Can process payments via Stripe, Nexi
- Can create complex price structures
- Price calculations accurate
- Payment webhooks handled
- Receipts generated correctly

### Phase 5: Fiscal Compliance (Weeks 17-20)

**Goal**: Italian fiscal requirements

**Deliverables**:
- [ ] ISTAT export
- [ ] Tourist tax calculation
- [ ] Electronic invoice generation
- [ ] Cassetto Fiscale integration (API)
- [ ] Team System integration
- [ ] Alloggiati web export
- [ ] Split payment support

**Success Criteria**:
- ISTAT file validates
- Invoices meet SDI requirements
- Tourist tax calculated correctly
- Integrations tested with staging APIs

### Phase 6: Communication & Reporting (Weeks 21-24)

**Goal**: Guest communication and business intelligence

**Deliverables**:
- [ ] WhatsApp integration
- [ ] Email templates
- [ ] Automated messages
- [ ] Occupancy reports
- [ ] Revenue reports
- [ ] Guest analytics
- [ ] Export functionality

**Success Criteria**:
- Messages send automatically
- Reports accurate
- Data exportable to Excel
- Real-time dashboards

### Phase 7: Booking Engine (Weeks 25-28)

**Goal**: Direct booking capability

**Deliverables**:
- [ ] White-label booking widget
- [ ] Design customization
- [ ] Real-time availability
- [ ] Payment integration
- [ ] Multi-language support
- [ ] SEO optimization
- [ ] Conversion tracking

**Success Criteria**:
- Widget embeds on property sites
- Booking conversion > 2%
- Mobile-responsive
- Accessibility compliant

### Phase 8: Brazil Expansion (Weeks 29-32)

**Goal**: Brazil market readiness

**Deliverables**:
- [ ] Portuguese language complete
- [ ] Brazilian fiscal requirements
- [ ] Local payment methods
- [ ] Currency support (BRL)
- [ ] Tax calculations (Brazil)
- [ ] NFe invoice generation

**Success Criteria**:
- First Brazilian property onboarded
- Fiscal compliance validated
- Payments processing

### Phase 9: Advanced Features (Weeks 33-40)

**Goal**: Competitive differentiation

**Deliverables**:
- [ ] Dynamic pricing engine
- [ ] Revenue management
- [ ] Forecasting
- [ ] Advanced reporting
- [ ] Mobile app (optional)
- [ ] Hardware integrations
- [ ] API for third-party integrations

**Success Criteria**:
- Dynamic pricing improves revenue by 10%
- Mobile app published (if built)
- Hardware integrations working

---

## Success Metrics

### User Adoption

- **Target**: 10 properties in 6 months
- **Metric**: Active properties (used in last 30 days)
- **Goal**: 80% retention after 12 months

### Performance

- **Target**: 99.9% uptime
- **Metric**: Vercel Analytics
- **Goal**: < 2s average page load

### User Satisfaction

- **Target**: 4.5/5 rating
- **Metric**: In-app NPS surveys
- **Goal**: 80% of users would recommend

### Revenue Impact

- **Target**: 15% revenue increase for properties
- **Metric**: Compare year-over-year
- **Goal**: Attribute increase to Nexora features

### Development Velocity

- **Target**: Ship Phase 1 in 4 weeks
- **Metric**: GitHub/Project tracking
- **Goal**: Maintain 2-week sprint cycles

### Technical Health

- **Error Rate**: < 0.1%
- **API Success Rate**: > 99.5%
- **Database Query Time**: < 100ms p95
- **Sentry Alerts**: < 5 per week

---

## Open Questions & Decisions Needed

### Questions for Stakeholders

1. **Data Migration**: 
   - How many Scidoo customers to migrate?
   - Migration timeline?
   - Support both systems during transition?

2. **Pricing Model**:
   - Subscription per property?
   - Tiered pricing by features?
   - Transaction fees?

3. **Support**:
   - In-app chat support?
   - Email support SLA?
   - Phone support?
   - Multi-language support staff?

4. **Hardware**:
   - Which printer models to support?
   - Which POS systems to integrate?
   - Priority order?

5. **Customization**:
   - White-label options?
   - Custom branding?
   - API access for power users?

### Technical Decisions

1. **Real-time vs Polling**:
   - Use WebSockets for calendar updates?
   - Or short polling intervals?
   - **Recommendation**: WebSockets via Liveblocks

2. **File Storage**:
   - Vercel Blob or R2?
   - **Recommendation**: Start with Vercel Blob

3. **Background Jobs**:
   - Vercel Cron or external queue?
   - **Recommendation**: Vercel Cron for simple jobs

4. **Testing Strategy**:
   - Unit (Vitest), Integration (Playwright), E2E?
   - **Recommendation**: All three with CI/CD

5. **Monitoring**:
   - Sentry + Vercel Analytics sufficient?
   - **Recommendation**: Yes for MVP

---

## Appendices

### Appendix A: Glossary

- **B&B**: Bed and Breakfast
- **Channel Manager**: System that syncs availability across OTAs
- **CIN**: Codice Identificativo Nazionale (Italian national ID for properties)
- **CIR**: Codice Identificativo Regionale (Italian regional ID)
- **Caparra**: Deposit (non-refundable or refundable)
- **Acconto**: Partial payment
- **Saldo**: Final/full payment
- **ISTAT**: Italian National Institute of Statistics
- **OTA**: Online Travel Agency (Airbnb, Booking.com, etc.)
- **PMS**: Property Management System
- **SDI**: Sistema di Interscambio (Italian e-invoice system)

### Appendix B: Competitive Analysis

**Competitors**:
1. **Scidoo** (legacy system)
   - Pros: Comprehensive features, Italian market knowledge
   - Cons: Outdated tech, poor UX, limited scalability

2. **Cloudbeds**
   - Pros: Modern, all-in-one, good channel manager
   - Cons: Expensive, not Italy-focused

3. **Mews**
   - Pros: Modern UI, API-first, scalable
   - Cons: Enterprise pricing, limited Italian compliance

4. **RoomRaccoon**
   - Pros: Simple, affordable, cloud-based
   - Cons: Limited features, weak reporting

**Nexora Differentiators**:
- Italian & Brazilian fiscal compliance built-in
- Modern Next.js stack (fast, scalable)
- Affordable pricing
- Excellent UX with shadcn/ui
- Open architecture (Next-Forge monorepo)

### Appendix C: References

- [Next-Forge Documentation](https://next-forge.com)
- [Prisma Best Practices](https://www.prisma.io/docs)
- [Clerk Authentication](https://clerk.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Italian E-Invoicing](https://www.agenziaentrate.gov.it)
- [RoomCloud API](https://roomcloud.net/docs)

---

**END OF PRD**

*This document is version-controlled and should be updated as requirements evolve.*

