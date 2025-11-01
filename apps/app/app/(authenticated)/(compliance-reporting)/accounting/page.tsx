import type { Metadata } from "next";
import { FeaturePlaceholder } from "../../components/feature-placeholder";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Accounting | Nexora",
  description:
    "Handle fiscal compliance and financial reconciliation while the accounting suite is recreated.",
};

const AccountingPage = () => (
  <>
    <Header page="Accounting" pages={["Compliance & Reporting"]} />
    <FeaturePlaceholder
      description="Manage invoices, fiscal receipts, and payment reconciliation with integrations for Italian accounting systems."
      legacyFeature="Contabilità"
      plannedCapabilities={[
        "Automated generation of fiscal documents and XML exports",
        "Payment reconciliation across POS, online gateways, and cash",
        "Bridges to TeamSystem and Agenzia Entrate requirements",
      ]}
      title="Accounting"
    />
  </>
);

export default AccountingPage;
