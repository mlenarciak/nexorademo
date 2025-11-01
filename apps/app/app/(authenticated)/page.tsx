import { auth } from "@repo/auth/server";
import { Button } from "@repo/design-system/components/ui/button";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Checkbox } from "@repo/design-system/components/ui/checkbox";
import { Input } from "@repo/design-system/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/design-system/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/design-system/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { cn } from "@repo/design-system/lib/utils";
import {
  AlarmClock,
  ArrowLeftRight,
  Banknote,
  Bookmark,
  CalendarClock,
  CalendarX,
  CheckCircle2,
  ClipboardList,
  FileBarChart,
  FileWarning,
  Gift,
  Hourglass,
  Inbox,
  LogIn,
  LogOut,
  MailX,
  MessageSquare,
  Monitor,
  MoreHorizontal,
  Plus,
  Printer,
  Send,
  Server,
  Settings2,
  Sparkles,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
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

  const utilityActions = [
    { label: "Sessione", icon: LogIn },
    { label: "Postazione", icon: Monitor },
    { label: "Stampe", icon: Printer },
    { label: "Prima Nota", icon: ClipboardList },
  ] as const;

  const serviceShortcuts = [
    { label: "Messaggi", icon: MessageSquare },
    { label: "Server Posta", icon: Server },
    { label: "Manutenzione", icon: Wrench },
    { label: "Pulizie", icon: Sparkles },
    { label: "Report Giornaliero", icon: FileBarChart },
    { label: "Promemoria Prodotti", icon: AlarmClock },
    { label: "Compleanni", icon: Gift },
    { label: "Altro", icon: Settings2 },
  ] as const;

  const stayStatuses = [
    { id: "arrivi", label: "Arrivi", icon: LogIn, count: 14, variant: "active" as const },
    { id: "partenze", label: "Partenze", icon: LogOut, count: 9 },
    { id: "presenze", label: "Presenze", icon: Users, count: 248 },
    { id: "opzionate", label: "Opzionate", icon: Bookmark, count: 6 },
    { id: "pending", label: "In attesa di conferma", icon: Hourglass, count: 5 },
    {
      id: "invoices",
      label: "Fatture da inviare",
      icon: FileWarning,
      count: 1,
      tone: "alert" as const,
    },
    { id: "be", label: "BE/CM mov.", icon: ArrowLeftRight, count: 2 },
    { id: "depositi", label: "Depositi da saldare", icon: Banknote, count: 3 },
    { id: "altro", label: "Altro", icon: Settings2 },
  ];

  const reservationRows = [
    {
      id: "res-1",
      guest: "Fam. Rossi",
      time: "12:30",
      accommodation: "Suite Mare",
      rate: "€320,00",
      balance: "€0,00",
      party: 3,
    },
    {
      id: "res-2",
      guest: "Hotel Consulting SRL",
      time: "15:45",
      accommodation: "Appartamento Deluxe",
      rate: "€510,00",
      balance: "€210,00",
      party: 4,
    },
    {
      id: "res-3",
      guest: "Bianchi Travel",
      time: "09:00",
      accommodation: "Camera Standard",
      rate: "€180,00",
      balance: "€0,00",
      party: 2,
    },
  ];

  const quoteStatuses = [
    { id: "read", label: "Da leggere", icon: Inbox, count: 12, variant: "active" as const },
    { id: "manage", label: "Da gestire", icon: Settings2, count: 3, tone: "warning" as const },
    { id: "sent", label: "Inviati", icon: Send, count: 1 },
    { id: "unopened", label: "Non aperti", icon: MailX, count: 4 },
    { id: "expired", label: "Scaduti", icon: CalendarX, count: 2, tone: "alert" as const },
    { id: "accepted", label: "Accettati cliente", icon: UserCheck, count: 5 },
    { id: "confirmed", label: "Confermati", icon: CheckCircle2, count: 2 },
    { id: "other", label: "Altro", icon: MoreHorizontal, count: 23 },
  ];

  const quoteRows = [
    {
      id: "quote-1",
      client: "Studio Verdi",
      requester: "Maria Verdi",
      province: "MI",
      property: "Resort Lago Blu",
      createdAt: "30/10/2025",
    },
    {
      id: "quote-2",
      client: "Gruppo Aurora",
      requester: "Luca Bianchi",
      province: "RM",
      property: "Hotel Castello",
      createdAt: "29/10/2025",
    },
    {
      id: "quote-3",
      client: "Eventi Mediterranei",
      requester: "Chiara Leone",
      province: "BA",
      property: "Villaggio Stella Marina",
      createdAt: "28/10/2025",
    },
  ];

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
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        <section className="flex flex-wrap items-center gap-2">
          {utilityActions.map((action) => (
            <Button
              key={action.label}
              size="sm"
              variant="outline"
              className="gap-2"
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </Button>
          ))}
        </section>

        <div className="grid gap-6 xl:grid-cols-[3fr_2fr]">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Operations Toolkit</CardTitle>
                <CardDescription>
                  Legacy shortcuts disponibili mentre completiamo il redesign.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {serviceShortcuts.map((item) => (
                    <Button
                      key={item.label}
                      variant="outline"
                      className="flex h-full flex-col items-start gap-3 rounded-xl border border-border bg-card p-4 text-left shadow-sm transition hover:border-primary/70 hover:shadow-md"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <item.icon className="h-5 w-5" />
                      </span>
                      <span className="font-semibold">{item.label}</span>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">
                        In sviluppo
                      </span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <CardTitle>Front Desk Control</CardTitle>
                    <CardDescription>
                      Monitor arrivi, partenze e saldi in tempo reale.
                    </CardDescription>
                  </div>
                  <Button size="sm" variant="outline" className="gap-2">
                    <CalendarClock className="h-4 w-4" />
                    Oggi
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
                  <div className="flex min-w-[140px] flex-col items-center justify-center gap-1 rounded-2xl border border-primary/30 bg-primary/5 p-4 text-center shadow-sm">
                    <span className="text-sm font-semibold uppercase text-muted-foreground">
                      Sabato
                    </span>
                    <span className="text-5xl font-bold text-primary">01</span>
                    <span className="text-xs text-muted-foreground">
                      Novembre 2025
                    </span>
                  </div>
                  <div className="grid flex-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                    {stayStatuses.map((status) => (
                      <div
                        key={status.id}
                        className={cn(
                          "flex min-h-[84px] items-center justify-between rounded-xl border bg-card p-4 text-left shadow-sm transition hover:border-primary/70 hover:shadow-md",
                          status.variant === "active" &&
                            "border-primary bg-primary/10",
                          status.tone === "alert" &&
                            "border-destructive/60 bg-destructive/5"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground",
                              status.variant === "active" &&
                                "bg-primary text-primary-foreground",
                              status.tone === "alert" &&
                                "bg-destructive/20 text-destructive"
                            )}
                          >
                            <status.icon className="h-5 w-5" />
                          </span>
                          <span className="text-sm font-medium">
                            {status.label}
                          </span>
                        </div>
                        {status.count !== undefined ? (
                          <Badge
                            variant={
                              status.tone === "alert"
                                ? "destructive"
                                : status.variant === "active"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {status.count}
                          </Badge>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 rounded-xl border bg-muted/10 p-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
                    <Input
                      className="min-w-[200px] flex-1"
                      placeholder="Ricerca"
                    />
                    <Select defaultValue="row">
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Intera riga" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="row">Intera riga</SelectItem>
                        <SelectItem value="guest">Ospiti</SelectItem>
                        <SelectItem value="balance">Saldi aperti</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-2 lg:ml-auto">
                      <Button size="sm" variant="outline">
                        Funzioni
                      </Button>
                      <Button size="sm" variant="outline">
                        Stampe
                      </Button>
                      <Button size="sm" variant="outline">
                        Messaggi
                      </Button>
                      <Button size="sm" variant="outline">
                        Conti da emettere
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-lg border bg-background">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-10">
                            <Checkbox aria-label="Seleziona tutte le prenotazioni" />
                          </TableHead>
                          <TableHead>Cliente</TableHead>
                          <TableHead>Orario</TableHead>
                          <TableHead>Alloggio</TableHead>
                          <TableHead>Rette</TableHead>
                          <TableHead>Da saldare</TableHead>
                          <TableHead className="text-right">Ospiti</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reservationRows.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>
                              <Checkbox
                                aria-label={`Seleziona ${row.guest}`}
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              {row.guest}
                            </TableCell>
                            <TableCell>{row.time}</TableCell>
                            <TableCell>{row.accommodation}</TableCell>
                            <TableCell>{row.rate}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  row.balance === "€0,00"
                                    ? "secondary"
                                    : "destructive"
                                }
                              >
                                {row.balance}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                              {row.party}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <CardTitle>Preventivi</CardTitle>
                    <CardDescription>
                      Pipeline quote della versione precedente ancora in rollout.
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Preventivo prenotazione
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Printer className="h-4 w-4" />
                      Stampante fiscale
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2 sm:grid-cols-2">
                  {quoteStatuses.map((status) => (
                    <div
                      key={status.id}
                      className={cn(
                        "flex items-center justify-between rounded-xl border bg-card p-3 text-left shadow-sm transition hover:border-primary/70 hover:shadow-md",
                        status.variant === "active" &&
                          "border-primary bg-primary/10",
                        status.tone === "alert" &&
                          "border-destructive/60 bg-destructive/5",
                        status.tone === "warning" &&
                          "border-amber-500/60 bg-amber-50 dark:bg-amber-950"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground",
                            status.variant === "active" &&
                              "bg-primary text-primary-foreground",
                            status.tone === "alert" &&
                              "bg-destructive/20 text-destructive",
                            status.tone === "warning" &&
                              "bg-amber-500/20 text-amber-900 dark:text-amber-200"
                          )}
                        >
                          <status.icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-medium">
                          {status.label}
                        </span>
                      </div>
                      {status.count !== undefined ? (
                        <Badge
                          variant={
                            status.tone === "alert"
                              ? "destructive"
                              : status.variant === "active"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {status.count}
                        </Badge>
                      ) : null}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <Input
                    className="min-w-[220px] sm:flex-1"
                    placeholder="Ricerca prenotazione"
                  />
                  <div className="flex gap-2 sm:justify-end">
                    <Button size="sm" variant="outline">
                      Funzioni
                    </Button>
                    <Button size="sm" variant="outline">
                      Filtri
                    </Button>
                  </div>
                </div>

                <div className="overflow-hidden rounded-lg border bg-background">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Prenotante</TableHead>
                        <TableHead>Prov.</TableHead>
                        <TableHead>Struttura</TableHead>
                        <TableHead>Creato</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quoteRows.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell className="font-medium">
                            {row.client}
                          </TableCell>
                          <TableCell>{row.requester}</TableCell>
                          <TableCell>{row.province}</TableCell>
                          <TableCell>{row.property}</TableCell>
                          <TableCell>{row.createdAt}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
