import type { Dictionary } from "@repo/internationalization";
import { Building2, Bed, Zap, Link2, FileText, BarChart3 } from "lucide-react";

type FeaturesProps = {
  dictionary: Dictionary;
};

const featureIcons = [Building2, Bed, Zap, Link2, FileText, BarChart3];

export const Features = ({ dictionary }: FeaturesProps) => {
  const features = dictionary.web.home.features.items;

  return (
    <div className="w-full bg-muted/30 py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-16">
          {/* Header */}
          <div className="flex flex-col gap-4 text-center">
            <h2 className="mx-auto max-w-3xl font-bold text-4xl tracking-tight md:text-6xl">
              {dictionary.web.home.features.title}
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-xl leading-relaxed">
              {dictionary.web.home.features.description}
            </p>
          </div>

          {/* Feature Grid - Bento Box Style */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 - Large */}
            <div className="flex aspect-square h-full flex-col justify-between rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-8 dark:from-blue-950 dark:to-indigo-950 lg:col-span-2 lg:aspect-auto">
              {features[0] && (
                <>
                  <Building2 className="h-10 w-10 text-blue-600" />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl tracking-tight">
                      {features[0].title}
                    </h3>
                    <p className="max-w-lg text-muted-foreground">
                      {features[0].description}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Feature 2 */}
            <div className="flex aspect-square flex-col justify-between rounded-lg bg-muted p-8">
              {features[1] && (
                <>
                  <Bed className="h-10 w-10 text-violet-600" />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-xl tracking-tight">
                      {features[1].title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {features[1].description}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Feature 3 */}
            <div className="flex aspect-square flex-col justify-between rounded-lg bg-muted p-8">
              {features[2] && (
                <>
                  <Zap className="h-10 w-10 text-amber-600" />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-xl tracking-tight">
                      {features[2].title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {features[2].description}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Feature 4 - Large */}
            <div className="flex aspect-square h-full flex-col justify-between rounded-lg bg-gradient-to-br from-violet-50 to-purple-50 p-8 dark:from-violet-950 dark:to-purple-950 lg:col-span-2 lg:aspect-auto">
              {features[3] && (
                <>
                  <Link2 className="h-10 w-10 text-violet-600" />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl tracking-tight">
                      {features[3].title}
                    </h3>
                    <p className="max-w-lg text-muted-foreground">
                      {features[3].description}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Features 5 & 6 */}
            {features[4] && (
              <div className="flex aspect-square flex-col justify-between rounded-lg bg-muted p-8">
                <FileText className="h-10 w-10 text-green-600" />
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-xl tracking-tight">
                    {features[4].title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {features[4].description}
                  </p>
                </div>
              </div>
            )}

            {features[5] && (
              <div className="flex aspect-square flex-col justify-between rounded-lg bg-muted p-8">
                <BarChart3 className="h-10 w-10 text-blue-600" />
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-xl tracking-tight">
                    {features[5].title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {features[5].description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
