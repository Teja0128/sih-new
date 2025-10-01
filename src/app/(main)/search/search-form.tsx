
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const searchSchema = z.object({
  query: z.string().min(1, "Search query cannot be empty"),
});

type SearchFormProps = {
  initialQuery?: string;
  initialFilter?: string;
};

export default function SearchForm({
  initialQuery = "",
  initialFilter,
}: SearchFormProps) {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: initialQuery,
    },
  });

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "all") {
      params.delete("filter");
    } else {
      params.set("filter", value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  function onSubmit(values: z.infer<typeof searchSchema>) {
    const params = new URLSearchParams(window.location.search);
    params.set("query", values.query);
    router.push(`${pathname}?${params.toString()}`);
    form.reset({ query: "" });
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-grow space-y-4">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search for a diagnosis</FormLabel>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <FormControl>
                        <Input
                          placeholder="e.g., Amavata, fever, headache..."
                          className="pl-10"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
               <Button type="submit" className="md:hidden w-full">Search</Button>
            </form>
          </Form>

          <div className="flex items-end gap-4">
            <div className="space-y-2">
              <Label>Filter by system</Label>
              <Tabs
                defaultValue={initialFilter || "all"}
                onValueChange={handleFilterChange}
              >
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="Ayurveda">Ayurveda</TabsTrigger>
                  <TabsTrigger value="Siddha">Siddha</TabsTrigger>
                  <TabsTrigger value="Unani">Unani</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
             <Button type="submit" onClick={form.handleSubmit(onSubmit)} className="hidden md:inline-flex">Search</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
