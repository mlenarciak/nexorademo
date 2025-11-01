import type { Metadata } from "next";
import { FeaturePlaceholder } from "../../components/feature-placeholder";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Quotes | Nexora",
  description:
    "Prepare proposals and follow-ups while the quoting workspace is being rebuilt.",
};

const QuotesPage = () => (
  <>
    <Header page="Quotes" pages={["Front Desk"]} />
    <FeaturePlaceholder
      description="Generate professional quotes with dynamic pricing, validity windows, and automated follow-ups."
      legacyFeature="Preventivi"
      plannedCapabilities={[
        "Templated proposals with localized branding and language",
        "Automatic reminders for pending or expiring quotes",
        "Conversion tools to flip approved quotes into reservations",
      ]}
      title="Quotes"
    />
  </>
);

export default QuotesPage;
