import { Button } from "@repo/design-system/components/ui/button";
import type { Dictionary } from "@repo/internationalization";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { env } from "@/env";

type CTAProps = {
  dictionary: Dictionary;
};

export const CTA = ({ dictionary }: CTAProps) => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4 rounded-lg border bg-muted/50 p-12 text-center md:p-20">
          <h2 className="max-w-3xl font-bold text-4xl tracking-tight md:text-6xl">
            {dictionary.web.home.cta.title}
          </h2>
          <p className="max-w-2xl text-muted-foreground text-xl leading-relaxed">
            {dictionary.web.home.cta.description}
          </p>
          <div className="mt-6 flex flex-row gap-4">
            <Button asChild className="gap-2" size="lg">
              <Link href={`${env.NEXT_PUBLIC_APP_URL}/sign-up`}>
                {dictionary.web.home.cta.primary}{" "}
                <MoveRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild className="gap-2" size="lg" variant="outline">
              <Link href="/contact">{dictionary.web.home.cta.secondary}</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">✓ Free 14-day trial</div>
            <div className="flex items-center gap-2">
              ✓ No credit card required
            </div>
            <div className="flex items-center gap-2">✓ Cancel anytime</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
