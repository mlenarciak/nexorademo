"use client";

import { useMemo, useState } from "react";
import { Header } from "../../components/header";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
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
import { ScrollArea } from "@repo/design-system/components/ui/scroll-area";
import { Separator } from "@repo/design-system/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter as TFoot,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/design-system/components/ui/table";
import { Calendar } from "@repo/design-system/components/ui/calendar";
import { cn } from "@repo/design-system/lib/utils";
import {
  ArrowUpDown,
  CalendarDays,
  FileUp,
  Info,
  Download,
  Plus,
  Send,
  Settings2,
  Trash2,
} from "lucide-react";
import type { DateRange } from "react-day-picker";

type MenuSection = {
  label: string;
  items: string[];
};

const menu: MenuSection[] = [
  {
    label: "Documenti Emessi",
    items: [
      "Fatture",
      "Note di Credito",
      "Scontrini",
      "Proforma",
      "Tutti (Fiscale)",
      "Tutti",
      "Corrispettivi",
    ],
  },
  {
    label: "Pagamenti",
    items: [
      "Entrate",
      "Uscite",
      "Tutti",
      "Fiscale",
      "Anticipi Aperti",
      "Anticipi Chiusi",
    ],
  },
  {
    label: "Sospesi",
    items: [
      "Prenotazioni Da Saldare",
      "Conti Prenotanti Sospesi",
      "Fatture Sospese",
      "Scadenzario",
      "Corrispettivi Sospesi",
      "Proforma Sospesi",
      "Depositi Da Incassare",
    ],
  },
  {
    label: "Avanzate",
    items: ["Chiusure Registratori"],
  },
];

type Doc = {
  id: string;
  numberYear: string;
  emissione: string;
  oggetto: string;
  intestazione: string;
  totale: string;
  corrispettivo: string;
  stato: string;
};

const documentsA: Doc[] = [
  {
    id: "1",
    numberYear: "FATTURA FISCALE N63 R - 2025",
    emissione: "NICOLE (03/09/2025 17:07:55)",
    oggetto: "CAPARRA AGENZIA - SALDO OSPITE",
    intestazione: "2night Spa",
    totale: "516,00 € Immediata",
    corrispettivo: "516,00 €",
    stato: "Pagata",
  },
  {
    id: "2",
    numberYear: "FATTURA FISCALE N64 R - 2025",
    emissione: "LUCA BERLITI (22/10/2025 18:46:44)",
    oggetto: "CAPARRA CONFERMATORIA - SALDO OSPITE",
    intestazione: "Easy Travel Srl",
    totale: "1.170,00 € Immediata",
    corrispettivo: "1.170,00 €",
    stato: "Consegnata",
  },
  {
    id: "3",
    numberYear: "FATTURA FISCALE N65 R - 2025",
    emissione: "MARTA (17/09/2025 20:04:38)",
    oggetto: "SERVIZI OSPITI",
    intestazione: "Alessio Commodaro",
    totale: "105,74 € Immediata",
    corrispettivo: "405,74 €",
    stato: "Pagata",
  },
];

const documentsB: Doc[] = [
  {
    id: "11",
    numberYear: "FATTURA FISCALE N14 I - 2025",
    emissione: "LUCA BERLITI (08/09/2025 16:09:38)",
    oggetto: "SALDO OSPITE",
    intestazione: "Booking.com B.V.",
    totale: "718,20 € Immediata",
    corrispettivo: "718,20 €",
    stato: "Pagata",
  },
  {
    id: "12",
    numberYear: "FATTURA FISCALE N15 I - 2025",
    emissione: "LUCA BERLITI (08/09/2025 16:25:33)",
    oggetto: "SALDO AGENZIA",
    intestazione: "Booking.com B.V.",
    totale: "177,12 €",
    corrispettivo: "177,12 €",
    stato: "Consegnata",
  },
];

const formatRangeLabel = (range: DateRange | undefined) => {
  const format = (date?: Date) =>
    date
      ? new Intl.DateTimeFormat("it-IT", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(date)
      : undefined;
  const from = format(range?.from);
  const to = format(range?.to);
  if (!from || !to) return "Periodo";
  return `${from} → ${to}`;
};

export default function AccountingClient() {
  const [activeItem, setActiveItem] = useState<string>("Fatture");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date("2025-09-01"),
    to: new Date("2025-11-01"),
  });

  const totalDocs = useMemo(
    () => documentsA.length + documentsB.length,
    []
  );

  return (
    <>
      <Header page="Accounting" pages={["Compliance & Reporting"]} />

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Inner menu */}
        <aside className="hidden lg:block">
          <Card className="sticky top-16 overflow-hidden shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Contabilità</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-14rem)]">
                <nav className="p-3">
                  {menu.map((section) => (
                    <div key={section.label} className="mb-4">
                      <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {section.label}
                      </p>
                      <div className="grid gap-1">
                        {section.items.map((item) => {
                          const active = activeItem === item;
                          return (
                            <button
                              key={item}
                              className={cn(
                                "text-left rounded-md px-2.5 py-2 text-sm transition-colors",
                                active
                                  ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                                  : "hover:bg-muted"
                              )}
                              onClick={() => setActiveItem(item)}
                            >
                              <span className="truncate">{item}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </nav>
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t bg-muted/50 py-2 text-xs text-muted-foreground">
              <span>{activeItem}</span>
              <span className="inline-flex items-center gap-1">
                <Settings2 className="h-3.5 w-3.5" /> Preferenze
              </span>
            </CardFooter>
          </Card>
        </aside>

        {/* Main content */}
        <section className="space-y-4">
          {/* Toolbar */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <CardTitle className="text-base font-semibold">
                  {activeItem}
                </CardTitle>
                <Badge variant="outline" className="gap-1">
                  <span className="text-xs text-muted-foreground">{totalDocs} Documenti</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2 md:grid-cols-[1.2fr_.9fr_.9fr_auto_auto_auto_auto]">
                <Input placeholder="Numero o Intestazione" className="h-9" />
                <Select defaultValue="mass">
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Ricerca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mass">Ricerca Massiva</SelectItem>
                    <SelectItem value="exact">Ricerca Esatta</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Numerazione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutte le Numerazioni</SelectItem>
                    <SelectItem value="rcp">Reception</SelectItem>
                    <SelectItem value="inf">Infopoint</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Azienda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutte le Aziende</SelectItem>
                    <SelectItem value="lovely">Lovely Srl</SelectItem>
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-9 w-full justify-start gap-2">
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
                      onSelect={(range) => setDateRange(range ?? dateRange)}
                    />
                  </PopoverContent>
                </Popover>

                <Select defaultValue="00:00">
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Inizio" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }).map((_, i) => {
                      const t = `${String(i).padStart(2, "0")}:00`;
                      return (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <Select defaultValue="23:59">
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Fine" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }).map((_, i) => {
                      const t = `${String(i).padStart(2, "0")}:59`;
                      return (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <Button className="h-9">Ricerca</Button>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Button className="h-8 gap-2 bg-emerald-600 text-white hover:bg-emerald-700">
                  <Plus className="h-4 w-4" /> Documento
                </Button>
                <Button className="h-8 gap-2 bg-sky-600 text-white hover:bg-sky-700">
                  <Download className="h-4 w-4" /> Esporta
                </Button>
                <Button className="h-8 gap-2 bg-indigo-600 text-white hover:bg-indigo-700">
                  <Send className="h-4 w-4" /> Invio Massivo
                </Button>
                <Button variant="outline" className="h-8 gap-2">
                  <Info className="h-4 w-4" /> Stato
                </Button>
                <Button variant="secondary" className="h-8 gap-2">
                  <FileUp className="h-4 w-4" /> Importa XML
                </Button>

                <div className="ml-auto hidden items-center gap-3 md:flex">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{totalDocs}</span>{" "}
                    Documenti — Totale: <span className="font-semibold text-sky-600">47.797,89 €</span>
                  </p>
                  <Button size="sm" variant="ghost">
                    Visualizza Dettaglio
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents list */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Lovely Srl - Reception [R]</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8"></TableHead>
                    <TableHead className="min-w-[220px]">
                      NUM/ANNO <ArrowUpDown className="ml-1 inline h-3.5 w-3.5" />
                    </TableHead>
                    <TableHead className="min-w-[180px]">EMISSIONE</TableHead>
                    <TableHead className="min-w-[220px]">OGGETTO</TableHead>
                    <TableHead className="min-w-[220px]">INTESTAZIONE</TableHead>
                    <TableHead className="min-w-[160px]">TOTALE</TableHead>
                    <TableHead className="min-w-[160px]">CORRISP.</TableHead>
                    <TableHead className="min-w-[120px]">STATO</TableHead>
                    <TableHead className="w-28 text-right">AZIONI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documentsA.map((d) => (
                    <TableRow key={d.id} className="group">
                      <TableCell>
                        <input type="checkbox" className="accent-primary" />
                      </TableCell>
                      <TableCell className="font-medium">{d.numberYear}</TableCell>
                      <TableCell className="text-muted-foreground">{d.emissione}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon-sm" variant="ghost" className="h-6 w-6 p-0">
                            <Info className="h-3.5 w-3.5" />
                          </Button>
                          <span className="underline decoration-dotted underline-offset-2">{d.oggetto}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="underline decoration-dotted underline-offset-2">
                          {d.intestazione}
                        </span>
                      </TableCell>
                      <TableCell>{d.totale}</TableCell>
                      <TableCell>{d.corrispettivo}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                          {d.stato}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1 opacity-70 transition-opacity group-hover:opacity-100">
                          <Button size="icon" variant="outline" className="h-7 w-7">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="icon" variant="destructive" className="h-7 w-7">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TFoot>
                  <TableRow>
                    <TableCell colSpan={5} className="text-right font-semibold">
                      TOTALE
                    </TableCell>
                    <TableCell className="font-semibold">3.786,64€</TableCell>
                    <TableCell className="font-semibold">3.786,64€</TableCell>
                    <TableCell colSpan={2}></TableCell>
                  </TableRow>
                </TFoot>
                <TableCaption>Elenco documenti filtrati per periodo e numerazione.</TableCaption>
              </Table>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Lovely Srl - Infopoint [I]</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8"></TableHead>
                    <TableHead className="min-w-[220px]">
                      NUM/ANNO <ArrowUpDown className="ml-1 inline h-3.5 w-3.5" />
                    </TableHead>
                    <TableHead className="min-w-[180px]">EMISSIONE</TableHead>
                    <TableHead className="min-w-[220px]">OGGETTO</TableHead>
                    <TableHead className="min-w-[220px]">INTESTAZIONE</TableHead>
                    <TableHead className="min-w-[160px]">TOTALE</TableHead>
                    <TableHead className="min-w-[160px]">CORRISP.</TableHead>
                    <TableHead className="min-w-[120px]">STATO</TableHead>
                    <TableHead className="w-28 text-right">AZIONI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documentsB.map((d) => (
                    <TableRow key={d.id} className="group">
                      <TableCell>
                        <input type="checkbox" className="accent-primary" />
                      </TableCell>
                      <TableCell className="font-medium">{d.numberYear}</TableCell>
                      <TableCell className="text-muted-foreground">{d.emissione}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon-sm" variant="ghost" className="h-6 w-6 p-0">
                            <Info className="h-3.5 w-3.5" />
                          </Button>
                          <span className="underline decoration-dotted underline-offset-2">{d.oggetto}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="underline decoration-dotted underline-offset-2">
                          {d.intestazione}
                        </span>
                      </TableCell>
                      <TableCell>{d.totale}</TableCell>
                      <TableCell>{d.corrispettivo}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                          {d.stato}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1 opacity-70 transition-opacity group-hover:opacity-100">
                          <Button size="icon" variant="outline" className="h-7 w-7">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="icon" variant="destructive" className="h-7 w-7">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TFoot>
                  <TableRow>
                    <TableCell colSpan={5} className="text-right font-semibold">
                      TOTALE
                    </TableCell>
                    <TableCell className="font-semibold">5.120,84€</TableCell>
                    <TableCell className="font-semibold">5.120,84€</TableCell>
                    <TableCell colSpan={2}></TableCell>
                  </TableRow>
                </TFoot>
              </Table>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}

