import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/design-system/components/ui/accordion";
import { Button } from "@repo/design-system/components/ui/button";
import type { Dictionary } from "@repo/internationalization";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

type FAQProps = {
  dictionary: Dictionary;
};

export const FAQ = ({ dictionary }: FAQProps) => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left Side - Title & CTA */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-xl font-bold text-3xl tracking-tight md:text-5xl">
              {dictionary.web.home.faq.title}
            </h2>
            <p className="max-w-lg text-muted-foreground text-lg leading-relaxed">
              Common questions about Nexora. Can't find what you're looking for?
            </p>
          </div>
          <div>
            <Button asChild className="gap-2" size="lg" variant="outline">
              <Link href="/contact">
                <MessageCircle className="h-4 w-4" />
                Contact support
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Side - FAQ Accordion */}
        <Accordion className="w-full" collapsible type="single">
          {dictionary.web.home.faq.items.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </div>
);
