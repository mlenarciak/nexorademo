import type { Metadata } from "next";
import { FeaturePlaceholder } from "../../components/feature-placeholder";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Guest Directory | Nexora",
  description:
    "Maintain guest profiles and history while the modern guest CRM is being assembled.",
};

const GuestsPage = () => (
  <>
    <Header page="Guest Directory" pages={["Front Desk"]} />
    <FeaturePlaceholder
      description="Access comprehensive guest profiles, stay history, preferences, and communication logs in one place."
      legacyFeature="Ospiti"
      plannedCapabilities={[
        "Unified profile with reservation and billing history",
        "Preference tracking for personalization and upsells",
        "GDPR-compliant data retention and export tools",
      ]}
      title="Guest Directory"
    />
  </>
);

export default GuestsPage;
