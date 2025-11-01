import type { Metadata } from "next";
import { FeaturePlaceholder } from "../../components/feature-placeholder";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Reservations | Nexora",
  description:
    "Manage bookings, stays, and check-in/out workflows while the reservations hub is under construction.",
};

const ReservationsPage = () => (
  <>
    <Header page="Reservations" pages={["Front Desk"]} />
    <FeaturePlaceholder
      description="Unify reservation creation, modification, and check-in/out flows with visibility into availability and balances."
      legacyFeature="Prenotazioni"
      plannedCapabilities={[
        "Multi-step reservation wizard with availability insights",
        "Timeline view for arrivals, in-house guests, and departures",
        "Integrated billing, messaging, and upsell actions",
      ]}
      title="Reservations"
    />
  </>
);

export default ReservationsPage;
