"use client";

import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import { Calendar } from "@repo/design-system/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Label } from "@repo/design-system/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/design-system/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/design-system/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/design-system/components/ui/tabs";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import { cn } from "@repo/design-system/lib/utils";
import {
  CalendarDays,
  ChevronDown,
  Download,
  Link2,
  MessageSquare,
  MoreHorizontal,
  PenSquare,
  Plus,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";

const stayOptions = [
  { id: "single", label: "Singolo" },
  { id: "group", label: "Gruppo" },
  { id: "flex-group", label: "Gruppo camere a scelta" },
  { id: "no-stay", label: "Senza soggiorno" },
  { id: "restaurant", label: "Ristorante" },
] as const;

const toolbarActions = [
  { id: "requests", label: "Richieste", icon: MessageSquare },
  { id: "advanced", label: "Avanzate", icon: SlidersHorizontal },
  { id: "bulk", label: "Inserimento multiplo", icon: Plus },
] as const;

const messageTabs = [
  "Messaggi",
  "Note",
  "Design",
  "Statistiche",
  "Alloggi",
  "Altro",
] as const;

const addDays = (date: Date, days: number) =>
  new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

const formatDate = (
  date: Date | undefined,
  options: Intl.DateTimeFormatOptions
) =>
  date
    ? new Intl.DateTimeFormat("it-IT", {
        ...options,
      }).format(date)
    : undefined;

const formatRangeLabel = (range: DateRange | undefined) => {
  const from = formatDate(range?.from, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const to = formatDate(range?.to, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  if (!from || !to) {
    return "Seleziona periodo";
  }

  return `${from} → ${to}`;
};

const QuoteBuilderPage = () => {
  const [stayType, setStayType] = useState<(typeof stayOptions)[number]["id"]>(
    "single"
  );
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date("2025-11-01"),
    to: new Date("2025-11-02"),
  });
  const [activeMessageTab, setActiveMessageTab] =
    useState<(typeof messageTabs)[number]>("Messaggi");
  const formattedScadenza = useMemo(
    () =>
      formatDate(dateRange?.to, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) ?? "Seleziona",
    [dateRange?.to]
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[2fr_1.3fr]">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <CardTitle>Preventivatore</CardTitle>
              <CardDescription>
                Configura periodo, ospiti e richieste prima di generare un
                preventivo personalizzato.
              </CardDescription>
            </div>
            <Badge variant="outline" className="gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              Live Preview
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                Inserisci Ospite <span className="text-destructive">*</span>
              </Label>
              <Input placeholder="Cognome Nome" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                Ditta / Agenzia (opzionale)
              </Label>
              <Input placeholder="Ricerca" />
            </div>
          </div>

          <Tabs
            className="w-full"
            onValueChange={(value) =>
              setStayType(value as (typeof stayOptions)[number]["id"])
            }
            value={stayType}
          >
            <TabsList className="flex flex-wrap justify-start gap-2">
              {stayOptions.map((option) => (
                <TabsTrigger
                  key={option.id}
                  value={option.id}
                  className="rounded-full px-3 py-1 text-sm"
                >
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={stayType} className="mt-4 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <CalendarDays className="h-4 w-4" />
                      {formatRangeLabel(dateRange)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      numberOfMonths={2}
                      selected={dateRange}
                      onSelect={(range) => {
                        if (range?.from && !range.to) {
                          setDateRange({
                            from: range.from,
                            to: addDays(range.from, 1),
                          });
                          return;
                        }
                        setDateRange(range);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <Select defaultValue="2">
                  <SelectTrigger className="w-[80px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 adulto</SelectItem>
                    <SelectItem value="2">2 adulti</SelectItem>
                    <SelectItem value="3">3 adulti</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="0">
                  <SelectTrigger className="w-[80px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 bambini</SelectItem>
                    <SelectItem value="1">1 bambino</SelectItem>
                    <SelectItem value="2">2 bambini</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" variant="outline" className="gap-2">
                  <PenSquare className="h-4 w-4" />
                  Personalizza
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" className="gap-2">
                      <MoreHorizontal className="h-4 w-4" />
                      Azioni
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Azioni rapide</DropdownMenuLabel>
                    <DropdownMenuItem>Mostra tutti i risultati</DropdownMenuItem>
                    <DropdownMenuItem>Carrello proposte</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Duplica richiesta</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center gap-2 rounded-full border border-dashed border-muted-foreground/40 px-3 py-1 text-xs text-muted-foreground">
                  <Checkbox id="omitted" />
                  <Label htmlFor="omitted">Mostra risultati omessi</Label>
                </div>
              </div>

              <div className="rounded-xl border bg-muted/10 p-4">
                <p className="font-medium text-sm text-muted-foreground">
                  Modalità di ricerca
                </p>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-3">
                    <p className="text-sm font-semibold">Ricerca disponibilità</p>
                    <p className="text-xs text-muted-foreground">
                      Filtra camere e tariffe in tempo reale. Supporta blocchi
                      manuali e allotment esterni.
                    </p>
                  </div>
                  <div className="rounded-lg border border-dashed p-3">
                    <p className="text-sm font-semibold">Carrello proposte</p>
                    <p className="text-xs text-muted-foreground">
                      Applica bundle precaricati e pacchetti personalizzati per
                      upsell immediato.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="rounded-xl border bg-background p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">Toolbar operativa</p>
                <p className="text-xs text-muted-foreground">
                  Richieste in sospeso, preferenze ospite e note vengono
                  sincronizzate con CRM.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {toolbarActions.map((action) => (
                  <Button key={action.id} size="sm" variant="outline" className="gap-2">
                    <action.icon className="h-4 w-4" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/30 p-4 text-xs text-muted-foreground">
          <div>
            <p>
              Ultimo aggiornamento richiesta:{" "}
              <span className="font-semibold">Sab 1 Nov 2025 11:52</span>
            </p>
            <p>Operatore: DEV</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="ghost" className="gap-2">
              <Download className="h-4 w-4" />
              Esporta
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Link2 className="h-4 w-4" />
              Condividi
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Comunicazione al cliente</CardTitle>
          <CardDescription>
            Personalizza template, provenienza e visibilità prima dell&apos;invio.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <Select defaultValue="default">
              <SelectTrigger>
                <SelectValue placeholder="Template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Template standard</SelectItem>
                <SelectItem value="followup">Follow-up</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="direct">
              <SelectTrigger>
                <SelectValue placeholder="Provenienza" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="direct">Diretto</SelectItem>
                <SelectItem value="agency">Agenzia</SelectItem>
                <SelectItem value="ota">OTA</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="team">
              <SelectTrigger>
                <SelectValue placeholder="Visibilità personale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="team">Team prenotazioni</SelectItem>
                <SelectItem value="management">Direzione</SelectItem>
                <SelectItem value="private">Privato</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="flex-1 justify-between">
                    Scadenza: {formattedScadenza}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateRange?.to}
                    onSelect={(date) =>
                      setDateRange((current) =>
                        current?.from
                          ? { from: current.from, to: date ?? current.to }
                          : { from: date ?? new Date(), to: date ?? new Date() }
                      )
                    }
                  />
                </PopoverContent>
              </Popover>
              <Select defaultValue="draft">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Stato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Bozza</SelectItem>
                  <SelectItem value="review">In Revisione</SelectItem>
                  <SelectItem value="sent">Inviato</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs
            value={activeMessageTab}
            onValueChange={(value) =>
              setActiveMessageTab(value as (typeof messageTabs)[number])
            }
          >
            <TabsList className="flex flex-wrap justify-start gap-2">
              {messageTabs.map((tab) => (
                <TabsTrigger key={tab} value={tab} className="rounded-full px-3 py-1 text-sm">
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={activeMessageTab} className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Template
                  </Button>
                  <Button variant="outline" size="sm">
                    Anteprima
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  Apri chat
                </Button>
              </div>
              <Textarea
                className="min-h-[220px]"
                defaultValue={`Gentile ,
Sono Dev e ti do il benvenuto al Riva del Sol Beach Resort, nella splendida località di Santa Caterina dello Ionio, in Calabria.

Siamo molto felici di aver ricevuto la tua richiesta di preventivo e in attesa di poterti dare il Benvenuto nel nostro Resort, ti inviamo la nostra migliore proposta.

Cliccando qui sotto trovi l'offerta per il tuo soggiorno.
Basta un click!`}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/30 p-4">
          <div className="text-xs text-muted-foreground">
            <p>
              Crea preventivo ·{" "}
              <span className="font-semibold">
                Creato sabato 1 novembre 11:52 · DEV
              </span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">Preview</Button>
            <Button variant="outline">Salva per dopo</Button>
            <Button className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Invia preventivo
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuoteBuilderPage;
