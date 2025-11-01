import type { Metadata } from "next";
import { FeaturePlaceholder } from "../../components/feature-placeholder";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "System Logs | Nexora",
  description:
    "Review operational and audit logs while the observability suite is being rebuilt.",
};

const LogsPage = () => (
  <>
    <Header page="System Logs" pages={["System"]} />
    <FeaturePlaceholder
      description="Give administrators and support teams a unified feed of activity across bookings, payments, integrations, and system events."
      legacyFeature="Log"
      plannedCapabilities={[
        "Filter logs by module, user, or property",
        "Export evidence for compliance audits",
        "Forward critical events to external monitoring systems",
      ]}
      title="System Logs"
    />
  </>
);

export default LogsPage;
