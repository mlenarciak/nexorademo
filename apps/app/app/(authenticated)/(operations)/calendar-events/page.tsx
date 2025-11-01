import type { Metadata } from "next";
import { FeaturePlaceholder } from "../../components/feature-placeholder";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Calendar Events | Nexora",
  description:
    "Plan property activities and shared schedules while the operations calendar is in progress.",
};

const CalendarEventsPage = () => (
  <>
    <Header page="Calendar Events" pages={["Operations"]} />
    <FeaturePlaceholder
      description="Organize on-site events, staff rotations, and amenity bookings so every department works from the same calendar."
      legacyFeature="Eventi Calendario"
      plannedCapabilities={[
        "Unified calendar for departments, amenities, and animation programs",
        "Color-coded categories with conflict detection",
        "Sync hooks for exporting to external calendars or displays",
      ]}
      title="Calendar Events"
    />
  </>
);

export default CalendarEventsPage;
