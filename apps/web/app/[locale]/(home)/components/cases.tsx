"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@repo/design-system/components/ui/carousel";
import type { Dictionary } from "@repo/internationalization";
import { useEffect, useState } from "react";

type CasesProps = {
  dictionary: Dictionary;
};

const AUTOMATIC_SCROLL_DELAY_MS = 1000;
const INITIAL_SLIDE_INDEX = 0;
const SCROLL_INCREMENT = 1;
const TOTAL_CASE_LOGOS = 15;
const caseLogos = Array.from({ length: TOTAL_CASE_LOGOS }, (_, index) => ({
  id: index + 1,
}));

export const Cases = ({ dictionary }: CasesProps) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (
        api.selectedScrollSnap() + SCROLL_INCREMENT ===
        api.scrollSnapList().length
      ) {
        api.scrollTo(INITIAL_SLIDE_INDEX);
      } else {
        api.scrollNext();
      }
    }, AUTOMATIC_SCROLL_DELAY_MS);

    return () => window.clearInterval(intervalId);
  }, [api]);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <h2 className="text-left font-regular text-xl tracking-tighter md:text-5xl lg:max-w-xl">
            {dictionary.web.home.cases.title}
          </h2>
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent>
              {caseLogos.map((logo) => (
                <CarouselItem className="basis-1/4 lg:basis-1/6" key={logo.id}>
                  <div className="flex aspect-square items-center justify-center rounded-md bg-muted p-6">
                    <span className="text-sm">Logo {logo.id}</span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
