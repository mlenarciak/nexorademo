import type { Metadata } from "next";
import { FeaturePlaceholder } from "../../components/feature-placeholder";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Entertainment & Activities | Nexora",
  description:
    "Plan resort animation programs while the dedicated activity planner is being rebuilt.",
};

const EntertainmentPage = () => (
  <>
    <Header page="Entertainment & Activities" pages={["Operations"]} />
    <FeaturePlaceholder
      description="Schedule shows, wellness sessions, sports, and kid clubs with staffing assignments and capacity controls."
      legacyFeature="Animazione"
      plannedCapabilities={[
        "Create recurring programs with seasonal templates",
        "Allocate staff and resources with availability checks",
        "Publish participant lists and integrate with guest messaging",
      ]}
      title="Entertainment & Activities"
    />
  </>
);

export default EntertainmentPage;
