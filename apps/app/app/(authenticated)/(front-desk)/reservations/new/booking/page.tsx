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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/design-system/components/ui/table";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import { cn } from "@repo/design-system/lib/utils";
import {
  CalendarDays,
  CreditCard,
  Lock,
  Plus,
  ShieldCheck,
  Ticket,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";

const ledgerRows = [
  {
    item: "Alloggio - Suite Mare 106",
    nights: 7,
    guests: 2,
    amount: "EUR 1.846,40",
    tax: "IVA 10%",
  },
  {
    item: "Extra - Welcome kit",
    nights: "-",
    guests: "-",
    amount: "EUR 175,00",
    tax: "IVA 22%",
  },
] as const;

const addDays = (date: Date, days: number) =>
  new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

const formatLongDate = (date: Date | undefined) =>
  date
    ? new Intl.DateTimeFormat("it-IT", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date)
    : "-";

const BookingBuilderPage = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date("2025-11-01"),
    to: addDays(new Date("2025-11-01"), 7),
  });
  const formattedArrival = useMemo(
    () => formatLongDate(dateRange?.from),
    [dateRange?.from]
  );
  const formattedDeparture = useMemo(
    () => formatLongDate(dateRange?.to),
    [dateRange?.to]
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[2fr_1.1fr]">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <CardTitle>Nuova prenotazione</CardTitle>
              <CardDescription>
                Conferma il soggiorno selezionando camera, tariffa e condizioni
                economiche.
              </CardDescription>
            </div>
            <Badge variant="outline">Workflow operativo</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                Ospite principale <span className="text-destructive">*</span>
              </Label>
              <Input placeholder="Cognome Nome" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                Email
              </Label>
              <Input placeholder="ospite@esempio.it" type="email" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                Telefono
              </Label>
              <Input placeholder="+39 XXX XXX XXXX" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                Provenienza
              </Label>
              <Select defaultValue="direct">
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="direct">Diretto</SelectItem>
                  <SelectItem value="agency">Agenzia</SelectItem>
                  <SelectItem value="ota">OTA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-between">
                  <span>Periodo</span>
                  <CalendarDays className="h-4 w-4" />
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
                        to: addDays(range.from, 7),
                      });
                      return;
                    }
                    setDateRange(range);
                  }}
                />
              </PopoverContent>
            </Popover>
            <Select defaultValue="2">
              <SelectTrigger>
                <SelectValue placeholder="Adulti" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 adulto</SelectItem>
                <SelectItem value="2">2 adulti</SelectItem>
                <SelectItem value="3">3 adulti</SelectItem>
                <SelectItem value="4">4 adulti</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="0">
              <SelectTrigger>
                <SelectValue placeholder="Bambini" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0 bambini</SelectItem>
                <SelectItem value="1">1 bambino</SelectItem>
                <SelectItem value="2">2 bambini</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-xl border bg-muted/10 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-medium text-sm text-muted-foreground">
                  Preferenze soggiorno
                </p>
                <p className="text-xs text-muted-foreground">
                  Raccogli note operative per housekeeping e reception.
                </p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Aggiungi servizio
              </Button>
            </div>
            <Textarea
              className="mt-3"
              placeholder="Es. arrivo serale, allergie, richieste speciali..."
            />
          </div>

          <div className="rounded-xl border bg-background">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Voce</TableHead>
                  <TableHead className="text-center">Notti</TableHead>
                  <TableHead className="text-center">Ospiti</TableHead>
                  <TableHead className="text-right">Importo</TableHead>
                  <TableHead>Imposta</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ledgerRows.map((row) => (
                  <TableRow key={row.item}>
                    <TableCell className="font-medium">{row.item}</TableCell>
                    <TableCell className="text-center">{row.nights}</TableCell>
                    <TableCell className="text-center">{row.guests}</TableCell>
                    <TableCell className="text-right">{row.amount}</TableCell>
                    <TableCell>{row.tax}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/30 p-4 text-sm">
          <div className="space-y-1 text-muted-foreground">
            <p>
              Arrivo:{" "}
              <span className="font-semibold">
                {formattedArrival}
              </span>
            </p>
            <p>
              Partenza:{" "}
              <span className="font-semibold">
                {formattedDeparture}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2">
              <Ticket className="h-4 w-4" />
              Applica codice promo
            </Button>
            <Button variant="outline" className="gap-2">
              <ShieldCheck className="h-4 w-4" />
              Blocca tariffa
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Pagamento &amp; caparre</CardTitle>
          <CardDescription>
            Gestisci acconti, metodi di pagamento e policy di cancellazione.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4">
            <p className="font-semibold text-sm">Deposito richiesto</p>
            <p className="text-2xl font-bold text-primary">EUR 300,00</p>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Checkbox id="auto-charge" defaultChecked />
              <Label htmlFor="auto-charge">
                Programma l&apos;addebito automatico 7 giorni prima dell&apos;arrivo
              </Label>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Button variant="outline" className="h-auto flex-col gap-1 py-3">
              <CreditCard className="h-5 w-5" />
              Carta di credito
              <span className="text-xs text-muted-foreground">
                Nexi / Stripe
              </span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-1 py-3">
              <Lock className="h-5 w-5" />
              Link di pagamento
              <span className="text-xs text-muted-foreground">
                Invia al cliente
              </span>
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Note interne</Label>
            <Textarea placeholder="Es. documenti mancanti, richiesta di upgrade..." />
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/30 p-4">
          <div className="text-sm font-semibold">
            Totale prenotazione: <span className="text-primary">EUR 2.021,40</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">Salva bozza</Button>
            <Button className="gap-2">
              <ShieldCheck className="h-4 w-4" />
              Conferma prenotazione
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingBuilderPage;
