import type { Metadata } from "next";
import AccountingClient from "./client";

export const metadata: Metadata = {
  title: "Accounting | Nexora",
  description:
    "Handle fiscal compliance and financial reconciliation while the accounting suite is recreated.",
};

export default function Page() {
  return <AccountingClient />;
}
