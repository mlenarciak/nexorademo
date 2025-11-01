import type { Metadata } from "next";
import { FeaturePlaceholder } from "../../components/feature-placeholder";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Cards & Credentials | Nexora",
  description:
    "Manage guest cards, RFID credentials, and loyalty tokens while the new credential vault is being prepared.",
};

const CardsPage = () => (
  <>
    <Header page="Cards & Credentials" pages={["Integrations"]} />
    <FeaturePlaceholder
      description="Issue and manage access cards for rooms, wellness centers, and partner services directly from Nexora."
      legacyFeature="Tessere"
      plannedCapabilities={[
        "Register and encode RFID or magnetic cards",
        "Assign access scopes across property zones",
        "Track lifecycle events such as issuance, loss, or deactivation",
      ]}
      title="Cards & Credentials"
    />
  </>
);

export default CardsPage;
