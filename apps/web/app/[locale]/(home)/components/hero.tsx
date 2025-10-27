import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import type { Dictionary } from "@repo/internationalization";
import { MoveRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { env } from "@/env";

type HeroProps = {
  dictionary: Dictionary;
};

export const Hero = async ({ dictionary }: HeroProps) => (
  <div className="w-full">
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
        {/* Announcement Badge */}
        <Badge className="gap-2 px-4 py-2" variant="secondary">
          <Sparkles className="h-3 w-3" />
          {dictionary.web.home.hero.announcement}
        </Badge>

        {/* Hero Text */}
        <div className="flex flex-col gap-6">
          <h1 className="max-w-4xl text-center font-bold text-5xl tracking-tight md:text-7xl lg:text-8xl">
            Modern PMS for
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Italian & Brazilian
            </span>
            <br />
            Hospitality
          </h1>
          <p className="mx-auto max-w-2xl text-center text-muted-foreground text-xl leading-relaxed md:text-2xl">
            {dictionary.web.home.meta.description}
          </p>
        </div>

        {/* Problem Statement - YC Style */}
        <div className="mx-auto max-w-3xl rounded-lg border bg-muted/50 p-6 text-center">
          <p className="font-semibold text-lg">
            <span className="text-red-600">Problem:</span> Scidoo and legacy PMS
            systems are slow, expensive, and built for the 2010s.
          </p>
          <p className="mt-2 text-muted-foreground">
            <span className="font-semibold text-green-600">Solution:</span>{" "}
            Nexora is a modern, cloud-native PMS that's 10x faster, actually
            affordable, and built for today's hospitality needs.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-row gap-3">
          <Button asChild className="gap-2" size="lg">
            <Link href={env.NEXT_PUBLIC_APP_URL}>
              {dictionary.web.global.secondaryCta}{" "}
              <MoveRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild className="gap-2" size="lg" variant="outline">
            <Link href="/contact">{dictionary.web.global.primaryCta}</Link>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-muted-foreground text-sm">
            Trusted by property managers across Italy and Brazil
          </p>
          <div className="flex gap-4 text-muted-foreground text-xs">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span>Italian Fiscal Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
