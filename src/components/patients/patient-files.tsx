
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FilePlus2, FileText, User } from "lucide-react";
import PatientReportView from "./patient-report-view";
import { type PatientFile } from "@/lib/patient-data";
import { Badge } from "../ui/badge";

export default function PatientFiles({ files, query }: { files: PatientFile[], query: string }) {

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {files.map((file) => (
        <Dialog key={file.id}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">
                  {file.patientName}
                </CardTitle>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Patient ID: {file.id}
                </div>
                <div className="text-sm text-muted-foreground">
                  DOB: {file.dob}
                </div>
                 <div className="text-sm text-muted-foreground pt-2 font-medium">
                  {file.diagnoses.map(d => d.description).join(', ')}
                </div>
              </CardContent>
              <CardFooter>
                <Badge variant={file.reportType === 'ICD-11' ? 'secondary' : 'default'}>{file.reportType} Report</Badge>
              </CardFooter>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogTitle className="sr-only">
                Patient Report: {file.patientName} ({file.id})
            </DialogTitle>
            <PatientReportView report={file} />
          </DialogContent>
        </Dialog>
      ))}
       {files.length === 0 && (
        <p className="col-span-full text-center text-muted-foreground">
          No patient files found for &quot;{query}&quot;.
        </p>
      )}
    </div>
  );
}
