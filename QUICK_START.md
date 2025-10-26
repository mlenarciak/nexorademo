# Nexora - Quick Start Guide

**Last Updated**: October 26, 2025

---

## 🎯 What's Been Done

All planning, architecture, and specifications are complete:

✅ **Comprehensive PRD** (89K words) - `/PRD.md`  
✅ **Technical Architecture** (30K words) - `/ARCHITECTURE.md`  
✅ **Database Schema** (20+ models) - `/packages/database/prisma/schema.prisma`  
✅ **OpenSpec Specs** - `/openspec/`  
✅ **Task Breakdown** (100+ tasks) - `/openspec/changes/build-property-room-management/tasks.md`  

---

## 🚀 Next Steps to Start Development

### 1. Install Dependencies

```bash
cd /home/max/nexora
pnpm install
```

### 2. Setup Environment Variables

```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local and add:
# - DATABASE_URL (Neon PostgreSQL)
# - CLERK_SECRET_KEY
# - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# - Other required env vars
```

### 3. Run Database Migrations

```bash
cd packages/database
pnpm prisma migrate dev --name init
```

### 4. (Optional) Seed Database

```bash
# Create seed script first:
# packages/database/src/seed.ts

pnpm prisma db seed
```

### 5. Start Development Server

```bash
# From project root
pnpm dev

# App will be available at:
# http://localhost:3000
```

---

## 📁 Key Files to Review

| File | Purpose |
|------|---------|
| `/PRD.md` | Complete product requirements |
| `/ARCHITECTURE.md` | Technical architecture & patterns |
| `/SETUP_SUMMARY.md` | What's been accomplished |
| `/openspec/changes/build-property-room-management/` | OpenSpec specs & tasks |
| `/packages/database/prisma/schema.prisma` | Database schema |
| `/apps/app/` | Main application (ready for implementation) |

---

## 🎨 What to Build First

### Week 1: Database & API Layer

**Tasks**:
1. Verify Prisma schema compiles
2. Create seed data script
3. Implement Organization model CRUD
4. Implement Property model CRUD
5. Implement Room Category CRUD
6. Implement Room CRUD
7. Add Prisma middleware for multi-tenancy

**Location**: `/packages/database/`

### Week 2: UI Components

**Tasks**:
1. Create PropertyList component
2. Create PropertyForm component
3. Create RoomCategoryForm component
4. Create RoomForm component
5. Create AmenitySelector component
6. Create SeasonManager component

**Location**: `/packages/design-system/components/`

### Week 3: Pages & Integration

**Tasks**:
1. Organization dashboard page
2. Properties list page
3. Property detail page
4. Room categories page
5. Rooms page
6. Availability calendar page

**Location**: `/apps/app/app/(dashboard)/`

### Week 4: Real-time & Polish

**Tasks**:
1. Liveblocks integration
2. Real-time availability updates
3. Optimistic UI updates
4. Testing (unit + integration)
5. Documentation
6. Performance optimization

---

## 🧪 Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Type checking
pnpm type-check

# Linting
pnpm lint
```

---

## 📚 Documentation Reference

### OpenSpec Commands

```bash
# View all specifications
openspec spec list --long

# View active changes
openspec list

# Show change details
openspec show build-property-room-management

# Validate change
openspec validate build-property-room-management --strict

# Archive when complete
openspec archive build-property-room-management
```

### Useful Prisma Commands

```bash
# Generate Prisma Client
pnpm prisma generate

# Create migration
pnpm prisma migrate dev --name your-migration-name

# Reset database
pnpm prisma migrate reset

# Open Prisma Studio (DB GUI)
pnpm prisma studio
```

---

## 🔐 Environment Variables Needed

Create `.env.local` with:

```bash
# Database
DATABASE_URL="postgresql://..."
DATABASE_URL_UNPOOLED="postgresql://..." # For migrations

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# Optional (for later phases)
STRIPE_SECRET_KEY="sk_test_..."
NEXI_API_KEY="..."
ROOMCLOUD_API_KEY="..."
WHATSAPP_TOKEN="..."
SENTRY_DSN="..."
```

---

## 🎯 Success Criteria for Phase 1

- [ ] Can create and manage organizations
- [ ] Can create and manage properties
- [ ] Can define room categories with all attributes
- [ ] Can manage individual rooms
- [ ] Can assign amenities at all levels
- [ ] Can view availability calendar
- [ ] Can manually block dates
- [ ] Real-time updates work
- [ ] All CRUD has proper permissions
- [ ] Data isolation enforced
- [ ] 80%+ test coverage
- [ ] < 2s page loads
- [ ] All languages working (EN, IT, PT)

---

## 🆘 Common Issues & Solutions

### Prisma Client Not Generating
```bash
cd packages/database
pnpm prisma generate
```

### Migration Issues
```bash
# Reset and re-run
pnpm prisma migrate reset
pnpm prisma migrate dev
```

### Type Errors
```bash
# Rebuild all packages
pnpm build
```

### Clerk Not Working
- Check env vars are set
- Verify Clerk dashboard settings
- Ensure URLs match

### Metabase Setup
```bash
# Start Metabase with Docker
docker-compose up -d metabase

# View Metabase logs
docker logs -f nexora-metabase

# Access Metabase UI
open http://localhost:3001
```

---

## 📞 Need Help?

1. **Review Documentation**:
   - `/PRD.md` for features
   - `/ARCHITECTURE.md` for patterns
   - `/openspec/` for detailed specs

2. **Check OpenSpec**:
   ```bash
   openspec show build-property-room-management
   ```

3. **Review Task List**:
   `/openspec/changes/build-property-room-management/tasks.md`

---

## 🎉 You're Ready!

Everything is planned, documented, and ready for implementation. Just follow the tasks in order and you'll have Phase 1 complete in 4 weeks!

**Happy Coding! 🚀**

