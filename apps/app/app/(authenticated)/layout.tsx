import { currentUser } from "@repo/auth/server";
import { SidebarProvider } from "@repo/design-system/components/ui/sidebar";
import { showBetaFeature } from "@repo/feature-flags";
import { secure } from "@repo/security";
import type { ReactNode } from "react";
import { env } from "@/env";
import { NotificationsProvider } from "./components/notifications-provider";
import { GlobalSidebar } from "./components/sidebar";

type AppLayoutProperties = {
  readonly children: ReactNode;
};

type ClerkUser = Awaited<ReturnType<typeof currentUser>>;

const AppLayout = async ({ children }: AppLayoutProperties) => {
  if (env.ARCJET_KEY) {
    await secure(["CATEGORY:PREVIEW"]);
  }

  const betaFeature = await showBetaFeature();

  // Try to get user, but don't require it for development
  let user: ClerkUser = null;
  try {
    user = await currentUser();
  } catch {
    // Clerk not configured or error - allow development mode
  }

  return (
    <NotificationsProvider userId={user?.id || "demo"}>
      <SidebarProvider>
        <GlobalSidebar>
          {!user && (
            <div className="m-4 rounded-lg border-2 border-amber-500 bg-amber-50 p-3 text-center dark:bg-amber-950">
              <p className="font-semibold text-amber-800 text-sm dark:text-amber-200">
                ⚠️ Development Mode - Clerk not authenticated
              </p>
            </div>
          )}
          {betaFeature && (
            <div className="m-4 rounded-full bg-blue-500 p-1.5 text-center text-sm text-white">
              Beta feature now available
            </div>
          )}
          {children}
        </GlobalSidebar>
      </SidebarProvider>
    </NotificationsProvider>
  );
};

export default AppLayout;
