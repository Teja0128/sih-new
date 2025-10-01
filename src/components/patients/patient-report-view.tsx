
"use client";

import { useState, useTransition } from "react";
import type { PatientFile } from "@/lib/patient-data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowRightLeft, Loader2 } from "lucide-react";
import { intelligentDiagnosisSearch } from "@/ai/flows/intelligent-diagnosis-search";
import { Skeleton } from "@/components/ui/skeleton";

type ConvertedDiagnosis = {
  namasteCode: string;
  icd11Code: string;
  description: string;
};

export default function PatientReportView({ report }: { report: PatientFile }) {
  const [isPending, startTransition] = useTransition();
  const [convertedData, setConvertedData] = useState<
    ConvertedDiagnosis[] | null
  >(null);

  const handleConversion = () => {
    setConvertedData(null);
    startTransition(async () => {
      try {
        const conversionPromises = report.diagnoses.map(async (dx) => {
          const searchResult = await intelligentDiagnosisSearch({
            query: dx.description,
          });

          // Find the best match from the results
          const bestMatch = searchResult.results.find(
            (res) =>
              res.description.toLowerCase().includes(dx.description.toLowerCase()) ||
              dx.description.toLowerCase().includes(res.description.toLowerCase())
          );

          if (report.reportType === 'Namaste') {
            return {
              namasteCode: dx.code,
              description: dx.description,
              icd11Code: bestMatch?.icd11Code || 'N/A',
            };
          } else { // ICD-11
            return {
              icd11Code: dx.code,
              description: dx.description,
              namasteCode: bestMatch?.namasteCode || 'N/A',
            };
          }
        });

        const finalConverted = await Promise.all(conversionPromises);

        setConvertedData(finalConverted);
      } catch (error) {
        console.error("Conversion failed:", error);
      }
    });
  };

  const targetFormat = report.reportType === "ICD-11" ? "Namaste" : "ICD-11";

  return (
    <div className="space-y-6 p-2">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">
              Patient Report: {report.patientName}
            </CardTitle>
            <CardDescription>
              Patient ID: {report.id} | DOB: {report.dob} | Gender:{" "}
              {report.gender}
            </CardDescription>
          </div>
           <Badge variant={report.reportType === 'ICD-11' ? 'secondary' : 'default'} className="text-sm">{report.reportType} Report</Badge>
        </div>
      </CardHeader>
      
      <Separator />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Chief Complaint</h3>
          <p className="text-muted-foreground">{report.chiefComplaint}</p>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Vitals</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            {Object.entries(report.vitals).map(([key, value]) => (
              <li key={key}>
                <span className="font-medium text-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Diagnoses</CardTitle>
              <CardDescription>
                Official diagnoses recorded for this patient.
              </CardDescription>
            </div>
            <Button onClick={handleConversion} disabled={isPending} size="sm">
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ArrowRightLeft className="mr-2 h-4 w-4" />
              )}
              Convert to {targetFormat}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="space-y-2">
                <h4 className="font-semibold text-center pb-2 border-b">Original Diagnoses ({report.reportType})</h4>
                 <ul className="space-y-2">
                    {report.diagnoses.map((dx, index) => (
                    <li key={index} className="p-2 rounded-md bg-muted/50">
                        <p className="font-semibold">{dx.description}</p>
                        <p className="text-sm text-muted-foreground">Code: {dx.code}</p>
                    </li>
                    ))}
                </ul>
            </div>
            <div className="space-y-2">
                 <h4 className="font-semibold text-center pb-2 border-b">Converted Diagnoses ({targetFormat})</h4>
                 {isPending && (
                     <div className="space-y-2 pt-2">
                         <Skeleton className="h-12 w-full" />
                         <Skeleton className="h-12 w-full" />
                     </div>
                 )}
                 {convertedData && (
                     <ul className="space-y-2">
                        {convertedData.map((dx, index) => (
                        <li key={index} className="p-2 rounded-md bg-accent/50">
                            <p className="font-semibold">{dx.description}</p>
                            <p className="text-sm text-accent-foreground">Code: {report.reportType === 'Namaste' ? dx.icd11Code : dx.namasteCode}</p>
                        </li>
                        ))}
                    </ul>
                 )}
                 {!isPending && !convertedData && (
                     <div className="flex items-center justify-center h-full text-muted-foreground text-center">
                         <p>Click the convert button to see the {targetFormat} codes.</p>
                     </div>
                 )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Clinician&apos;s Notes</h3>
        <p className="text-muted-foreground whitespace-pre-wrap">{report.notes}</p>
      </div>

    </div>
  );
}
