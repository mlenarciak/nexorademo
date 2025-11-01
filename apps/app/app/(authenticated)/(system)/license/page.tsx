import type { Metadata } from "next";
import { FeaturePlaceholder } from "../../components/feature-placeholder";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "License Management | Nexora",
  description:
    "Track hospitality licenses and compliance periods while the modern Nexora workflow is under construction.",
};

const LicensePage = () => (
  <>
    <Header page="License Management" pages={["System"]} />
    <FeaturePlaceholder
      description="Centralize license numbers, renewal reminders, and compliance alerts across every managed property."
      legacyFeature="Licenza"
      plannedCapabilities={[
        "Store license metadata per property and brand",
        "Surface renewal deadlines with proactive reminders",
        "Attach compliance documents for quick auditing",
      ]}
      title="License Management"
    />
  </>
);

export default LicensePage;
