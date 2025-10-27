import { auth } from "@repo/auth/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

const title = "Nexora - Dashboard";
const description = "Modern hospitality property management";

export const metadata: Metadata = {
  title,
  description,
};

const App = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/sign-in");
  }

  // Redirect to properties page (our main dashboard)
  redirect("/properties");
};

export default App;
