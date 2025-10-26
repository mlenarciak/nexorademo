"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";

const propertyFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(100),
  type: z.enum([
    "BNB",
    "RESORT_VILLAGGI",
    "OPEN_AIR_RESORT",
    "SMALL_HOTEL",
    "HOSTEL",
    "VACATION_RENTAL",
    "OTHER",
  ]),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().optional(),
  postalCode: z.string(),
  country: z.enum(["IT", "BR", "US", "FR", "ES", "PT"]),
  phone: z.string().min(10),
  email: z.string().email(),
  website: z.string().url().optional().or(z.literal("")),
  vatNumber: z.string().optional(),
  cin: z.string().optional(),
  cir: z.string().optional(),
  brazilianTaxId: z.string().optional(),
  checkInTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  checkOutTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  currency: z.enum(["EUR", "BRL", "USD", "GBP"]),
  timezone: z.string(),
});

type PropertyFormData = z.infer<typeof propertyFormSchema>;

export interface PropertyFormProps {
  initialData?: Partial<PropertyFormData>;
  onSubmit: (data: PropertyFormData) => Promise<void>;
  isLoading?: boolean;
}

export function PropertyForm({
  initialData,
  onSubmit,
  isLoading,
}: PropertyFormProps) {
  const [activeTab, setActiveTab] = useState("basic");

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      type: initialData?.type || "BNB",
      address: initialData?.address || "",
      city: initialData?.city || "",
      state: initialData?.state || "",
      postalCode: initialData?.postalCode || "",
      country: initialData?.country || "IT",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      website: initialData?.website || "",
      vatNumber: initialData?.vatNumber || "",
      cin: initialData?.cin || "",
      cir: initialData?.cir || "",
      brazilianTaxId: initialData?.brazilianTaxId || "",
      checkInTime: initialData?.checkInTime || "15:00",
      checkOutTime: initialData?.checkOutTime || "11:00",
      currency: initialData?.currency || "EUR",
      timezone: initialData?.timezone || "Europe/Rome",
    },
  });

  const selectedCountry = form.watch("country");

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="fiscal">Fiscal Details</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
          </TabsList>

          <TabsContent className="space-y-4" value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Essential details about your property
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Villa Bella Vista" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type *</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="BNB">B&B</SelectItem>
                          <SelectItem value="RESORT_VILLAGGI">
                            Resort Villaggi
                          </SelectItem>
                          <SelectItem value="OPEN_AIR_RESORT">
                            Open Air Resort
                          </SelectItem>
                          <SelectItem value="SMALL_HOTEL">
                            Small Hotel
                          </SelectItem>
                          <SelectItem value="HOSTEL">Hostel</SelectItem>
                          <SelectItem value="VACATION_RENTAL">
                            Vacation Rental
                          </SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="info@property.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone *</FormLabel>
                        <FormControl>
                          <Input placeholder="+39 055 1234567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address *</FormLabel>
                      <FormControl>
                        <Input placeholder="Via Roma 123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <FormControl>
                          <Input placeholder="Firenze" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code *</FormLabel>
                        <FormControl>
                          <Input placeholder="50100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country *</FormLabel>
                        <Select
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="IT">Italy</SelectItem>
                            <SelectItem value="BR">Brazil</SelectItem>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="FR">France</SelectItem>
                            <SelectItem value="ES">Spain</SelectItem>
                            <SelectItem value="PT">Portugal</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://property.com"
                          type="url"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent className="space-y-4" value="fiscal">
            <Card>
              <CardHeader>
                <CardTitle>Fiscal Information</CardTitle>
                <CardDescription>
                  Tax and compliance details for {selectedCountry}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedCountry === "IT" && (
                  <>
                    <FormField
                      control={form.control}
                      name="cin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            CIN (Codice Identificativo Nazionale)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="IT055042A1BC123456"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Required for all Italian hospitality properties
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cir"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            CIR (Codice Identificativo Regionale)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="CIR055042-BED-00123"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Regional identification code
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="vatNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Partita IVA (VAT Number)</FormLabel>
                          <FormControl>
                            <Input placeholder="12345678901" {...field} />
                          </FormControl>
                          <FormDescription>
                            11-digit Italian VAT number
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {selectedCountry === "BR" && (
                  <>
                    <FormField
                      control={form.control}
                      name="brazilianTaxId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CNPJ (Brazilian Tax ID)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="12.345.678/0001-90"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Required for Brazilian businesses
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {!["IT", "BR"].includes(selectedCountry) && (
                  <FormField
                    control={form.control}
                    name="vatNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax ID / VAT Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent className="space-y-4" value="operations">
            <Card>
              <CardHeader>
                <CardTitle>Operational Settings</CardTitle>
                <CardDescription>
                  Check-in/check-out times and other operational details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="checkInTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check-in Time *</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="checkOutTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check-out Time *</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency *</FormLabel>
                        <Select
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="BRL">BRL (R$)</SelectItem>
                            <SelectItem value="USD">USD ($)</SelectItem>
                            <SelectItem value="GBP">GBP (£)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timezone *</FormLabel>
                        <Select
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Europe/Rome">
                              Europe/Rome (IT)
                            </SelectItem>
                            <SelectItem value="America/Sao_Paulo">
                              America/Sao_Paulo (BR)
                            </SelectItem>
                            <SelectItem value="America/New_York">
                              America/New_York (US)
                            </SelectItem>
                            <SelectItem value="Europe/London">
                              Europe/London (UK)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button disabled={isLoading} type="button" variant="outline">
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            {isLoading
              ? "Saving..."
              : initialData
                ? "Update Property"
                : "Create Property"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
