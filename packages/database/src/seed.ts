// Nexora Database Seed Script
// Creates realistic test data for development

import { PrismaClient } from '../generated/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Clean existing data (development only!)
  console.log('🧹 Cleaning existing data...');
  await prisma.auditLog.deleteMany();
  await prisma.availabilityBlock.deleteMany();
  await prisma.roomAmenity.deleteMany();
  await prisma.categoryAmenity.deleteMany();
  await prisma.propertyAmenity.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.room.deleteMany();
  await prisma.roomCategory.deleteMany();
  await prisma.season.deleteMany();
  await prisma.propertyAccess.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();
  console.log('✅ Data cleaned\n');

  // Create Organizations
  console.log('🏢 Creating organizations...');
  const orgItaly = await prisma.organization.create({
    data: {
      name: 'Bella Vista Hospitality Group',
      slug: 'bella-vista',
      country: 'IT',
      settings: {},
    },
  });

  const orgBrazil = await prisma.organization.create({
    data: {
      name: 'Tropical Paradise Resorts',
      slug: 'tropical-paradise',
      country: 'BR',
      settings: {},
    },
  });
  console.log(`✅ Created 2 organizations\n`);

  // Create Users
  console.log('👤 Creating users...');
  const owner = await prisma.user.create({
    data: {
      clerkId: 'user_owner_demo',
      email: 'owner@bellavista.it',
      name: 'Marco Rossi',
      role: 'OWNER',
      organizationId: orgItaly.id,
    },
  });

  const manager = await prisma.user.create({
    data: {
      clerkId: 'user_manager_demo',
      email: 'manager@bellavista.it',
      name: 'Sofia Romano',
      role: 'MANAGER',
      organizationId: orgItaly.id,
    },
  });

  const receptionist = await prisma.user.create({
    data: {
      clerkId: 'user_receptionist_demo',
      email: 'reception@bellavista.it',
      name: 'Giovanni Ferrari',
      role: 'RECEPTIONIST',
      organizationId: orgItaly.id,
    },
  });
  console.log(`✅ Created 3 users\n`);

  // Create Properties
  console.log('🏨 Creating properties...');
  
  // Property 1: Italian B&B
  const propertyTuscany = await prisma.property.create({
    data: {
      organizationId: orgItaly.id,
      name: 'Villa Bella Vista',
      slug: 'villa-bella-vista',
      type: 'BNB',
      address: 'Via Roma 123',
      city: 'Firenze',
      state: 'Toscana',
      postalCode: '50100',
      country: 'IT',
      phone: '+39 055 1234567',
      email: 'info@villabellavista.it',
      website: 'https://villabellavista.it',
      vatNumber: '12345678901',
      cin: 'IT055042A1BC123456',
      cir: 'CIR055042-BED-00123',
      checkInTime: '15:00',
      checkOutTime: '11:00',
      currency: 'EUR',
      timezone: 'Europe/Rome',
      status: 'ACTIVE',
      settings: {
        fiscal: {
          touristTax: {
            enabled: true,
            rate: 3.50,
            perNight: true,
            maxNights: 5,
          },
        },
        booking: {
          minAdvanceHours: 24,
          maxAdvanceDays: 365,
        },
      },
    },
  });

  // Property 2: Italian Resort
  const propertyAmalfi = await prisma.property.create({
    data: {
      organizationId: orgItaly.id,
      name: 'Resort Amalfi Paradise',
      slug: 'resort-amalfi-paradise',
      type: 'RESORT_VILLAGGI',
      address: 'Via Costiera Amalfitana 456',
      city: 'Positano',
      state: 'Campania',
      postalCode: '84017',
      country: 'IT',
      phone: '+39 089 7654321',
      email: 'info@amalfiparadise.it',
      website: 'https://amalfiparadise.it',
      vatNumber: '98765432109',
      cin: 'IT084060A1BC789012',
      cir: 'CIR084060-RES-00456',
      checkInTime: '14:00',
      checkOutTime: '10:00',
      currency: 'EUR',
      timezone: 'Europe/Rome',
      status: 'ACTIVE',
      settings: {},
    },
  });

  // Property 3: Brazilian Resort
  const propertyBrazil = await prisma.property.create({
    data: {
      organizationId: orgBrazil.id,
      name: 'Copacabana Beach Resort',
      slug: 'copacabana-beach-resort',
      type: 'OPEN_AIR_RESORT',
      address: 'Avenida Atlântica 1000',
      city: 'Rio de Janeiro',
      state: 'RJ',
      postalCode: '22070-000',
      country: 'BR',
      phone: '+55 21 3456-7890',
      email: 'contato@copacabanaresort.com.br',
      website: 'https://copacabanaresort.com.br',
      brazilianTaxId: '12.345.678/0001-90',
      checkInTime: '14:00',
      checkOutTime: '12:00',
      currency: 'BRL',
      timezone: 'America/Sao_Paulo',
      status: 'ACTIVE',
      settings: {},
    },
  });
  console.log(`✅ Created 3 properties\n`);

  // Create Property Access
  await prisma.propertyAccess.createMany({
    data: [
      { userId: owner.id, propertyId: propertyTuscany.id },
      { userId: owner.id, propertyId: propertyAmalfi.id },
      { userId: manager.id, propertyId: propertyTuscany.id },
      { userId: receptionist.id, propertyId: propertyTuscany.id },
    ],
  });

  // Create Seasons for Tuscany property
  console.log('📅 Creating seasons...');
  await prisma.season.createMany({
    data: [
      {
        propertyId: propertyTuscany.id,
        name: 'Low Season',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-03-31'),
        color: '#60A5FA', // Blue
      },
      {
        propertyId: propertyTuscany.id,
        name: 'Mid Season',
        startDate: new Date('2025-04-01'),
        endDate: new Date('2025-05-31'),
        color: '#34D399', // Green
      },
      {
        propertyId: propertyTuscany.id,
        name: 'High Season',
        startDate: new Date('2025-06-01'),
        endDate: new Date('2025-09-15'),
        color: '#F59E0B', // Amber
      },
      {
        propertyId: propertyTuscany.id,
        name: 'Fall Season',
        startDate: new Date('2025-09-16'),
        endDate: new Date('2025-12-31'),
        color: '#8B5CF6', // Purple
      },
    ],
  });
  console.log(`✅ Created seasons\n`);

  // Create Amenities
  console.log('🎯 Creating amenities...');
  const amenities = await prisma.amenity.createMany({
    data: [
      // Room Features
      { name: 'Air Conditioning', i18nKey: 'amenity.ac', category: 'ROOM_FEATURES', icon: 'snowflake' },
      { name: 'Heating', i18nKey: 'amenity.heating', category: 'ROOM_FEATURES', icon: 'flame' },
      { name: 'WiFi', i18nKey: 'amenity.wifi', category: 'ROOM_FEATURES', icon: 'wifi' },
      { name: 'Desk', i18nKey: 'amenity.desk', category: 'ROOM_FEATURES', icon: 'desk' },
      { name: 'Wardrobe', i18nKey: 'amenity.wardrobe', category: 'ROOM_FEATURES', icon: 'wardrobe' },
      
      // Bathroom
      { name: 'Private Bathroom', i18nKey: 'amenity.private_bathroom', category: 'BATHROOM', icon: 'bath' },
      { name: 'Shower', i18nKey: 'amenity.shower', category: 'BATHROOM', icon: 'shower' },
      { name: 'Bathtub', i18nKey: 'amenity.bathtub', category: 'BATHROOM', icon: 'bathtub' },
      { name: 'Hairdryer', i18nKey: 'amenity.hairdryer', category: 'BATHROOM', icon: 'hairdryer' },
      { name: 'Toiletries', i18nKey: 'amenity.toiletries', category: 'BATHROOM', icon: 'bottle' },
      
      // Entertainment
      { name: 'TV', i18nKey: 'amenity.tv', category: 'ENTERTAINMENT', icon: 'tv' },
      { name: 'Streaming Services', i18nKey: 'amenity.streaming', category: 'ENTERTAINMENT', icon: 'play' },
      
      // Kitchen
      { name: 'Mini Fridge', i18nKey: 'amenity.minifridge', category: 'KITCHEN', icon: 'fridge' },
      { name: 'Coffee Maker', i18nKey: 'amenity.coffee', category: 'KITCHEN', icon: 'coffee' },
      { name: 'Kettle', i18nKey: 'amenity.kettle', category: 'KITCHEN', icon: 'kettle' },
      
      // Safety
      { name: 'Safe', i18nKey: 'amenity.safe', category: 'SAFETY', icon: 'lock' },
      { name: 'Smoke Detector', i18nKey: 'amenity.smoke_detector', category: 'SAFETY', icon: 'alert' },
      { name: 'Fire Extinguisher', i18nKey: 'amenity.fire_extinguisher', category: 'SAFETY', icon: 'fire' },
      
      // Outdoor
      { name: 'Balcony', i18nKey: 'amenity.balcony', category: 'OUTDOOR', icon: 'balcony' },
      { name: 'Terrace', i18nKey: 'amenity.terrace', category: 'OUTDOOR', icon: 'terrace' },
      { name: 'Garden View', i18nKey: 'amenity.garden_view', category: 'OUTDOOR', icon: 'tree' },
      { name: 'Sea View', i18nKey: 'amenity.sea_view', category: 'OUTDOOR', icon: 'waves' },
    ],
  });

  const allAmenities = await prisma.amenity.findMany();
  console.log(`✅ Created ${allAmenities.length} amenities\n`);

  // Create Room Categories
  console.log('🛏️  Creating room categories...');
  
  // Category 1: Standard Double
  const catStandardDouble = await prisma.roomCategory.create({
    data: {
      propertyId: propertyTuscany.id,
      name: 'Standard Double Room',
      shortName: 'STD DBL',
      description: 'Comfortable double room with modern amenities and city view',
      minCapacity: 1,
      maxCapacity: 2,
      extraCapacity: 1,
      extraCapacityTypes: { adults: 1, children: 0, infants: 0 },
      size: 20,
      bedConfigurations: [
        { id: 'config1', name: '1 Double Bed', beds: [{ type: 'double', count: 1 }] },
        { id: 'config2', name: '2 Twin Beds', beds: [{ type: 'twin', count: 2 }] },
      ],
      defaultBedConfig: { id: 'config1', name: '1 Double Bed', beds: [{ type: 'double', count: 1 }] },
      petsAllowed: false,
      smokingAllowed: false,
      color: '#3B82F6',
      order: 1,
      photos: [
        { url: '/images/rooms/standard-double-1.jpg', alt: 'Standard Double Room' },
        { url: '/images/rooms/standard-double-2.jpg', alt: 'Standard Double Bathroom' },
      ],
    },
  });

  // Category 2: Deluxe Suite
  const catDeluxeSuite = await prisma.roomCategory.create({
    data: {
      propertyId: propertyTuscany.id,
      name: 'Deluxe Suite',
      shortName: 'DLX STE',
      description: 'Spacious suite with separate living area, balcony, and stunning views',
      minCapacity: 2,
      maxCapacity: 4,
      extraCapacity: 2,
      extraCapacityTypes: { adults: 1, children: 1, infants: 1 },
      size: 45,
      bedConfigurations: [
        { id: 'config1', name: '1 King Bed + Sofa Bed', beds: [{ type: 'king', count: 1 }, { type: 'sofa', count: 1 }] },
        { id: 'config2', name: '2 Queen Beds', beds: [{ type: 'queen', count: 2 }] },
      ],
      defaultBedConfig: { id: 'config1', name: '1 King Bed + Sofa Bed', beds: [{ type: 'king', count: 1 }, { type: 'sofa', count: 1 }] },
      petsAllowed: true,
      maxPets: 1,
      smokingAllowed: false,
      color: '#8B5CF6',
      order: 2,
      photos: [
        { url: '/images/rooms/deluxe-suite-1.jpg', alt: 'Deluxe Suite Living Area' },
        { url: '/images/rooms/deluxe-suite-2.jpg', alt: 'Deluxe Suite Bedroom' },
        { url: '/images/rooms/deluxe-suite-3.jpg', alt: 'Deluxe Suite Balcony' },
      ],
      virtualTour: 'https://virtual-tour.example.com/deluxe-suite',
    },
  });

  // Category 3: Family Room
  const catFamily = await prisma.roomCategory.create({
    data: {
      propertyId: propertyTuscany.id,
      name: 'Family Room',
      shortName: 'FAMILY',
      description: 'Perfect for families with children, featuring bunk beds and play area',
      minCapacity: 2,
      maxCapacity: 6,
      extraCapacity: 0,
      extraCapacityTypes: { adults: 0, children: 0, infants: 1 },
      size: 35,
      bedConfigurations: [
        { id: 'config1', name: '1 Double + 2 Bunk Beds', beds: [{ type: 'double', count: 1 }, { type: 'bunk', count: 2 }] },
      ],
      defaultBedConfig: { id: 'config1', name: '1 Double + 2 Bunk Beds', beds: [{ type: 'double', count: 1 }, { type: 'bunk', count: 2 }] },
      petsAllowed: false,
      smokingAllowed: false,
      color: '#10B981',
      order: 3,
      photos: [
        { url: '/images/rooms/family-room-1.jpg', alt: 'Family Room' },
      ],
    },
  });
  console.log(`✅ Created 3 room categories\n`);

  // Assign amenities to categories
  console.log('🔗 Assigning amenities to categories...');
  const wifiAmenity = allAmenities.find(a => a.i18nKey === 'amenity.wifi');
  const acAmenity = allAmenities.find(a => a.i18nKey === 'amenity.ac');
  const tvAmenity = allAmenities.find(a => a.i18nKey === 'amenity.tv');
  const balconyAmenity = allAmenities.find(a => a.i18nKey === 'amenity.balcony');
  const bathtubAmenity = allAmenities.find(a => a.i18nKey === 'amenity.bathtub');

  if (wifiAmenity && acAmenity && tvAmenity) {
    await prisma.categoryAmenity.createMany({
      data: [
        { categoryId: catStandardDouble.id, amenityId: wifiAmenity.id },
        { categoryId: catStandardDouble.id, amenityId: acAmenity.id },
        { categoryId: catStandardDouble.id, amenityId: tvAmenity.id },
        { categoryId: catDeluxeSuite.id, amenityId: wifiAmenity.id },
        { categoryId: catDeluxeSuite.id, amenityId: acAmenity.id },
        { categoryId: catDeluxeSuite.id, amenityId: tvAmenity.id },
        ...(balconyAmenity ? [{ categoryId: catDeluxeSuite.id, amenityId: balconyAmenity.id }] : []),
        ...(bathtubAmenity ? [{ categoryId: catDeluxeSuite.id, amenityId: bathtubAmenity.id }] : []),
        { categoryId: catFamily.id, amenityId: wifiAmenity.id },
        { categoryId: catFamily.id, amenityId: acAmenity.id },
        { categoryId: catFamily.id, amenityId: tvAmenity.id },
      ],
    });
  }
  console.log(`✅ Assigned amenities\n`);

  // Create Individual Rooms
  console.log('🚪 Creating individual rooms...');
  
  // Standard Double Rooms
  const standardRooms = [];
  for (let i = 1; i <= 5; i++) {
    const room = await prisma.room.create({
      data: {
        propertyId: propertyTuscany.id,
        categoryId: catStandardDouble.id,
        number: `10${i}`,
        floor: '1',
        bookable: true,
        status: 'AVAILABLE',
        order: i,
      },
    });
    standardRooms.push(room);
  }

  // Deluxe Suites
  const deluxeRooms = [];
  for (let i = 1; i <= 3; i++) {
    const room = await prisma.room.create({
      data: {
        propertyId: propertyTuscany.id,
        categoryId: catDeluxeSuite.id,
        number: `20${i}`,
        floor: '2',
        bookable: true,
        status: 'AVAILABLE',
        order: i,
      },
    });
    deluxeRooms.push(room);
  }

  // Family Rooms
  const familyRooms = [];
  for (let i = 1; i <= 2; i++) {
    const room = await prisma.room.create({
      data: {
        propertyId: propertyTuscany.id,
        categoryId: catFamily.id,
        number: `30${i}`,
        floor: '3',
        bookable: true,
        status: 'AVAILABLE',
        order: i,
      },
    });
    familyRooms.push(room);
  }

  console.log(`✅ Created 10 rooms\n`);

  // Create some availability blocks (maintenance)
  console.log('🔒 Creating availability blocks...');
  await prisma.availabilityBlock.create({
    data: {
      roomId: standardRooms[0].id,
      startDate: new Date('2025-12-20'),
      endDate: new Date('2025-12-27'),
      reason: 'Annual Maintenance',
      note: 'Deep cleaning and renovation of bathroom',
      createdBy: manager.clerkId,
    },
  });
  console.log(`✅ Created availability blocks\n`);

  // Create audit log entry
  await prisma.auditLog.create({
    data: {
      userId: owner.id,
      propertyId: propertyTuscany.id,
      action: 'CREATE',
      resourceType: 'Property',
      resourceId: propertyTuscany.id,
      newValues: { name: propertyTuscany.name, status: 'ACTIVE' },
    },
  });

  console.log('\n✅ Database seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - Organizations: 2`);
  console.log(`   - Users: 3`);
  console.log(`   - Properties: 3`);
  console.log(`   - Room Categories: 3`);
  console.log(`   - Rooms: 10`);
  console.log(`   - Amenities: ${allAmenities.length}`);
  console.log(`   - Seasons: 4`);
  console.log(`\n🎉 Ready to start development!\n`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

