import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PatientFiles from "./patient-files";
import { samplePatientFiles } from "@/lib/patient-data";

export default async function PatientFilesWrapper({ query }: { query: string }) {
  // In a real app, you would fetch this data from a database
  const files = samplePatientFiles.filter(
    (file) =>
      file.id.toLowerCase().includes(query.toLowerCase()) ||
      file.patientName.toLowerCase().includes(query.toLowerCase())
  );

  return <PatientFiles files={files} query={query} />;
}

export function PatientFilesSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-6 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20 mt-1" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
