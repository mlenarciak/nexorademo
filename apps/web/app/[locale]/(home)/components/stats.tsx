import type { Dictionary } from "@repo/internationalization";
import { Clock, Zap, Users, Globe } from "lucide-react";

type StatsProps = {
  dictionary: Dictionary;
};

const icons = [Clock, Zap, Users, Globe];

export const Stats = ({ dictionary }: StatsProps) => (
  <div className="w-full py-20">
    <div className="container mx-auto">
      <div className="flex flex-col gap-10">
        <div className="text-center">
          <h2 className="font-bold text-3xl tracking-tight md:text-5xl">
            {dictionary.web.home.stats.title}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {dictionary.web.home.stats.items.map((item, index) => {
            const Icon = icons[index] || Zap;
            return (
              <div
                className="flex flex-col items-center gap-4 text-center"
                key={item.label}
              >
                <Icon className="h-8 w-8 text-primary" />
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-4xl tracking-tight">
                    {item.value}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);
