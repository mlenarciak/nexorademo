"use client";

import { OrganizationSwitcher, UserButton } from "@repo/auth/client";
import { ModeToggle } from "@repo/design-system/components/mode-toggle";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/design-system/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/design-system/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@repo/design-system/components/ui/sidebar";
import { cn } from "@repo/design-system/lib/utils";
import { NotificationsTrigger } from "@repo/notifications/components/trigger";
import {
  BarChart3,
  BookOpenIcon,
  Broom,
  Building2,
  CalendarClock,
  CalendarDays,
  ChevronRightIcon,
  FileBarChart,
  FileText,
  Handshake,
  History,
  Home,
  IdCard,
  KeyRound,
  Layers,
  LifeBuoyIcon,
  PartyPopper,
  ScrollText,
  SendIcon,
  Share2,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Search } from "./search";

type GlobalSidebarProperties = {
  readonly children: ReactNode;
};

type NavSubItem = {
  title: string;
  url: string;
};

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: NavSubItem[];
  badge?: string;
  defaultOpen?: boolean;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    title: "Workspace",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Home,
      },
      {
        title: "Properties",
        url: "/properties",
        icon: Building2,
        defaultOpen: true,
        items: [
          {
            title: "All Properties",
            url: "/properties",
          },
          {
            title: "Create Property",
            url: "/properties/new",
          },
        ],
      },
    ],
  },
  {
    title: "Front Desk",
    items: [
      {
        title: "Reservations",
        url: "/reservations",
        icon: CalendarClock,
        badge: "In Dev",
      },
      {
        title: "Quotes",
        url: "/quotes",
        icon: FileText,
        badge: "In Dev",
      },
      {
        title: "Guests",
        url: "/guests",
        icon: Users,
        badge: "In Dev",
      },
      {
        title: "Agencies & Companies",
        url: "/agencies-companies",
        icon: Handshake,
        badge: "In Dev",
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        title: "Housekeeping",
        url: "/housekeeping",
        icon: Broom,
        badge: "In Dev",
      },
      {
        title: "Calendar Events",
        url: "/calendar-events",
        icon: CalendarDays,
        badge: "In Dev",
      },
      {
        title: "Entertainment",
        url: "/entertainment",
        icon: PartyPopper,
        badge: "In Dev",
      },
    ],
  },
  {
    title: "Compliance & Reporting",
    items: [
      {
        title: "ISTAT & Alloggiati",
        url: "/istat-compliance",
        icon: FileBarChart,
        badge: "In Dev",
      },
      {
        title: "Statistics",
        url: "/statistics",
        icon: BarChart3,
        badge: "In Dev",
      },
      {
        title: "Accounting",
        url: "/accounting",
        icon: Wallet,
        badge: "In Dev",
      },
    ],
  },
  {
    title: "Integrations",
    items: [
      {
        title: "Channel Sync",
        url: "/channel-sync",
        icon: Share2,
        badge: "In Dev",
      },
      {
        title: "Linked Instances",
        url: "/linked-instances",
        icon: Layers,
        badge: "In Dev",
      },
      {
        title: "Cards",
        url: "/cards",
        icon: IdCard,
        badge: "In Dev",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "License",
        url: "/license",
        icon: ShieldCheck,
        badge: "In Dev",
      },
      {
        title: "Changelog",
        url: "/changelog",
        icon: History,
        badge: "In Dev",
      },
      {
        title: "Company Switcher",
        url: "/company-switch",
        icon: Building2,
        badge: "In Dev",
      },
      {
        title: "Access Control",
        url: "/access-control",
        icon: KeyRound,
        badge: "In Dev",
      },
      {
        title: "Logs",
        url: "/logs",
        icon: ScrollText,
        badge: "In Dev",
      },
    ],
  },
];

const navSecondary = [
  {
    title: "Documentation",
    url: "/docs",
    icon: BookOpenIcon,
  },
  {
    title: "Support",
    url: "#",
    icon: LifeBuoyIcon,
  },
  {
    title: "Feedback",
    url: "#",
    icon: SendIcon,
  },
];

export const GlobalSidebar = ({ children }: GlobalSidebarProperties) => {
  const sidebar = useSidebar();

  return (
    <>
      <Sidebar variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link className="flex items-center gap-2 px-2 py-3" href="/">
                <Image
                  alt="Nexora"
                  className="hidden h-6 w-auto dark:block"
                  height={24}
                  src="/logos/nexora-white.png"
                  width={120}
                />
                <Image
                  alt="Nexora"
                  className="block h-6 w-auto dark:hidden"
                  height={24}
                  src="/logos/nexora-black.png"
                  width={120}
                />
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <div
                className={cn(
                  "h-[36px] overflow-hidden transition-all [&>div]:w-full",
                  sidebar.open ? "" : "-mx-1"
                )}
              >
                <OrganizationSwitcher
                  afterSelectOrganizationUrl="/"
                  hidePersonal
                />
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <Search />
        <SidebarContent>
          {navGroups.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarMenu>
                {group.items.map((item) => (
                  <Collapsible
                    asChild
                    defaultOpen={item.defaultOpen}
                    key={`${group.title}-${item.title}`}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <Link className="flex items-center gap-2" href={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span className="truncate">{item.title}</span>
                          {item.badge ? (
                            <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                              {item.badge}
                            </span>
                          ) : null}
                        </Link>
                      </SidebarMenuButton>
                      {item.items?.length ? (
                        <>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuAction className="data-[state=open]:rotate-90">
                              <ChevronRightIcon />
                              <span className="sr-only">Toggle</span>
                            </SidebarMenuAction>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild>
                                    <Link href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </>
                      ) : null}
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                {navSecondary.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <UserButton
                appearance={{
                  elements: {
                    rootBox: "flex overflow-hidden w-full",
                    userButtonBox: "flex-row-reverse",
                    userButtonOuterIdentifier: "truncate pl-0",
                  },
                }}
                showName
              />
              <div className="flex shrink-0 items-center gap-px">
                <ModeToggle />
                <Button
                  asChild
                  className="shrink-0"
                  size="icon"
                  variant="ghost"
                >
                  <div className="h-4 w-4">
                    <NotificationsTrigger />
                  </div>
                </Button>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </>
  );
};
