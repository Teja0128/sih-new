
"use client";

import { Suspense } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Activity, FileText, Users, Syringe } from 'lucide-react';
import type { PatientFile } from '@/lib/patient-data';
import PatientFiles from '@/components/patients/patient-files';


const chartData = [
  { month: "January", ayurveda: 186, siddha: 80, unani: 50 },
  { month: "February", ayurveda: 305, siddha: 200, unani: 120 },
  { month: "March", ayurveda: 237, siddha: 120, unani: 190 },
  { month: "April", ayurveda: 73, siddha: 190, unani: 40 },
  { month: "May", ayurveda: 209, siddha: 130, unani: 160 },
  { month: "June", ayurveda: 214, siddha: 140, unani: 180 },
];

const chartConfig = {
  ayurveda: {
    label: "Ayurveda",
    color: "hsl(var(--chart-1))",
  },
  siddha: {
    label: "Siddha",
    color: "hsl(var(--chart-2))",
  },
  unani: {
    label: "Unani",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const recentDiagnoses = [
  {
    patient: "Patient-001",
    diagnosis: "Amavata",
    namasteCode: "NAM-AY-123",
    icd11Code: "M65",
    practitioner: "Dr. Sharma",
    system: "Ayurveda",
  },
  {
    patient: "Patient-002",
    diagnosis: "Vali Azhal Keel Vayu",
    namasteCode: "NAM-SI-456",
    icd11Code: "M05",
    practitioner: "Dr. Kumar",
    system: "Siddha",
  },
  {
    patient: "Patient-003",
    diagnosis: "Waja-ul-Mafasil",
    namasteCode: "NAM-UN-789",
    icd11Code: "M15",
    practitioner: "Dr. Khan",
    system: "Unani",
  },
  {
    patient: "Patient-004",
    diagnosis: "Gridhrasi",
    namasteCode: "NAM-AY-101",
    icd11Code: "M54.3",
    practitioner: "Dr. Sharma",
    system: "Ayurveda",
  },
  {
    patient: "Patient-005",
    diagnosis: "Nazla",
    namasteCode: "NAM-UN-112",
    icd11Code: "J00",
    practitioner: "Dr. Khan",
    system: "Unani",
  },
];

export default function DoctorDashboard({ files }: { files: PatientFile[] }) {
    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold tracking-tight">Doctor Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="transition-all hover:shadow-lg hover:border-primary cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Total Patients
                        </CardTitle>
                        <Users className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">573</div>
                        <p className="text-xs text-muted-foreground">
                        +20 since last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="transition-all hover:shadow-lg hover:border-primary cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Diagnoses This Month
                        </CardTitle>
                        <Syringe className="h-5 w-5 text-secondary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">1,204</div>
                        <p className="text-xs text-muted-foreground">
                        +180 since last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="transition-all hover:shadow-lg hover:border-primary cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Reports Filed</CardTitle>
                        <FileText className="h-5 w-5 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">892</div>
                        <p className="text-xs text-muted-foreground">
                        +52 since last week
                        </p>
                    </CardContent>
                </Card>
                <Card className="transition-all hover:shadow-lg hover:border-primary cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">System Activity</CardTitle>
                        <Activity className="h-5 w-5 text-warning" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">High</div>
                         <p className="text-xs text-muted-foreground">
                        Normal operational status
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                <Card>
                <CardHeader>
                    <CardTitle>Diagnosis Trends</CardTitle>
                    <CardDescription>Monthly diagnosis trends by system</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer>
                    <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis />
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                        />
                         <Legend />
                        <Bar
                        dataKey="ayurveda"
                        fill="var(--color-ayurveda)"
                        radius={[4, 4, 0, 0]}
                        />
                        <Bar dataKey="siddha" fill="var(--color-siddha)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="unani" fill="var(--color-unani)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                    </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
                </Card>
                <Card>
                <CardHeader>
                    <CardTitle>Recent Diagnoses</CardTitle>
                    <CardDescription>
                    A list of the most recent diagnoses across the system.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Diagnosis</TableHead>
                        <TableHead>System</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentDiagnoses.map((dx) => (
                        <TableRow key={dx.patient}>
                            <TableCell className="font-medium">{dx.patient}</TableCell>
                            <TableCell>{dx.diagnosis}</TableCell>
                            <TableCell>
                            <Badge
                                variant={
                                dx.system === "Ayurveda"
                                    ? "default"
                                    : dx.system === "Siddha"
                                    ? "secondary"
                                    : "outline"
                                }
                            >
                                {dx.system}
                            </Badge>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Patient Files</CardTitle>
                    <CardDescription>Recently accessed patient files.</CardDescription>
                </CardHeader>
                <CardContent>
                    <PatientFiles files={files} query="" />
                </CardContent>
            </Card>
        </div>
    );
}
