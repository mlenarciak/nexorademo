import { auth } from "@repo/auth/server";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { Bed, Building2, Calendar, Plus } from "lucide-react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { redirect } from "next/navigation";
import { env } from "@/env";
import { AvatarStack } from "./components/avatar-stack";
import { Cursors } from "./components/cursors";
import { Header } from "./components/header";

const title = "Nexora - Dashboard";
const description = "Modern hospitality property management";

const CollaborationProvider = dynamic(() =>
  import("./components/collaboration-provider").then(
    (mod) => mod.CollaborationProvider
  )
);

export const metadata: Metadata = {
  title,
  description,
};

const App = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/sign-in");
  }

  return (
    <>
      <Header page="Dashboard" pages={["Nexora"]}>
        {env.LIVEBLOCKS_SECRET && (
          <CollaborationProvider orgId={orgId}>
            <AvatarStack />
            <Cursors />
          </CollaborationProvider>
        )}
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Quick Actions */}
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-2xl">Quick Actions</h2>
        </div>

        {/* Action Cards */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Link href="/properties/new">
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                    <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle>New Property</CardTitle>
                    <CardDescription>Add a property</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Property
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/properties">
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900">
                    <Bed className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <CardTitle>Manage Rooms</CardTitle>
                    <CardDescription>Room categories & rooms</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  View Properties
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                  <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle>Availability</CardTitle>
                  <CardDescription>Coming in Phase 2</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full" disabled variant="outline">
                View Calendar
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Overview Area */}
        <div className="min-h-[400px] flex-1 rounded-xl border bg-muted/20 p-8">
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Building2 className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-2xl">Welcome to Nexora</h3>
              <p className="mt-2 max-w-md text-muted-foreground">
                Modern property management for Italian & Brazilian hospitality.
                Get started by creating your first property.
              </p>
            </div>
            <Link href="/properties/new">
              <Button size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Property
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
