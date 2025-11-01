import type { Metadata } from "next";
import { FeaturePlaceholder } from "../../components/feature-placeholder";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Company Switcher | Nexora",
  description:
    "Manage cross-brand access while the advanced organization switcher experience is under construction.",
};

const CompanySwitchPage = () => (
  <>
    <Header page="Company Switcher" pages={["System"]} />
    <FeaturePlaceholder
      description="Quickly change between corporate entities or properties without losing context or state."
      legacyFeature="Cambia azienda"
      plannedCapabilities={[
        "Global command palette integration for rapid switching",
        "Context-aware reminders about pending actions in other properties",
        "Role-based access rules to prevent unauthorized switching",
      ]}
      title="Company Switcher"
    />
  </>
);

export default CompanySwitchPage;
