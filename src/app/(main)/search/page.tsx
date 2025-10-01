import { Suspense } from "react";
import { intelligentDiagnosisSearch } from "@/ai/flows/intelligent-diagnosis-search";
import type { IntelligentDiagnosisSearchOutput } from "@/ai/flows/intelligent-diagnosis-search";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import SearchForm from "./search-form";
import { Card, CardContent } from "@/components/ui/card";

type SearchPageProps = {
  searchParams: {
    query?: string;
    filter?: "Ayurveda" | "Siddha" | "Unani";
  };
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const { query, filter } = searchParams;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Intelligent Diagnosis Search
        </h1>
        <p className="text-muted-foreground">
          Dual-code suggestions from NAMASTE and ICD-11 TM2.
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-12 w-full" />}>
        <SearchForm initialQuery={query} initialFilter={filter} />
      </Suspense>

      <Card>
        <CardContent className="pt-6">
          <Suspense
            key={query + filter}
            fallback={<SearchResultsSkeleton />}
          >
            <SearchResults query={query} filter={filter} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function SearchResults({ query, filter }: { query?: string; filter?: "Ayurveda" | "Siddha" | "Unani" }) {
  if (!query) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        <p>Please enter a search query to see results.</p>
      </div>
    );
  }

  const searchResults: IntelligentDiagnosisSearchOutput =
    await intelligentDiagnosisSearch({
      query,
      ...(filter && { filter }),
    });

  if (!searchResults.results || searchResults.results.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        <p>No results found for &quot;{query}&quot;.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>NAMASTE Code</TableHead>
          <TableHead>ICD-11 Code</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {searchResults.results.map((result, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{result.description}</TableCell>
            <TableCell>{result.namasteCode}</TableCell>
            <TableCell>{result.icd11Code}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-8 w-1/3" />
        </div>
      ))}
    </div>
  );
}
