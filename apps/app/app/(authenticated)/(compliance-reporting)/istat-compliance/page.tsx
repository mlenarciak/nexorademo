import type { Metadata } from "next";
import { FeaturePlaceholder } from "../../components/feature-placeholder";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "ISTAT & Alloggiati | Nexora",
  description:
    "Submit mandated guest reports while the compliance center is modernized.",
};

const IstatCompliancePage = () => (
  <>
    <Header page="ISTAT & Alloggiati" pages={["Compliance & Reporting"]} />
    <FeaturePlaceholder
      description="Generate and transmit Italian ISTAT occupancy reports and Alloggiati Web declarations directly from Nexora."
      legacyFeature="ISTAT, Alloggiati e I..."
      plannedCapabilities={[
        "Automated report generation with validation before submission",
        "Scheduling for nightly Alloggiati exports and ISTAT periods",
        "Audit history with confirmation receipts and error handling",
      ]}
      title="ISTAT & Alloggiati"
    />
  </>
);

export default IstatCompliancePage;
