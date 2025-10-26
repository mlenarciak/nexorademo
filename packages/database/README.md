# Nexora Database Package

This package contains the Prisma schema, migrations, and seed data for the Nexora hospitality management platform.

## Setup

### 1. Environment Variables

Create a `.env` file in the project root with your Neon database connection string:

```bash
# .env (in /home/max/nexora/)
DATABASE_URL="postgresql://user:password@your-neon-host.neon.tech/nexora?sslmode=require"
DATABASE_URL_UNPOOLED="postgresql://user:password@your-neon-host.neon.tech/nexora?sslmode=require"
```

### 2. Generate Prisma Client

```bash
cd packages/database
pnpm db:generate
```

### 3. Run Migrations

```bash
# Create and run migrations
pnpm db:migrate

# Or push schema without migrations (development)
pnpm db:push
```

### 4. Seed Database

```bash
pnpm db:seed
```

This will create:
- 2 organizations (Italy & Brazil)
- 3 users (Owner, Manager, Receptionist)
- 3 properties
- 3 room categories
- 10 individual rooms
- 20+ amenities
- 4 seasonal periods

## Available Scripts

```bash
pnpm db:generate      # Generate Prisma Client
pnpm db:migrate       # Create and run migrations
pnpm db:push          # Push schema (no migration files)
pnpm db:seed          # Seed database with test data
pnpm db:studio        # Open Prisma Studio GUI
pnpm db:reset         # Reset database (⚠️ deletes all data)
```

## Prisma Studio

View and edit your database in a GUI:

```bash
pnpm db:studio
```

Open http://localhost:5555

## Schema Overview

### Core Models (Phase 1)
- `Organization` - Top-level tenant
- `User` - Users with roles
- `Property` - Individual properties
- `Season` - Pricing periods
- `RoomCategory` - Room types
- `Room` - Individual rooms
- `Amenity` - Features/services
- `AvailabilityBlock` - Manual date blocks
- `AuditLog` - Compliance tracking

### Future Models (Phase 2+)
- `Guest`, `Booking`, `Payment`
- `Agency`, `Charge`, `RatePlan`

## Multi-tenancy

All queries MUST include `organizationId` filter. The Prisma middleware automatically injects this for security.

## Soft Deletes

All models use soft deletes (`deletedAt` timestamp). Queries automatically filter out deleted records.

## Need Help?

- [Prisma Documentation](https://www.prisma.io/docs)
- [Neon Documentation](https://neon.tech/docs)
- See `/PRD.md` for data model details

