
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PatientFiles from "@/components/patients/patient-files";
import { type PatientFile } from "@/lib/patient-data";

export default function PatientDashboard({ files }: { files: PatientFile[] }) {
    return (
         <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold tracking-tight">My Health Dashboard</h1>
            <Card>
                <CardHeader>
                    <CardTitle>My Reports</CardTitle>
                    <CardDescription>A list of your personal medical reports.</CardDescription>
                </CardHeader>
                <CardContent>
                    <PatientFiles files={files} query="PAT-001" />
                </CardContent>
            </Card>
        </div>
    )
}
