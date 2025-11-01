"use client";

import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/design-system/components/ui/dropdown-menu";
import { Separator } from "@repo/design-system/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";

const creationOptions = {
  quotes: [
    { label: "Preventivo", href: "/reservations/new/quote" },
    {
      label: "Preventivo senza soggiorno",
      href: "/reservations/new/quote?mode=nostay",
      disabled: true,
    },
    {
      label: "Preventivo ristorante",
      href: "/reservations/new/quote?mode=restaurant",
      disabled: true,
    },
    {
      label: "Preventivo di gruppo",
      href: "/reservations/new/quote?mode=group",
      disabled: true,
    },
    {
      label: "Preventivo gruppo camere a scelta",
      href: "/reservations/new/quote?mode=flex-group",
      disabled: true,
    },
  ],
  bookings: [
    { label: "Prenotazione", href: "/reservations/new/booking" },
    {
      label: "Prenotazione di gruppo",
      href: "/reservations/new/booking?mode=group",
      disabled: true,
    },
    {
      label: "Prenotazione senza soggiorno",
      href: "/reservations/new/booking?mode=nostay",
      disabled: true,
    },
    {
      label: "Prenotazione ristorante",
      href: "/reservations/new/booking?mode=restaurant",
      disabled: true,
    },
  ],
} as const;

const NewReservationHub = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Seleziona la tipologia</CardTitle>
        <CardDescription>
          Scegli se creare un preventivo o una prenotazione. Questa schermata
          sostituisce il menù legacy fornendo un percorso coerente con Nexora.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <header className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-lg">Preventivi</h2>
              <p className="text-sm text-muted-foreground">
                Genera offerte personalizzate per richieste nuove o ricorrenti.
              </p>
            </div>
            <Badge variant="outline">Focus marketing</Badge>
          </header>
          <div className="flex flex-col gap-2">
            {creationOptions.quotes.map((option) => (
                <Button
                  key={option.label}
                  asChild
                  className="justify-start gap-2"
                  disabled={option.disabled}
                  variant={option.disabled ? "ghost" : "outline"}
                >
                  <Link href={option.href}>
                  <Plus className="h-4 w-4" />
                  {option.label}
                </Link>
              </Button>
            ))}
          </div>
        </section>
        <section className="rounded-xl border border-border p-4">
          <header className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-lg">Prenotazioni</h2>
              <p className="text-sm text-muted-foreground">
                Conferma soggiorni direttamente, con controlli finanziari
                pre-configurati.
              </p>
            </div>
            <Badge variant="secondary">Operativo</Badge>
          </header>
          <div className="flex flex-col gap-2">
            {creationOptions.bookings.map((option) => (
                <Button
                  key={option.label}
                  asChild
                  className="justify-start gap-2"
                  disabled={option.disabled}
                  variant={option.disabled ? "ghost" : "outline"}
                >
                  <Link href={option.href}>
                  <Plus className="h-4 w-4" />
                  {option.label}
                </Link>
              </Button>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Accesso rapido</CardTitle>
        <CardDescription>
          Per chi arriva dalla lista prenotazioni è disponibile anche il menù
          contestuale aggiornato.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="lg" variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Nuova prenotazione / preventivo
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-72">
            <DropdownMenuLabel>Preventivi</DropdownMenuLabel>
            {creationOptions.quotes.map((option) => (
              <DropdownMenuItem
                key={option.label}
                asChild
                disabled={option.disabled}
              >
                <Link href={option.href}>{option.label}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Prenotazioni</DropdownMenuLabel>
            {creationOptions.bookings.map((option) => (
              <DropdownMenuItem
                key={option.label}
                asChild
                disabled={option.disabled}
              >
                <Link href={option.href}>{option.label}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="hidden h-10 lg:block" />
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>
            Le opzioni disabilitate verranno abilitate con i workflow successivi.
          </p>
          <p>
            I percorsi principali già supportano il nuovo modello di template e
            messaggistica integrata.
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default NewReservationHub;
