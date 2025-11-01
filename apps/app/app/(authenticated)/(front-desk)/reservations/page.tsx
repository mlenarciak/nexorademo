import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { Checkbox } from "@repo/design-system/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/design-system/components/ui/dropdown-menu";
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
import { cn } from "@repo/design-system/lib/utils";
import {
  Columns3,
  Download,
  Filter,
  Link2,
  ListChecks,
  Megaphone,
  MessageCircle,
  Plus,
  Search,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Reservations | Nexora",
  description:
    "Manage bookings, stays, and check-in/out workflows for hospitality properties.",
};

const shortcuts = [
  { id: "arrivals", label: "Arrivi", count: 18 },
  { id: "stays", label: "Permanenze", count: 142 },
  { id: "departures", label: "Partenze", count: 21 },
  { id: "all", label: "Tutte le prenotazioni", count: 2995, isActive: true },
  { id: "no-stay", label: "Senza soggiorno", count: 6 },
  { id: "cancelled", label: "Annullate", count: 54 },
  { id: "penalty", label: "In attesa di penale", count: 3, tone: "warning" as const },
] as const;

const actionButtons = [
  { id: "filters", label: "Filtri avanzati", icon: Filter, variant: "outline" as const },
  { id: "summary", label: "Riepilogo", icon: ListChecks, variant: "default" as const },
  { id: "export", label: "Esporta", icon: Download, variant: "secondary" as const },
  { id: "newsletter", label: "Newsletter", icon: Megaphone, variant: "outline" as const },
  { id: "messages", label: "Messaggi", icon: MessageCircle, variant: "outline" as const },
  { id: "columns", label: "Colonne", icon: Columns3, variant: "outline" as const },
  { id: "advanced", label: "Avanzate", icon: Link2, variant: "ghost" as const },
] as const;

const reservationRows = [
  {
    id: 1,
    status: { code: "CH", label: "Check-in", tone: "success" as const },
    confirmed: true,
    arrival: "Mer 18 Giu 2025 17:00",
    departure: "Mer 25 Giu 2025 10:00",
    nights: 7,
    pax: 2,
    guest: "Keusen Giulia",
    room: "106",
    category: "Nature Sea View",
    ratePlan: "Bed & Breakfast",
    paid: "EUR 1.098,10",
    agency: "Studio Coach",
    balanceGuest: "EUR 923,30",
    balanceBooker: "EUR 0,00",
    deposit: "--",
    total: {
      amount: "EUR 2.021,40",
      breakdown: ["Rate: EUR 1.846,40", "Extras: EUR 175,00"],
    },
  },
  {
    id: 2,
    status: { code: "CCA", label: "Carta in verifica", tone: "warning" as const },
    confirmed: false,
    arrival: "Mer 18 Giu 2025 17:00",
    departure: "Mer 25 Giu 2025 10:00",
    nights: 7,
    pax: 0,
    guest: "Keusen Mario Patrick",
    room: "107",
    category: "Nature Sea View",
    ratePlan: "Bed & Breakfast",
    paid: "EUR 1.385,00",
    agency: "-",
    balanceGuest: "EUR -1.385,00",
    balanceBooker: "EUR 0,00",
    deposit: "--",
    total: {
      amount: "EUR 0,00",
      breakdown: ["Rate: EUR 0,00", "Extras: EUR 0,00"],
    },
  },
  {
    id: 3,
    status: { code: "CH", label: "Check-in", tone: "success" as const },
    confirmed: true,
    arrival: "Mer 18 Giu 2025 17:00",
    departure: "Mer 25 Giu 2025 10:00",
    nights: 7,
    pax: 1,
    guest: "Keusen Peter",
    room: "111",
    category: "Nature Sea View",
    ratePlan: "Bed & Breakfast",
    paid: "EUR 959,64",
    agency: "-",
    balanceGuest: "EUR 0,00",
    balanceBooker: "EUR 0,00",
    deposit: "--",
    total: {
      amount: "EUR 959,64",
      breakdown: ["Rate: EUR 784,64", "Extras: EUR 175,00"],
    },
  },
  {
    id: 4,
    status: { code: "SC", label: "Soggiorno Confermato", tone: "info" as const },
    confirmed: true,
    arrival: "Sab 14 Giu 2025 17:00",
    departure: "Sab 21 Giu 2025 10:00",
    nights: 7,
    pax: 3,
    guest: "Monica Danovaro Monica",
    room: "408",
    category: "Classic 5",
    ratePlan: "FB Secret",
    paid: "EUR 1.685,07",
    agency: "-",
    balanceGuest: "EUR 0,00",
    balanceBooker: "EUR 0,00",
    deposit: "--",
    total: {
      amount: "EUR 1.685,07",
      breakdown: ["Rate: EUR 1.170,07", "Extras: EUR 515,00"],
    },
  },
  {
    id: 5,
    status: { code: "CH", label: "Check-in", tone: "success" as const },
    confirmed: true,
    arrival: "Lun 08 Set 2025 17:00",
    departure: "Lun 08 Set 2025 10:00",
    nights: 4,
    pax: 2,
    guest: "Nicola Fluchter",
    room: "120",
    category: "Nature Sea View",
    ratePlan: "FB Secret",
    paid: "EUR 787,41",
    agency: "-",
    balanceGuest: "EUR 0,00",
    balanceBooker: "EUR 0,00",
    deposit: "--",
    total: {
      amount: "EUR 787,41",
      breakdown: ["Rate: EUR 687,41", "Extras: EUR 100,00"],
    },
  },
] as const;

const ReservationsPage = () => (
  <>
    <Header page="Reservations" pages={["Front Desk"]} />
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div className="grid gap-6 xl:grid-cols-[240px_1fr]">
        <Card className="h-full border-dashed border-primary/30 bg-primary/5 shadow-none">
          <CardHeader>
            <CardTitle className="text-sm">Scorciatoie</CardTitle>
            <CardDescription>
              Seleziona un cluster di prenotazioni ereditato dalla versione precedente.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex h-full flex-col gap-4">
            <nav className="flex flex-col gap-1">
              {shortcuts.map((shortcut) => (
                <Button
                  key={shortcut.id}
                  className={cn(
                    "justify-between rounded-lg",
                    shortcut.isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
                  )}
                  size="sm"
                  variant={shortcut.isActive ? "default" : "ghost"}
                >
                  <span>
                    {shortcut.label}
                    <Badge
                      variant={shortcut.isActive ? "secondary" : "outline"}
                      className={cn(
                        "ml-2",
                        shortcut.tone === "warning" &&
                          "border-amber-500 text-amber-700 dark:text-amber-200"
                      )}
                    >
                      {shortcut.count}
                    </Badge>
                  </span>
                </Button>
              ))}
            </nav>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="mt-auto gap-2 rounded-lg shadow-sm">
                  <Plus className="h-4 w-4" />
                  Nuova prenotazione
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuLabel className="text-xs uppercase tracking-wide text-primary">
                  Preventivi
                </DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="/reservations/new/quote">+ Preventivo</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>+ Preventivo senza soggiorno</DropdownMenuItem>
                <DropdownMenuItem>+ Preventivo ristorante</DropdownMenuItem>
                <DropdownMenuItem>+ Preventivo di gruppo</DropdownMenuItem>
                <DropdownMenuItem>
                  + Preventivo di gruppo camere a scelta
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs uppercase tracking-wide text-primary">
                  Prenotazioni
                </DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="/reservations/new/booking">+ Prenotazione</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>+ Prenotazione di gruppo</DropdownMenuItem>
                <DropdownMenuItem>+ Prenotazione senza soggiorno</DropdownMenuItem>
                <DropdownMenuItem>+ Prenotazione ristorante</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="space-y-4 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-xl">Tutte le prenotazioni</h2>
                  <Badge variant="outline">Mock data</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Panorama operativo per arrivi, partenze e riconciliazione economica.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
              <div className="relative w-full xl:max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" placeholder="Ricerca nome o note" />
              </div>
              <div className="flex flex-wrap gap-2 xl:ml-auto">
                {actionButtons.map((action) => (
                  <Button
                    key={action.id}
                    size="sm"
                    variant={action.variant}
                    className="gap-2"
                  >
                    <action.icon className="h-4 w-4" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border bg-muted/10 p-4">
              <p className="font-semibold text-sm text-muted-foreground">
                Parametri di ricerca
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• data_inizio: 01/11/2025</li>
                <li>• data_fine: 01/11/2025</li>
                <li>• risultati_pagina: 60</li>
                <li>• where: Tutte le proprietà</li>
                <li>• tipo prenotazione: Attiva</li>
                <li>• raggruppa: No</li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>
                  pagina <strong>1</strong> di <strong>50</strong>
                </span>
                <span>Risultati per pagina</span>
                <Select defaultValue="60">
                  <SelectTrigger className="h-7 w-[90px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="60">60</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <span className="font-medium">2995 risultati di 2995 totali</span>
            </div>

            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">
                      <Checkbox aria-label="Seleziona tutte le prenotazioni" />
                    </TableHead>
                    <TableHead className="w-12 text-center">Num.</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead className="text-center">Confermato</TableHead>
                    <TableHead>Arrivo</TableHead>
                    <TableHead>Partenza</TableHead>
                    <TableHead className="text-center">Notti</TableHead>
                    <TableHead className="text-center">Ospiti</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Alloggio</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Retta</TableHead>
                    <TableHead>Pagato</TableHead>
                    <TableHead>Agenzia</TableHead>
                    <TableHead>A saldo ospite</TableHead>
                    <TableHead>A saldo prenotante</TableHead>
                    <TableHead>Deposito</TableHead>
                    <TableHead>Totale</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservationRows.map((row) => (
                    <TableRow key={row.id} className="hover:bg-primary/5">
                      <TableCell>
                        <Checkbox aria-label={`Seleziona prenotazione ${row.id}`} />
                      </TableCell>
                      <TableCell className="text-center font-medium">{row.id}</TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "uppercase tracking-wide",
                            row.status.tone === "success" && "bg-emerald-500/10 text-emerald-700",
                            row.status.tone === "warning" && "bg-amber-500/10 text-amber-700",
                            row.status.tone === "info" && "bg-sky-500/10 text-sky-700"
                          )}
                          variant="secondary"
                        >
                          {row.status.code}
                        </Badge>
                        <p className="mt-1 text-xs text-muted-foreground">{row.status.label}</p>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={row.confirmed ? "secondary" : "outline"}>
                          {row.confirmed ? "Si" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{row.arrival}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{row.departure}</p>
                      </TableCell>
                      <TableCell className="text-center">{row.nights}</TableCell>
                      <TableCell className="text-center">{row.pax}</TableCell>
                      <TableCell className="font-medium">{row.guest}</TableCell>
                      <TableCell>{row.room}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.ratePlan}</TableCell>
                      <TableCell>{row.paid}</TableCell>
                      <TableCell>{row.agency}</TableCell>
                      <TableCell
                        className={cn(
                          "font-semibold",
                          row.balanceGuest.includes("-")
                            ? "text-emerald-600"
                            : row.balanceGuest !== "EUR 0,00" && "text-destructive"
                        )}
                      >
                        {row.balanceGuest}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "font-semibold",
                          row.balanceBooker !== "EUR 0,00" && "text-destructive"
                        )}
                      >
                        {row.balanceBooker}
                      </TableCell>
                      <TableCell>{row.deposit}</TableCell>
                      <TableCell>
                        <div className="font-semibold">{row.total.amount}</div>
                        <div className="text-xs text-muted-foreground">
                          {row.total.breakdown.map((line) => (
                            <div key={line}>{line}</div>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </>
);

export default ReservationsPage;
