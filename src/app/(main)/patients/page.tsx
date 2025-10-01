import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PatientSearch from "@/components/patients/patient-search";
import PatientFilesWrapper, { PatientFilesSkeleton } from "@/components/patients/patient-files-wrapper";

type PatientsPageProps = {
  searchParams: {
    query?: string;
  };
};

export default function PatientsPage({ searchParams }: PatientsPageProps) {
  const query = searchParams?.query || "";

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Records</h1>
          <p className="text-muted-foreground">
            Search, view, and manage patient files.
          </p>
        </div>
        <PatientSearch placeholder="Search by Patient ID or Name..." />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Files</CardTitle>
          <CardDescription>
            A list of all patient files in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense key={query} fallback={<PatientFilesSkeleton />}>
            <PatientFilesWrapper query={query} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
