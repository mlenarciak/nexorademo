import type { Metadata } from "next";
import { FeaturePlaceholder } from "../../components/feature-placeholder";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Channel Sync | Nexora",
  description:
    "Monitor OTA connections and sync status while the channel manager hub is being reimagined.",
};

const ChannelSyncPage = () => (
  <>
    <Header page="Channel Sync" pages={["Integrations"]} />
    <FeaturePlaceholder
      description="Control RoomCloud and direct OTA links from a single pane of glass, with clear sync health indicators."
      legacyFeature="Sinc. Channel"
      plannedCapabilities={[
        "Connection health dashboard with recovery tooling",
        "Mapping assistant for room and rate plans across OTAs",
        "Change log of pushes to each distribution channel",
      ]}
      title="Channel Sync"
    />
  </>
);

export default ChannelSyncPage;
