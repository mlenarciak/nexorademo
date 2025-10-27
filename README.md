# Nexora - Modern Hospitality Property Management System

<div align="center">
  <img src="./assets/nexora sideways transparent c logo black text.png" alt="Nexora Logo" width="400" />
  
  <p align="center">
    <strong>Next-generation PMS for Italian & Brazilian hospitality properties</strong>
  </p>
  
  <p align="center">
    Built with Next-Forge • Powered by Neon PostgreSQL • Deployed on Vercel
  </p>

  <p align="center">
    <a href="#quick-start">Quick Start</a> •
    <a href="#features">Features</a> •
    <a href="#documentation">Documentation</a> •
    <a href="#tech-stack">Tech Stack</a>
  </p>
</div>

---

## 🎯 What is Nexora?

Nexora is a modern, cloud-native hospitality property management system designed to replace legacy systems like Scidoo. Built specifically for small to medium-sized properties in Italy and Brazil, Nexora provides:

- 🏨 **Multi-Property Management** - Manage unlimited properties from one account
- 🛏️ **Room & Category Management** - Flexible categorization with capacity controls
- ⚡ **Real-Time Availability** - Instant updates across all users
- 🔗 **Channel Manager Ready** - Connect to Airbnb, Booking.com, Expedia
- 📊 **Embedded Analytics** - Metabase dashboards for business intelligence
- 🇮🇹 **Italian Fiscal Compliance** - CIN, CIR, ISTAT, tourist tax, e-invoicing
- 🇧🇷 **Brazilian Support** - CNPJ, Portuguese language

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+
- Neon PostgreSQL database
- Clerk account (for auth)

### Installation

```bash
# Clone repository
git clone https://github.com/mlenarciak/nexorademo.git nexora
cd nexora

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your DATABASE_URL, CLERK keys, etc.

# Setup database
cd packages/database
pnpm db:push
pnpm db:seed

# Start development
cd ../..
pnpm dev
```

🎉 Your app is now running at [http://localhost:3000](http://localhost:3000)!

---

## ✨ Features

### Phase 1: Property & Room Management (✅ Complete)

#### Multi-Property Management
- Manage multiple hotels, B&Bs, resorts from one account
- Organization-based multi-tenancy
- Role-based access control (6 roles)
- Property switcher for easy navigation

#### Room Categories
- Define room types with detailed attributes
- Capacity management (min, max, extra by age group)
- Multiple bed configuration options
- Photo/video galleries and virtual tours
- Color coding for calendar visualization
- Amenity assignment

#### Individual Rooms
- Rooms inherit from categories
- Override specific attributes when needed
- Maintenance mode with date ranges
- Bulk operations for efficiency
- Real-time status tracking

#### Amenity System
- Three-level hierarchy (Property → Category → Room)
- 22 pre-defined amenities
- Custom amenity creation
- Multi-language support (EN, IT, PT)
- Category grouping

#### Availability Tracking
- Real-time room availability
- Manual blocking for maintenance
- Occupancy statistics
- Date range queries
- Visual calendar (coming soon)

### Phase 2+: Future Features (Planned)

- 📅 Booking Management
- 💳 Payment Processing (Stripe, Nexi, Revolut)
- 🔗 Channel Manager Integration (RoomCloud)
- 📧 Guest Communication (WhatsApp, Email)
- 📈 Advanced Analytics (Metabase dashboards)
- 🧾 Fiscal Compliance (ISTAT, e-invoicing)
- 🌐 Direct Booking Engine

---

## 📚 Documentation

Comprehensive documentation available in multiple formats:

- **[PRD.md](./PRD.md)** - Complete product requirements (89,000 words)
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical architecture (30,000 words)
- **[Mintlify Docs](./apps/docs/)** - Interactive documentation site
- **[OpenSpec](./openspec/)** - Validated specifications
- **[Quick Start](./QUICK_START.md)** - 10-minute setup guide

### Key Documentation

| Document | Purpose |
|----------|---------|
| `PRD.md` | Product requirements, market analysis, roadmap |
| `ARCHITECTURE.md` | System design, patterns, decisions |
| `SETUP_SUMMARY.md` | What's been accomplished |
| `FINAL_STATUS.md` | Implementation status |
| `PHASE1_PROGRESS.md` | Phase 1 progress tracker |
| `apps/docs/` | Mintlify documentation site |

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org)** - React framework with App Router
- **[React 18](https://react.dev)** - UI library with Server Components
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com)** - Accessible component library
- **[Liveblocks](https://liveblocks.io)** - Real-time collaboration
- **[Languine](https://languine.ai)** - Internationalization (EN, IT, PT)

### Backend
- **[Neon](https://neon.tech)** - Serverless PostgreSQL
- **[Prisma](https://prisma.io)** - Type-safe ORM
- **[Clerk](https://clerk.com)** - Authentication & user management
- **[Zod](https://zod.dev)** - Runtime validation

### Infrastructure
- **[Vercel](https://vercel.com)** - Hosting & deployment
- **[Metabase](https://metabase.com)** - Business intelligence & analytics
- **[Sentry](https://sentry.io)** - Error tracking
- **[Turbo](https://turbo.build)** - Monorepo build system

### Development
- **[pnpm](https://pnpm.io)** - Package manager
- **[Biome](https://biomejs.dev)** - Linting & formatting
- **[Vitest](https://vitest.dev)** - Unit testing
- **[Playwright](https://playwright.dev)** - E2E testing

---

## 📁 Project Structure

```
nexora/
├── apps/
│   ├── app/              # Main SaaS application
│   │   ├── app/
│   │   │   ├── (dashboard)/
│   │   │   │   └── properties/    # Property management pages
│   │   │   └── actions/           # Server Actions (35 functions)
│   │   └── __tests__/             # Test suites
│   ├── web/              # Marketing website
│   │   └── app/[locale]/          # Localized landing pages
│   ├── docs/             # Mintlify documentation
│   └── api/              # Standalone API (optional)
├── packages/
│   ├── database/         # Prisma schema, migrations, seed
│   ├── design-system/    # UI components
│   ├── analytics/        # Metabase integration
│   ├── auth/             # Clerk integration
│   ├── internationalization/  # i18n dictionaries
│   └── [12 more packages]
├── openspec/             # OpenSpec specifications
├── assets/               # Logo and brand assets
├── docker-compose.yml    # Metabase setup
└── [documentation files]
```

---

## 🗄️ Database

### Schema

20+ models including:
- `Organization` - Top-level tenant
- `Property` - Individual properties
- `RoomCategory` - Room types
- `Room` - Individual rooms
- `Amenity` - Facilities
- `Season` - Pricing periods
- `User` - Users with roles
- `AuditLog` - Compliance tracking

### Seed Data

Run `pnpm db:seed` to populate with:
- 2 organizations (Italy & Brazil)
- 3 users (Owner, Manager, Receptionist)
- 3 properties (Bella Vista, Amalfi, Copacabana)
- 10 rooms across 3 categories
- 22 amenities
- 4 seasonal periods

---

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run specific suite
pnpm test properties

# Watch mode
pnpm test:watch
```

**Test Coverage**:
- ✅ Properties actions
- ✅ Room Categories actions
- ⏳ Rooms actions (TODO)
- ⏳ Component tests (TODO)
- ⏳ E2E tests (TODO)

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### Environment Variables

Required for production:

```bash
# Database
DATABASE_URL="postgresql://..."
DATABASE_URL_UNPOOLED="postgresql://..."

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."

# App URLs
NEXT_PUBLIC_APP_URL="https://app.nexora.com"
NEXT_PUBLIC_WEB_URL="https://nexora.com"

# Optional: Analytics
METABASE_SITE_URL="https://metabase.nexora.com"
METABASE_EMBEDDING_SECRET="..."
```

---

## 📖 Development

### Available Scripts

```bash
# Development
pnpm dev              # Start all apps
pnpm build            # Build all apps
pnpm lint             # Lint all code
pnpm format           # Format code
pnpm type-check       # TypeScript validation

# Database
pnpm db:generate      # Generate Prisma Client
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema (dev)
pnpm db:seed          # Seed database
pnpm db:studio        # Open Prisma Studio (GUI)

# Testing
pnpm test             # Run tests
pnpm test:watch       # Watch mode
pnpm test:e2e         # E2E tests

# Documentation
cd apps/docs
mintlify dev          # Run docs locally
```

---

## 🌍 Internationalization

Nexora supports 3 languages:

- 🇬🇧 **English** (default)
- 🇮🇹 **Italian** (Italiano)
- 🇧🇷 **Portuguese** (Português)

Language detection:
1. IP-based geolocation (automatic)
2. User preference (saved in profile)
3. Manual selector (dropdown in UI)

---

## 🔐 Security

- **Authentication**: Clerk (OAuth, MFA, session management)
- **Authorization**: Role-based access control (6 roles)
- **Multi-Tenancy**: Organization-level data isolation
- **Audit Logs**: All mutations tracked
- **Soft Deletes**: Data recovery possible
- **Input Validation**: Zod schemas on all inputs
- **HTTPS Only**: Enforced in production

---

## 🎯 Roadmap

### Phase 1: Property & Room Management (✅ 85% Complete)
- ✅ Multi-property management
- ✅ Room categories and individual rooms
- ✅ Amenity system
- ✅ Availability tracking
- ⏳ Dashboard layout
- ⏳ Calendar view

### Phase 2: Booking Management (Planned - 4 weeks)
- Booking creation and management
- Guest profiles
- Check-in/check-out
- Booking modifications
- Group bookings

### Phase 3: Channel Manager (Planned - 4 weeks)
- RoomCloud integration
- Airbnb, Booking.com, Expedia
- Two-way sync (rates, availability, bookings)
- Inventory management

### Phase 4: Payments & Pricing (Planned - 4 weeks)
- Stripe, Nexi, Revolut integration
- Dynamic pricing
- Seasonal rates
- Payment processing

### Phase 5: Fiscal Compliance (Planned - 4 weeks)
- ISTAT reporting (Italy)
- Electronic invoicing
- Tourist tax calculation
- Team System integration

### Phase 6+: Advanced Features
- WhatsApp communication
- Advanced analytics (Metabase)
- Direct booking engine
- Mobile apps

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow our coding standards
4. **Run tests**: `pnpm test`
5. **Commit**: `git commit -m 'feat: add amazing feature'`
6. **Push**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Coding Standards

- TypeScript strict mode
- Biome for linting and formatting
- OpenSpec for specifications
- Conventional commits
- Test coverage > 80%

---

## 📄 License

Proprietary - All rights reserved

Copyright © 2025 Nexora

---

## 🙏 Acknowledgments

- **[Next-Forge](https://next-forge.com)** - Production-grade monorepo template
- **[OpenSpec](https://github.com/fission-ai/openspec)** - Spec-driven development
- **[Mintlify](https://mintlify.com)** - Documentation platform
- **[Vercel](https://vercel.com)** - Hosting and deployment
- **[Neon](https://neon.tech)** - Serverless PostgreSQL

---

## 📞 Support

- **Documentation**: [https://docs.nexora.com](./apps/docs/)
- **Email**: support@nexora.com
- **Issues**: [GitHub Issues](https://github.com/mlenarciak/nexorademo/issues)

---

## 🎉 Current Status

**Phase 1**: ~85% Complete  
**Database**: Live on Neon with test data  
**Backend**: 35 server actions functional  
**Frontend**: 5 pages + complete component library  
**Landing Page**: Production-ready  
**Documentation**: 13 Mintlify pages  

**Ready for**: Completion sprint → Production deployment

---

<div align="center">
  <p><strong>Built with ❤️ for the hospitality industry</strong></p>
  <p>Nexora • Modern Property Management • 2025</p>
</div>
