# Nexora - Hospitality Management Platform

## Project Overview

**Project Name**: Nexora  
**Type**: Multi-tenant Hospitality Property Management System (PMS)  
**Framework**: Next-Forge (Next.js monorepo)  
**Database**: Neon (PostgreSQL) with Prisma ORM  
**Deployment**: Vercel  

## Project Goals

Nexora is a modern, cloud-based hospitality management platform designed to replace legacy systems like Scidoo with a contemporary tech stack and improved user experience. The platform targets small to medium-sized hospitality properties including B&Bs, resort villaggi, open-air resorts, and small hotels in Italy and Brazil.

## Target Market

- **Geographic Focus**: Italy (primary), Brazil (secondary)
- **Property Types**: 
  - Small B&Bs
  - Resort Villaggi
  - Open Air Resorts
  - Small Hotels (up to ~100 rooms)
- **User Scale**: Up to 50 concurrent users per property across multiple departments

## Core Objectives

1. **Property & Room Management** (MVP - Comprehensive Implementation)
   - Multi-property support
   - Room/accommodation categorization
   - Availability management
   - Capacity and configuration management

2. **Feature Scaffolding** (Phase 2+)
   - Booking Management
   - Channel Manager integrations
   - Payment processing
   - Fiscal/Tax compliance
   - Dynamic pricing
   - Guest communication
   - Statistics & reporting
   - Direct booking engine
   - Hardware integrations

## Technology Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **UI Components**: shadcn/ui (primary), Material UI (fallback)
- **Styling**: Tailwind CSS
- **State Management**: React Server Components, Liveblocks (collaboration)
- **Internationalization**: Languine (EN, IT, PT)

### Backend
- **API**: Next.js API Routes / Server Actions
- **Database**: Neon (Serverless PostgreSQL)
- **ORM**: Prisma
- **Authentication**: Clerk
- **Real-time**: Liveblocks

### Infrastructure
- **Hosting**: Vercel
- **Storage**: Vercel Blob / R2 (for media)
- **Monitoring**: Sentry
- **Analytics**: Vercel Analytics

### Integrations (Planned)
- **Channel Manager**: RoomCloud (initial), Direct OTA APIs (future)
- **Payment Gateways**: Stripe, Nexi, Revolut
- **Fiscal Systems**: Team System, Cassetto Fiscale (Italian)
- **Communication**: WhatsApp Business API
- **Hardware**: Thermal printers, POS systems

## User Roles & Permissions

1. **Owner** - Full system access, multi-property management
2. **Manager** - Property-level administration
3. **Receptionist** - Front desk operations, bookings, check-in/out
4. **Housekeeping** - Room status, cleaning schedules
5. **F&B** - Restaurant and bar management
6. **Guest Services** - Spa, massage, watersports, pool, beach services

## Design Principles

1. **Desktop-First**: Primary focus on desktop web application (not mobile-optimized)
2. **Modern & Clean**: Contemporary design system using shadcn/ui
3. **Performance**: Server-side rendering, optimized data fetching
4. **Accessibility**: WCAG 2.1 AA compliance
5. **Internationalization**: IP-based language detection with manual override

## Development Approach

### Phase 1: Foundation (Current)
- ✅ Project setup with Next-Forge
- ✅ Authentication with Clerk
- ✅ Database setup with Neon + Prisma
- 🚧 Property & Room Management (comprehensive)

### Phase 2: Core Operations
- Booking Management system
- Calendar & availability
- Guest management
- Basic pricing

### Phase 3: Integrations
- Channel Manager (RoomCloud)
- Payment processing
- Fiscal compliance (Italy)

### Phase 4: Advanced Features
- Dynamic pricing & revenue management
- Analytics & reporting
- Guest communication
- Hardware integrations

### Phase 5: Expansion
- Brazil market (fiscal, language)
- Direct OTA integrations
- Mobile applications
- Advanced automation

## Key Constraints

- **Desktop-only** initial release
- **Italy-first** for compliance features
- **RoomCloud dependency** for channel management
- **Multi-tenancy** from day one
- **Scalability** for up to 50 concurrent users per property

## Success Metrics

1. **Performance**: < 2s page load times
2. **Availability**: 99.9% uptime
3. **User Satisfaction**: > 4.5/5 rating
4. **Migration**: Successful data migration from Scidoo
5. **Adoption**: 10+ properties within 6 months

## Contact & Team

- **Technical Lead**: [To be assigned]
- **Product Owner**: [To be assigned]
- **Architecture**: Next-Forge monorepo pattern

## Current Status

**Status**: In Development - Foundation Phase  
**Last Updated**: 2025-10-26  
**Next Milestone**: Complete Property & Room Management MVP

