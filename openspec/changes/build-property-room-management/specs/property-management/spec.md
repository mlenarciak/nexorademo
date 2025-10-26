# Property & Room Management Specification

## Overview

This specification defines the requirements for the Property & Room Management system in Nexora, a hospitality PMS. The system enables multi-tenant property management with comprehensive room categorization, capacity management, and availability tracking.

---

## ADDED Requirements

### Requirement: Multi-Property Organization Management

The system SHALL support multiple properties under a single organization account.

#### Scenario: Create organization
- **WHEN** a new user signs up via Clerk
- **THEN** an Organization record is automatically created
- **AND** the user is assigned as OWNER role
- **AND** the organization slug is generated from the name
- **AND** the country is detected from IP or selected

#### Scenario: Add property to organization
- **WHEN** an OWNER or MANAGER creates a new property
- **THEN** the property is associated with their organization
- **AND** the property receives a unique slug
- **AND** the property is immediately accessible
- **AND** default settings are applied based on country

#### Scenario: Property access control
- **WHEN** a user attempts to access a property
- **THEN** the system verifies they belong to the property's organization
- **AND** the system checks their role permissions
- **AND** unauthorized access is denied with 403 error
- **AND** authorized access proceeds with property context set

#### Scenario: List properties
- **WHEN** a user views their properties list
- **THEN** only properties from their organization are displayed
- **AND** properties show key metrics (total rooms, occupancy, status)
- **AND** properties are sortable by name, creation date, status
- **AND** properties are searchable by name

#### Scenario: Switch between properties
- **WHEN** a user manages multiple properties
- **THEN** a property switcher is available in the navigation
- **AND** switching properties updates the entire interface context
- **AND** the last-viewed property is remembered per session
- **AND** switching is instant (< 500ms)

---

### Requirement: Property Configuration

The system SHALL allow comprehensive configuration of property details and settings.

#### Scenario: Create new property
- **WHEN** a user creates a property
- **THEN** required fields are: name, address, city, country, phone, email
- **AND** optional fields include: website, social media, logo
- **AND** fiscal fields vary by country (CIN/CIR for Italy, CNPJ for Brazil)
- **AND** operational settings have sensible defaults
- **AND** property is created in SETUP status

#### Scenario: Configure operational settings
- **WHEN** a manager configures property settings
- **THEN** check-in time can be set (format HH:MM)
- **AND** check-out time can be set (format HH:MM)
- **AND** currency is selected from supported list
- **AND** timezone is set (affects date calculations)
- **AND** settings are validated before saving

#### Scenario: Italian property fiscal setup
- **WHEN** a property is in Italy
- **THEN** CIN (Codice Identificativo Nazionale) field is required
- **AND** CIR (Codice Identificativo Regionale) field is optional
- **AND** VAT number format is validated (11 digits)
- **AND** fiscal code (Codice Fiscale) can be entered
- **AND** tourist tax settings are available

#### Scenario: Brazilian property fiscal setup
- **WHEN** a property is in Brazil
- **THEN** CNPJ field is required and validated
- **AND** state registration (Inscrição Estadual) can be entered
- **AND** municipal registration can be entered
- **AND** Brazilian fiscal settings are available (placeholder)

#### Scenario: Update property details
- **WHEN** a manager updates property information
- **THEN** changes are saved immediately
- **AND** affected users see updates in real-time
- **AND** audit log records who made changes
- **AND** previous values are retained for history

---

### Requirement: Season & Period Management

The system SHALL support definition of seasonal periods for pricing and calendar management.

#### Scenario: Create season
- **WHEN** a manager creates a season
- **THEN** a name is required (e.g., "High Season", "Low Season")
- **AND** start and end dates are required
- **AND** dates cannot overlap with existing seasons
- **AND** a color is assigned for calendar display
- **AND** season is immediately usable for pricing

#### Scenario: Visualize seasons on calendar
- **WHEN** viewing the availability calendar
- **THEN** season periods are color-coded
- **AND** season names appear on hover
- **AND** season boundaries are clearly marked
- **AND** multiple years of seasons can be defined

#### Scenario: Edit season
- **WHEN** a manager modifies a season
- **THEN** date changes are validated for overlaps
- **AND** color changes update calendar immediately
- **AND** if season has bookings, warning is shown
- **AND** changes affect pricing calculations

#### Scenario: Delete season
- **WHEN** a manager deletes a season
- **THEN** confirmation is required
- **AND** if season is used in active bookings, deletion is blocked
- **AND** if safe to delete, all references are removed
- **AND** calendar updates to remove color coding

---

### Requirement: Room Category Management

The system SHALL enable creation and management of room types/categories with detailed attributes.

#### Scenario: Create room category
- **WHEN** a manager creates a room category
- **THEN** name is required and unique per property
- **AND** short name for calendar display is optional
- **AND** capacity settings include min, max, and extra capacity
- **AND** extra capacity can be broken down by age group
- **AND** room size in square meters can be entered
- **AND** description supports rich text
- **AND** category is created with default settings

#### Scenario: Configure bed arrangements
- **WHEN** defining category bed configurations
- **THEN** multiple configurations can be added (e.g., "2 Twin" or "1 King")
- **AND** each configuration specifies bed types and quantities
- **AND** one configuration is marked as default
- **AND** configurations appear in booking interface
- **AND** total capacity is validated against bed configurations

#### Scenario: Set capacity with age groups
- **WHEN** configuring category capacity
- **THEN** max capacity is set (e.g., 4 persons)
- **AND** extra capacity can be defined (e.g., +2 persons)
- **AND** extra persons are typed by age: adults, children, infants
- **AND** each age group can have different limits
- **AND** pricing rules reference these age groups

#### Scenario: Upload category media
- **WHEN** adding media to a category
- **THEN** multiple photos can be uploaded
- **AND** photos are auto-optimized (WebP, responsive sizes)
- **AND** first photo becomes the primary image
- **AND** photos can be reordered via drag-and-drop
- **AND** videos and virtual tour URLs can be added
- **AND** media is stored in CDN

#### Scenario: Configure category policies
- **WHEN** setting category policies
- **THEN** pet policy can be set (allowed/not allowed)
- **AND** if pets allowed, max number of pets is set
- **AND** smoking policy is set (allowed/not allowed)
- **AND** policies display to guests during booking
- **AND** policies are enforced in booking rules

#### Scenario: Assign amenities to category
- **WHEN** selecting amenities for a category
- **THEN** amenities are chosen from predefined library
- **AND** amenities are grouped by category (features, bathroom, entertainment)
- **AND** custom amenities can be added
- **AND** amenities display on category detail pages
- **AND** amenities are searchable/filterable (future booking engine)

#### Scenario: Set category color
- **WHEN** assigning a color to a category
- **THEN** a color picker allows selection
- **AND** predefined palette is suggested
- **AND** color is used throughout calendar views
- **AND** contrasting text color is auto-calculated
- **AND** color updates reflect immediately

#### Scenario: Category ordering
- **WHEN** managing multiple categories
- **THEN** categories can be reordered
- **AND** order affects display in lists and calendars
- **AND** bulk reorder via drag-and-drop is supported
- **AND** alphabetical/numerical auto-sort is available

---

### Requirement: Individual Room Management

The system SHALL enable management of individual rooms within categories with specific attributes and overrides.

#### Scenario: Create room within category
- **WHEN** adding a room to a category
- **THEN** room number/name is required
- **AND** room inherits all category attributes
- **AND** floor/location can be specified
- **AND** room is automatically bookable
- **AND** room appears in availability calendar

#### Scenario: Override category attributes
- **WHEN** a room differs from its category
- **THEN** specific attributes can be overridden
- **AND** overrides include: capacity, bed config, amenities
- **AND** overridden values are clearly marked in UI
- **AND** removing override restores category default
- **AND** overrides are tracked in audit log

#### Scenario: Set room bookability
- **WHEN** configuring room availability
- **THEN** room can be marked as bookable or non-bookable
- **AND** non-bookable rooms are hidden from OTAs
- **AND** non-bookable rooms can still be used internally
- **AND** bookability can be scheduled (future feature)

#### Scenario: Set room to maintenance mode
- **WHEN** a room needs maintenance
- **THEN** maintenance mode can be enabled
- **AND** maintenance date range is specified
- **AND** room is blocked from bookings during maintenance
- **AND** maintenance note is visible to staff
- **AND** room status shows "Under Maintenance"
- **AND** maintenance history is tracked

#### Scenario: Bulk edit rooms
- **WHEN** managing many rooms
- **THEN** multiple rooms can be selected
- **AND** bulk operations include: set floor, set bookability, assign amenity
- **AND** bulk changes are applied atomically
- **AND** confirmation shows count of affected rooms
- **AND** changes are logged per room

#### Scenario: Room-specific CIN
- **WHEN** Italian regulations require per-room CIN
- **THEN** CIN field is available at room level
- **AND** room CIN overrides property CIN
- **AND** CIN is validated for format
- **AND** CIN appears in fiscal reports

---

### Requirement: Amenity System

The system SHALL provide a comprehensive amenity management system supporting predefined and custom amenities.

#### Scenario: Browse amenity library
- **WHEN** selecting amenities
- **THEN** amenities are organized by category
- **AND** categories include: Room Features, Bathroom, Entertainment, Kitchen, Safety, Accessibility, Outdoor, Services
- **AND** amenities have icons
- **AND** amenities support multiple languages
- **AND** amenities are searchable

#### Scenario: Assign amenities at property level
- **WHEN** configuring property-wide amenities
- **THEN** amenities like WiFi, parking, pool are selected
- **AND** property amenities apply to all rooms by default
- **AND** property amenities display on property page
- **AND** property amenities can be overridden at category/room level

#### Scenario: Assign amenities at category level
- **WHEN** configuring category amenities
- **THEN** category-specific amenities are selected
- **AND** category amenities inherit from property
- **AND** category amenities display on category pages
- **AND** rooms in category inherit these amenities

#### Scenario: Assign amenities at room level
- **WHEN** a room has unique amenities
- **THEN** room-specific amenities are selected
- **AND** room amenities combine property + category + room
- **AND** room amenities display on room detail page
- **AND** inheritance chain is visualized

#### Scenario: Create custom amenity
- **WHEN** needed amenity doesn't exist
- **THEN** custom amenity can be created
- **AND** name, icon, and category are specified
- **AND** custom amenity is added to library
- **AND** custom amenity is reusable across properties
- **AND** creator is tracked

#### Scenario: Multi-language amenities
- **WHEN** amenities are displayed
- **THEN** amenity names are translated based on user language
- **AND** fallback to English if translation missing
- **AND** custom amenities support manual translations
- **AND** amenity descriptions are also translated

---

### Requirement: Availability Tracking

The system SHALL provide real-time availability tracking and visualization for all rooms.

#### Scenario: Calculate availability
- **WHEN** querying room availability
- **THEN** available rooms are those not booked
- **AND** rooms in maintenance are excluded
- **AND** manually blocked dates are excluded
- **AND** calculation respects min/max stay requirements
- **AND** results are returned in < 200ms

#### Scenario: View availability calendar
- **WHEN** accessing the availability calendar
- **THEN** default view is monthly
- **AND** views can switch to weekly or daily
- **AND** rooms are listed on Y-axis
- **AND** dates are on X-axis
- **AND** cells show availability status with color coding

#### Scenario: Availability color coding
- **WHEN** viewing calendar
- **THEN** available rooms are green
- **AND** occupied rooms are red
- **AND** rooms in maintenance are gray
- **AND** manually blocked rooms are orange
- **AND** season colors overlay the background
- **AND** legend explains all colors

#### Scenario: Hover for details
- **WHEN** hovering over a calendar cell
- **THEN** tooltip shows room name, category, status
- **AND** if occupied, guest name appears (if permitted)
- **AND** if blocked, reason appears
- **AND** if maintenance, note appears

#### Scenario: Manual date blocking
- **WHEN** manager blocks dates manually
- **THEN** room(s) are selected
- **AND** date range is selected
- **AND** reason/note is entered
- **AND** block is applied immediately
- **AND** blocked dates prevent bookings
- **AND** block can be removed later

#### Scenario: Real-time availability updates
- **WHEN** a booking is made
- **THEN** calendar updates in real-time for all users
- **AND** Liveblocks broadcasts the change
- **AND** affected cells change color immediately
- **AND** no page refresh is required
- **AND** concurrent users see the same state

#### Scenario: Export availability data
- **WHEN** manager exports availability
- **THEN** date range is selected
- **AND** room categories can be filtered
- **AND** export format is CSV or Excel
- **AND** export includes: date, room, status, booking ref
- **AND** download starts immediately

---

### Requirement: Data Isolation & Multi-tenancy

The system SHALL enforce strict data isolation between organizations.

#### Scenario: Query with organization context
- **WHEN** any database query is executed
- **THEN** organizationId is always included in WHERE clause
- **AND** middleware automatically injects organizationId
- **AND** queries without organizationId are rejected
- **AND** error is logged to Sentry

#### Scenario: Prevent cross-organization access
- **WHEN** a user attempts to access another organization's data
- **THEN** access is denied at the database level
- **AND** 404 error is returned (not 403, to avoid enumeration)
- **AND** attempt is logged for security audit
- **AND** repeated attempts trigger rate limiting

#### Scenario: Organization switcher
- **WHEN** a user belongs to multiple organizations (future)
- **THEN** organization switcher is available
- **AND** switching changes context entirely
- **AND** properties, bookings, etc. are filtered by new org
- **AND** switch is logged for audit

#### Scenario: Data isolation testing
- **WHEN** running integration tests
- **THEN** test suite creates multiple organizations
- **AND** each org creates properties and rooms
- **AND** tests verify org A cannot access org B's data
- **AND** tests verify queries return only org-specific data
- **AND** all data isolation tests must pass

---

### Requirement: Permissions & Role-Based Access

The system SHALL implement role-based access control for all operations.

#### Scenario: Owner permissions
- **WHEN** a user has OWNER role
- **THEN** they can create, read, update, delete all resources
- **AND** they can manage users and assign roles
- **AND** they can view all properties in organization
- **AND** they can access billing and settings
- **AND** they can delete the organization

#### Scenario: Manager permissions
- **WHEN** a user has MANAGER role
- **THEN** they can manage assigned properties
- **AND** they can create/edit rooms and categories
- **AND** they can manage bookings and guests
- **AND** they can view reports for their properties
- **AND** they cannot delete properties or manage billing

#### Scenario: Receptionist permissions
- **WHEN** a user has RECEPTIONIST role
- **THEN** they can view room availability
- **AND** they can create and modify bookings
- **AND** they can check guests in/out
- **AND** they can process payments
- **AND** they cannot modify room configurations

#### Scenario: Housekeeping permissions
- **WHEN** a user has HOUSEKEEPING role
- **THEN** they can view room status
- **AND** they can update room cleaning status
- **AND** they can view maintenance schedules
- **AND** they cannot view guest personal information
- **AND** they cannot create bookings

#### Scenario: F&B permissions
- **WHEN** a user has F_AND_B role
- **THEN** they can view guest bookings
- **AND** they can add charges to guest accounts
- **AND** they can view restaurant reservations
- **AND** they cannot modify room availability

#### Scenario: Guest Services permissions
- **WHEN** a user has GUEST_SERVICES role
- **THEN** they can view bookings
- **AND** they can add service charges (spa, activities)
- **AND** they can manage service schedules
- **AND** they cannot process payments or check-out

#### Scenario: Permission check failure
- **WHEN** a user attempts unauthorized action
- **THEN** 403 Forbidden error is returned
- **AND** error message is user-friendly
- **AND** attempt is logged
- **AND** UI hides unauthorized actions proactively

---

### Requirement: Real-time Collaboration

The system SHALL support multiple users working simultaneously with real-time updates.

#### Scenario: Concurrent editing
- **WHEN** multiple users edit the same property
- **THEN** Liveblocks tracks each user's presence
- **AND** user avatars show who is viewing
- **AND** changes by one user appear to others in real-time
- **AND** optimistic updates provide immediate feedback
- **AND** conflicts are resolved via last-write-wins

#### Scenario: Presence indicators
- **WHEN** users are viewing the same page
- **THEN** presence indicators show active users
- **AND** user names and avatars are displayed
- **AND** cursor positions are shown (for relevant views)
- **AND** presence fades after inactivity

#### Scenario: Optimistic updates
- **WHEN** a user makes a change
- **THEN** UI updates immediately before server confirmation
- **AND** loading spinner indicates pending state
- **AND** success confirmation appears on completion
- **AND** errors revert optimistic changes
- **AND** error messages guide next steps

#### Scenario: Conflict resolution
- **WHEN** two users edit the same field simultaneously
- **THEN** last successful write wins
- **AND** losing user is notified of conflict
- **AND** losing user can review and reapply changes
- **AND** version history is maintained

---

### Requirement: Performance & Scalability

The system SHALL meet performance requirements at scale.

#### Scenario: Fast page loads
- **WHEN** a user navigates to any page
- **THEN** first contentful paint is < 1.5s
- **AND** largest contentful paint is < 2.0s
- **AND** time to interactive is < 2.5s
- **AND** metrics are monitored via Vercel Analytics

#### Scenario: Efficient database queries
- **WHEN** querying room availability
- **THEN** query uses appropriate indexes
- **AND** query execution time is < 100ms
- **AND** N+1 queries are avoided via eager loading
- **AND** query performance is monitored

#### Scenario: Image optimization
- **WHEN** displaying room photos
- **THEN** images are served in WebP format
- **AND** images are responsive (srcset)
- **AND** images are lazy-loaded below the fold
- **AND** CDN caching is enabled
- **AND** first image uses priority loading

#### Scenario: Handle 50 concurrent users
- **WHEN** 50 users access a property simultaneously
- **THEN** all users receive responses < 2s
- **AND** database connections are pooled
- **AND** no rate limiting is triggered
- **AND** no errors occur

#### Scenario: Database connection pooling
- **WHEN** multiple requests hit the database
- **THEN** Prisma connection pool is used
- **AND** pool size is configured appropriately
- **AND** connections are reused efficiently
- **AND** pool exhaustion is monitored

---

### Requirement: Internationalization

The system SHALL support English, Italian, and Portuguese languages.

#### Scenario: Detect user language
- **WHEN** a user first visits
- **THEN** language is detected from IP geolocation
- **AND** Italian is used for Italy IPs
- **AND** Portuguese is used for Brazil IPs
- **AND** English is used for others
- **AND** detection can be overridden

#### Scenario: Manual language selection
- **WHEN** a user selects a language
- **THEN** language selector is in the header
- **AND** selection persists in user profile
- **AND** entire UI updates immediately
- **AND** no page refresh is required

#### Scenario: Translated property management
- **WHEN** viewing property management in Italian
- **THEN** all labels, buttons, messages are in Italian
- **AND** error messages are in Italian
- **AND** validation messages are in Italian
- **AND** date formats follow Italian conventions (DD/MM/YYYY)
- **AND** numbers use Italian formatting (1.000,50)

#### Scenario: Fallback to English
- **WHEN** a translation is missing
- **THEN** English text is shown
- **AND** missing translation is logged
- **AND** no error is thrown
- **AND** missing keys are reported for translation

---

### Requirement: Audit Logging

The system SHALL log all significant actions for compliance and debugging.

#### Scenario: Log property changes
- **WHEN** a property is created, updated, or deleted
- **THEN** audit log records: user, timestamp, action, old values, new values
- **AND** log is immutable (append-only)
- **AND** log is searchable by date, user, property
- **AND** log retention is configurable

#### Scenario: Log permission failures
- **WHEN** a permission check fails
- **THEN** attempted action is logged
- **AND** user, resource, and action are recorded
- **AND** logs are reviewed for security incidents

#### Scenario: View audit history
- **WHEN** viewing audit history
- **THEN** logs are paginated
- **AND** logs are filterable by date, user, action
- **AND** log details are expandable
- **AND** sensitive data is redacted for non-owners

---

### Requirement: Error Handling

The system SHALL handle errors gracefully and inform users appropriately.

#### Scenario: Validation error
- **WHEN** user input fails validation
- **THEN** specific field errors are highlighted
- **AND** error messages are clear and actionable
- **AND** form submission is prevented
- **AND** user can correct and resubmit

#### Scenario: Database error
- **WHEN** a database operation fails
- **THEN** error is logged to Sentry
- **AND** user sees generic error message
- **AND** error ID is provided for support
- **AND** developer gets detailed stack trace

#### Scenario: Network error
- **WHEN** network request fails
- **THEN** retry logic attempts 3 times with exponential backoff
- **AND** user sees loading indicator
- **AND** after retries, error message appears
- **AND** user can manually retry

#### Scenario: Unauthorized access
- **WHEN** user accesses forbidden resource
- **THEN** 403 error page is shown
- **AND** message explains permission issue
- **AND** link to request access is provided
- **AND** attempt is logged

---

### Requirement: Search & Filtering

The system SHALL provide efficient search and filtering across properties and rooms.

#### Scenario: Search properties
- **WHEN** user searches properties
- **THEN** search matches property name, city, or address
- **AND** results update as user types (debounced)
- **AND** search is case-insensitive
- **AND** results are highlighted
- **AND** search is limited to user's organization

#### Scenario: Filter rooms
- **WHEN** viewing rooms list
- **THEN** rooms can be filtered by category
- **AND** rooms can be filtered by floor
- **AND** rooms can be filtered by status (available, occupied, maintenance)
- **AND** rooms can be filtered by amenities
- **AND** filters are combinable (AND logic)

#### Scenario: Sort lists
- **WHEN** viewing any list
- **THEN** list can be sorted by multiple columns
- **AND** sort direction toggles (ascending/descending)
- **AND** sort preference persists per session
- **AND** sort updates immediately

---

## Implementation Notes

### Database Indexes

Required indexes for performance:
- `Property.organizationId` + `Property.deletedAt`
- `RoomCategory.propertyId` + `RoomCategory.deletedAt`
- `Room.propertyId` + `Room.categoryId` + `Room.deletedAt`
- `Room.status` + `Room.propertyId`
- `Season.propertyId` + `Season.startDate` + `Season.endDate`
- Unique indexes on slugs

### Caching Strategy

- Property list: 60s cache, revalidate on mutation
- Room availability: Real-time, no caching
- Amenity library: 1 hour cache (rarely changes)
- User permissions: 5 minutes cache

### File Storage

- Use Vercel Blob for image storage
- Organize by: `{organizationId}/{propertyId}/rooms/{categoryId}/{filename}`
- Generate thumbnails: 200x200, 400x400, 800x800
- Use WebP format, JPEG fallback
- Set cache headers: 1 year

### Security

- All mutations require authentication
- CSRF protection via Clerk
- Rate limiting: 100 req/min per user
- SQL injection prevented by Prisma
- XSS prevention via React

---

## Future Enhancements (Not in MVP)

- Room floor plans with visual editor
- 3D virtual tours integration
- AI-powered room description generation
- Automated amenity detection from photos
- Room recommendation engine
- Predictive maintenance scheduling
- Dynamic capacity based on events
- Room grouping for suites
- Clone property settings
- Property templates

---

## Success Metrics

- [ ] 100% of queries include organizationId filter
- [ ] 0 data leakage incidents in testing
- [ ] < 2s page load times
- [ ] < 100ms database queries (p95)
- [ ] 80%+ unit test coverage
- [ ] 100% of critical paths have integration tests
- [ ] All WCAG 2.1 AA criteria met
- [ ] All three languages translated

---

**END OF SPECIFICATION**

