import type { Metadata } from "next";
import { FeaturePlaceholder } from "../../components/feature-placeholder";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Access Control | Nexora",
  description:
    "Configure role-based permissions while the advanced authorization center is being developed.",
};

const AccessControlPage = () => (
  <>
    <Header page="Access Control" pages={["System"]} />
    <FeaturePlaceholder
      description="Define who can view, edit, or approve actions at the organization, property, and departmental levels."
      legacyFeature="Accessi"
      plannedCapabilities={[
        "Role templates for front desk, housekeeping, and finance teams",
        "Custom permission scopes down to action-level granularity",
        "Audit trail for changes to user access",
      ]}
      title="Access Control"
    />
  </>
);

export default AccessControlPage;
