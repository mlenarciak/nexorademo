# Build Property & Room Management System

## Why

Nexora requires a comprehensive property and room management system as the foundation for the entire hospitality platform. This is the core capability that enables multi-tenant property management, room categorization, capacity management, and availability tracking.

**Problem**: 
- Legacy Scidoo system needs modernization
- No existing codebase for property management in Next-Forge
- Multi-tenancy must be built correctly from the start
- Complex room hierarchy (Organization → Property → Category → Room) needs proper modeling

**Opportunity**:
- Build on modern stack (Next.js 14, Prisma, Neon DB)
- Establish patterns for future features
- Create reusable components and utilities
- Set foundation for Phase 2+ features

## What Changes

### Database (Prisma Schema)

**NEW MODELS**:
- Organization - Top-level tenant entity
- Property - Individual hotel/resort within organization
- Season - Pricing periods and calendar periods
- RoomCategory - Room types with attributes
- Room - Individual rooms/units
- Amenity - Facility/service offerings
- PropertyAmenity, CategoryAmenity, RoomAmenity - Junction tables
- User roles and permissions (extends Clerk)

### Application Code

**NEW FEATURES**:
1. **Multi-Property Management**
   - Organization dashboard
   - Property CRUD operations
   - Property switcher UI
   - Data isolation middleware

2. **Property Configuration**
   - Settings forms
   - Fiscal information (CIN, CIR, VAT)
   - Operational settings (check-in/out times)
   - Season/period management

3. **Room Category Management**
   - Category CRUD
   - Capacity configuration
   - Bed configuration builder
   - Media upload (photos, videos, virtual tours)
   - Amenity assignment

4. **Individual Room Management**
   - Room CRUD within categories
   - Category inheritance with overrides
   - Maintenance mode
   - Bulk operations
   - Room ordering

5. **Amenity System**
   - Predefined amenity library
   - Custom amenity creation
   - Category-based organization
   - Multi-language support
   - Icon management

6. **Availability Tracking**
   - Calendar view (month/week/day)
   - Real-time availability calculation
   - Manual blocking
   - Status indicators
   - Liveblocks real-time updates

### UI Components

**NEW COMPONENTS**:
- PropertyList, PropertyCard, PropertyForm
- RoomCategoryList, CategoryCard, CategoryForm
- RoomList, RoomCard, RoomForm
- AmenitySelector, AmenityBadge
- CalendarView, AvailabilityGrid
- SeasonManager, ColorPicker
- BedConfigurationBuilder
- MediaUploader

### API Routes & Server Actions

**NEW ENDPOINTS**:
- `/api/properties` - Property CRUD
- `/api/properties/[id]/categories` - Category management
- `/api/properties/[id]/rooms` - Room management
- `/api/amenities` - Amenity management
- `/api/availability` - Availability queries

**SERVER ACTIONS**:
- `createProperty`, `updateProperty`, `deleteProperty`
- `createCategory`, `updateCategory`, `deleteCategory`
- `createRoom`, `updateRoom`, `deleteRoom`
- `updateAvailability`, `blockDates`

## Impact

### Affected Specs
- **NEW**: `specs/property-management/spec.md` - Complete property & room management requirements
- **FUTURE**: `specs/booking-management/spec.md` - Will depend on this
- **FUTURE**: `specs/channel-manager/spec.md` - Will use availability data

### Affected Code

**New Files** (~3,000 lines):
```
packages/database/prisma/schema.prisma (additions)
packages/database/src/seed.ts (test data)

apps/app/app/(dashboard)/properties/
  - page.tsx
  - [id]/page.tsx
  - [id]/settings/page.tsx
  - [id]/rooms/page.tsx
  - [id]/rooms/categories/page.tsx
  - [id]/rooms/categories/[categoryId]/page.tsx
  - [id]/rooms/[roomId]/page.tsx
  - [id]/availability/page.tsx

apps/app/app/(dashboard)/settings/
  - organization/page.tsx

packages/design-system/components/composite/
  - property-list.tsx
  - property-form.tsx
  - room-category-form.tsx
  - room-form.tsx
  - amenity-selector.tsx
  - calendar-view.tsx
  - bed-configuration-builder.tsx

apps/app/app/actions/
  - properties.ts
  - rooms.ts
  - amenities.ts
  - availability.ts
```

**Modified Files**:
```
packages/database/prisma/schema.prisma - Add new models
apps/app/app/(dashboard)/layout.tsx - Add navigation
packages/design-system/index.tsx - Export new components
```

### User Impact

**Benefits**:
- Property managers can manage multiple properties from one account
- Intuitive UI for complex room configurations
- Real-time collaboration on availability
- Modern, fast web interface

**Migration from Scidoo**:
- Properties must be recreated (can be scripted)
- Room categories need manual mapping
- Amenities can be bulk imported
- No breaking changes (greenfield)

### Technical Impact

**Performance**:
- Database queries optimized with indexes
- Server Components reduce client JS
- Image optimization via Next.js
- Expected page load < 2s

**Security**:
- Multi-tenancy enforced at database level
- All queries filtered by organizationId
- Clerk handles authentication
- Role-based access control

**Scalability**:
- Neon DB scales automatically
- Vercel handles traffic spikes
- Connection pooling via Prisma
- Supports 50 concurrent users per property

### Dependencies

**Required**:
- ✅ Next-Forge project setup
- ✅ Neon database provisioned
- ✅ Prisma configured
- ✅ Clerk authentication
- ✅ shadcn/ui components

**Blocks**:
- Phase 2: Booking Management (needs room availability)
- Phase 3: Channel Manager (needs room inventory)
- Phase 4: Pricing (needs room categories)

### Risks

1. **Multi-tenancy Complexity**
   - Risk: Data leakage between properties
   - Mitigation: Comprehensive tests, middleware guards

2. **Performance at Scale**
   - Risk: Slow queries with many rooms
   - Mitigation: Database indexes, query optimization

3. **Real-time Sync**
   - Risk: Liveblocks conflicts
   - Mitigation: Proper conflict resolution, optimistic updates

4. **File Storage Costs**
   - Risk: High costs with many room photos
   - Mitigation: Image optimization, CDN, lazy loading

### Timeline

- **Week 1**: Database schema, seed data, basic CRUD
- **Week 2**: UI components, property management
- **Week 3**: Room category and room management
- **Week 4**: Amenities, availability, polish, tests

**Total**: 4 weeks for comprehensive implementation

## Success Criteria

- [ ] Can create organization with multiple properties
- [ ] Can configure property settings including fiscal info
- [ ] Can create room categories with all attributes
- [ ] Can manage individual rooms with overrides
- [ ] Can assign amenities at property/category/room level
- [ ] Can view availability calendar
- [ ] Can manually block dates
- [ ] Real-time updates work across users
- [ ] All CRUD operations have proper permissions
- [ ] Data isolation enforced (no data leakage)
- [ ] Unit tests > 80% coverage
- [ ] Integration tests for critical paths
- [ ] Performance < 2s page loads
- [ ] Documentation complete
- [ ] Seed data for development

## Next Steps

1. Create detailed spec in `specs/property-management/spec.md`
2. Design Prisma schema additions
3. Create seed data script
4. Build UI components
5. Implement CRUD operations
6. Add real-time features
7. Write tests
8. Document APIs

