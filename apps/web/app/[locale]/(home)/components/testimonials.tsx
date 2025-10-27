"use client";

import {
  Avatar,
  AvatarFallback,
} from "@repo/design-system/components/ui/avatar";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@repo/design-system/components/ui/carousel";
import type { Dictionary } from "@repo/internationalization";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";

type TestimonialsProps = {
  dictionary: Dictionary;
};

export const Testimonials = ({ dictionary }: TestimonialsProps) => {
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
    }, 5000);

    return () => clearTimeout(interval);
  }, [api, current]);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <h2 className="mx-auto max-w-3xl text-center font-bold text-3xl tracking-tight md:text-5xl">
            {dictionary.web.home.testimonials.title}
          </h2>
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent>
              {dictionary.web.home.testimonials.items.map((item, index) => (
                <CarouselItem className="lg:basis-1/2" key={index}>
                  <div className="flex h-full flex-col justify-between rounded-lg border bg-card p-8">
                    <div className="flex flex-col gap-6">
                      <Quote className="h-10 w-10 text-primary opacity-20" />
                      <p className="text-lg leading-relaxed">"{item.quote}"</p>
                    </div>
                    <div className="mt-6 flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                          {item.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{item.author}</p>
                        <p className="text-muted-foreground text-sm">{item.role}</p>
                      </div>
                    </div>
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
