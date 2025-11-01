import type { Metadata } from "next";
import { FeaturePlaceholder } from "../../components/feature-placeholder";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Linked Instances | Nexora",
  description:
    "Orchestrate data sharing across sister properties while the cross-instance manager is being modernized.",
};

const LinkedInstancesPage = () => (
  <>
    <Header page="Linked Instances" pages={["Integrations"]} />
    <FeaturePlaceholder
      description="Share availability, guest data, and rate strategies across related properties without duplicating effort."
      legacyFeature="Istanze Collegate"
      plannedCapabilities={[
        "Define hub-and-spoke or peer synchronisation models",
        "Granular controls for which data types replicate",
        "Conflict resolution tools with change history",
      ]}
      title="Linked Instances"
    />
  </>
);

export default LinkedInstancesPage;
