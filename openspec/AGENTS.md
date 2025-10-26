# OpenSpec AI Agent Instructions

This document outlines the expected behavior and workflow for AI assistants working on the Nexora hospitality management platform.

## Core Workflow

1. **Understand Project Context**: Review `project.md` for project details, goals, and constraints
2. **Adhere to OpenSpec Standards**: Follow the specifications and guidelines defined within the OpenSpec framework
3. **Utilize Project Files**: Reference and update files within the `specs/` and `changes/` directories as needed
4. **Generate and Refine Specifications**: Create new specification files or modify existing ones based on project requirements
5. **Document Changes**: Keep the `changes/archive/` directory updated with a log of modifications

## Nexora-Specific Guidelines

### Technology Stack Adherence

- **Framework**: Next.js 14+ with App Router (Server Components)
- **Database**: Always use Prisma for database operations
- **UI**: Prefer shadcn/ui components, fallback to Material UI only if needed
- **Styling**: Tailwind CSS with next-forge conventions
- **Authentication**: Use Clerk for all auth operations
- **Real-time**: Liveblocks for collaboration features

### Code Conventions

1. **TypeScript**: Strict mode enabled, no `any` types
2. **File Structure**: Follow Next-Forge monorepo patterns
   - `apps/` for applications
   - `packages/` for shared code
3. **API Design**: Use Server Actions over API routes when possible
4. **Database**: 
   - All models in Prisma schema
   - Use transactions for multi-step operations
   - Always include soft deletes (`deletedAt`)
5. **Internationalization**: Use languine for all user-facing strings

### Naming Conventions

- **Components**: PascalCase (e.g., `PropertyManagement.tsx`)
- **Functions**: camelCase (e.g., `createProperty`)
- **Database Tables**: snake_case (e.g., `property_categories`)
- **API Routes**: kebab-case (e.g., `/api/property-management`)

### Multi-tenancy Rules

- **Every query** must filter by property/organization
- **User context** must be validated on every request
- **Data isolation** is critical - test for data leakage
- **Permissions** must be checked at both UI and API level

### Internationalization

- **Default Language**: English
- **Supported**: Italian (IT), Portuguese (PT)
- **Detection**: IP-based with manual override
- **Keys**: Use descriptive keys in dictionaries (e.g., `property.room.create.title`)

### Performance Requirements

- **Page Load**: < 2s for initial load
- **Server Actions**: < 500ms for simple operations
- **Database Queries**: Use indexes, avoid N+1 queries
- **Images**: Always optimize, use Next.js Image component
- **Caching**: Use Next.js cache strategies appropriately

## OpenSpec Commands

```bash
# Essential commands
openspec spec list --long        # List all specifications
openspec list                    # List active changes
openspec validate [change-id] --strict  # Validate changes
openspec show [item]            # View details
openspec diff [change]          # What's changing?
openspec archive [change]       # Mark complete
```

## Development Workflow

### Creating a New Feature

1. **Search existing specs**: `openspec spec list --long`
2. **Create change proposal**: 
   ```bash
   CHANGE=add-feature-name
   mkdir -p openspec/changes/$CHANGE/specs
   ```
3. **Write proposal.md**: Document why, what, and impact
4. **Create spec deltas**: Add ADDED/MODIFIED/REMOVED requirements
5. **Validate**: `openspec validate $CHANGE --strict`
6. **Implement**: Build the feature
7. **Archive**: `openspec archive $CHANGE` when deployed

### Modifying Existing Features

1. **Review current spec**: `openspec show [spec-id] --type spec`
2. **Create change proposal**: Same as above
3. **Document deltas**: Use MODIFIED/REMOVED requirement headers
4. **Test**: Ensure backward compatibility
5. **Archive**: After successful deployment

## Best Practices

### Database Design

- Always include:
  - `id` (UUID)
  - `createdAt` (timestamp)
  - `updatedAt` (timestamp)
  - `deletedAt` (timestamp, nullable)
  - `propertyId` (for tenant isolation)
  - `organizationId` (for multi-property groups)

### Error Handling

- Use proper HTTP status codes
- Return descriptive error messages
- Log errors to Sentry
- Show user-friendly messages in UI

### Security

- Validate all inputs
- Sanitize data before database operations
- Use parameterized queries (Prisma does this)
- Check permissions on every operation
- Rate limit public endpoints

### Testing

- Unit tests for business logic
- Integration tests for API routes
- E2E tests for critical flows
- Test multi-tenancy isolation
- Test permission boundaries

## Interaction Guidelines

When asked about:
- **OpenSpec workflow**: Explain based on this document
- **Project structure**: Reference `project.md`
- **Technical decisions**: Follow the technology stack
- **New features**: Create proper change proposals
- **Bugs**: Fix directly if restoring spec behavior, otherwise create proposal

## Architecture Principles

1. **Server-First**: Prefer Server Components and Server Actions
2. **Progressive Enhancement**: Core functionality works without JavaScript
3. **API-Driven**: Design APIs that could support mobile apps
4. **Monorepo Benefits**: Share code between apps via packages
5. **Type Safety**: TypeScript end-to-end, including database schema

## Migration from Scidoo

When migrating features:
1. **Understand legacy behavior**: Review roadmap documentation
2. **Modernize UX**: Don't just copy, improve
3. **Maintain compatibility**: Data structure should be migratable
4. **Document differences**: Note what changed and why
5. **Create migration scripts**: In `packages/database/migrations/`

## Current Focus

**Phase 1**: Property & Room Management
- Comprehensive implementation
- All CRUD operations
- Categories, rooms, amenities
- Capacity management
- Availability tracking
- Multi-property support

**Phase 2+**: Scaffolding for other features
- Show where features will live
- Create placeholder routes
- Design data models
- Document integration points

---

For questions or clarifications, refer to:
- Technical documentation in `/docs`
- Prisma schema in `packages/database/prisma/schema.prisma`
- Existing implementations in `apps/` directories

