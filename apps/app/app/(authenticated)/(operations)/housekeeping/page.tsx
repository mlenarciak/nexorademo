import type { Metadata } from "next";
import { FeaturePlaceholder } from "../../components/feature-placeholder";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Housekeeping | Nexora",
  description:
    "Coordinate cleaning tasks and room readiness while the housekeeping board is rebuilt.",
};

const HousekeepingPage = () => (
  <>
    <Header page="Housekeeping" pages={["Operations"]} />
    <FeaturePlaceholder
      description="Track room status, assign tasks, and share live updates between housekeeping and front desk teams."
      legacyFeature="Pulizie"
      plannedCapabilities={[
        "Dynamic board showing arrivals, departures, stayovers, and out-of-order rooms",
        "Mobile-friendly task assignments with progress updates",
        "Integration hooks for maintenance and inventory follow-ups",
      ]}
      title="Housekeeping"
    />
  </>
);

export default HousekeepingPage;
