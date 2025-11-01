import type { Metadata } from "next";
import { FeaturePlaceholder } from "../../components/feature-placeholder";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Release Changelog | Nexora",
  description:
    "Stay informed about Nexora platform updates while the native changelog center is being rebuilt.",
};

const ChangelogPage = () => (
  <>
    <Header page="Release Changelog" pages={["System"]} />
    <FeaturePlaceholder
      description="Provide property staff with a transparent timeline of Nexora releases, feature drops, and incident notes."
      legacyFeature="Changelog Scidoo"
      plannedCapabilities={[
        "Chronological release feed with filtering by module",
        "Property-specific highlights for relevant changes",
        "Export and subscription options for compliance teams",
      ]}
      title="Release Changelog"
    />
  </>
);

export default ChangelogPage;
