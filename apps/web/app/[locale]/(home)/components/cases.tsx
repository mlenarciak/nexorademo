"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@repo/design-system/components/ui/carousel";
import type { Dictionary } from "@repo/internationalization";
import { Hotel, Building2, TreePine, Home, Mountain } from "lucide-react";
import { useEffect, useState } from "react";

type CasesProps = {
  dictionary: Dictionary;
};

const propertyTypes = [
  { name: "B&Bs", icon: Home, count: "5-15 rooms" },
  { name: "Small Hotels", icon: Building2, count: "15-100 rooms" },
  { name: "Resort Villaggi", icon: Hotel, count: "20-100 units" },
  { name: "Open Air Resorts", icon: TreePine, count: "50-200 sites" },
  { name: "Boutique Hotels", icon: Mountain, count: "10-50 rooms" },
];

export const Cases = ({ dictionary }: CasesProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 3000);

    return () => clearTimeout(interval);
  }, [api, current]);

  return (
    <div className="w-full py-20">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <h2 className="text-center font-bold text-2xl tracking-tight md:text-4xl">
            {dictionary.web.home.cases.title}
          </h2>
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent>
              {propertyTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <CarouselItem
                    className="basis-1/2 md:basis-1/3 lg:basis-1/5"
                    key={index}
                  >
                    <div className="flex aspect-square flex-col items-center justify-center gap-4 rounded-lg border bg-card p-6 transition-colors hover:bg-muted">
                      <Icon className="h-12 w-12 text-primary" />
                      <div className="text-center">
                        <p className="font-semibold">{type.name}</p>
                        <p className="text-muted-foreground text-xs">{type.count}</p>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
