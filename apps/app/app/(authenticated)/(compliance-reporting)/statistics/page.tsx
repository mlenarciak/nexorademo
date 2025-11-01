import type { Metadata } from "next";
import { FeaturePlaceholder } from "../../components/feature-placeholder";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Statistics & Analytics | Nexora",
  description:
    "Track performance metrics while the analytics workbench is being rebuilt.",
};

const StatisticsPage = () => (
  <>
    <Header page="Statistics & Analytics" pages={["Compliance & Reporting"]} />
    <FeaturePlaceholder
      description="Monitor occupancy, revenue, and channel mix with configurable dashboards tailored to hospitality metrics."
      legacyFeature="Statistiche"
      plannedCapabilities={[
        "Prebuilt dashboards for occupancy, ADR, RevPAR, and channel mix",
        "Custom report builder with pivot and cohort analysis",
        "Scheduled exports to spreadsheets or BI tools",
      ]}
      title="Statistics & Analytics"
    />
  </>
);

export default StatisticsPage;
