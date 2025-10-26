import { getProperties } from "@/app/actions/properties";
import { PropertyList } from "@repo/design-system/components/property";

export default async function PropertiesPage() {
  const result = await getProperties();

  if (!result.success) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="font-bold text-2xl">Error loading properties</h2>
          <p className="mt-2 text-muted-foreground">{result.error}</p>
        </div>
      </div>
    );
  }

  return <PropertyList properties={result.data} />;
}

export const metadata = {
  title: "Properties | Nexora",
  description: "Manage your hospitality properties",
};

