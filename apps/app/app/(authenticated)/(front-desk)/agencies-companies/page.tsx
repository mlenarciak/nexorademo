import type { Metadata } from "next";
import { FeaturePlaceholder } from "../../components/feature-placeholder";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Agencies & Companies | Nexora",
  description:
    "Manage B2B partners while the account management workspace is being rebuilt.",
};

const AgenciesAndCompaniesPage = () => (
  <>
    <Header page="Agencies & Companies" pages={["Front Desk"]} />
    <FeaturePlaceholder
      description="Track partner agencies, corporate accounts, negotiated rates, and production goals in one workspace."
      legacyFeature="Agenzie e Aziende"
      plannedCapabilities={[
        "Account profiles with contacts, contracts, and negotiated rates",
        "Production dashboards with pickup, revenue, and credit status",
        "Integration hooks for invoice routing and credit control",
      ]}
      title="Agencies & Companies"
    />
  </>
);

export default AgenciesAndCompaniesPage;
