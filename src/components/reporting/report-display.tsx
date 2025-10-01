
"use client";

import React from "react";
import type { GenerateMinistryOfAyushReportOutput } from "@/ai/flows/generate-ministry-of-ayush-report";
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
import { Badge } from "@/components/ui/badge";
import MarkdownRenderer from "@/components/markdown-renderer";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FileText, Syringe, Users } from "lucide-react";

type ReportDisplayProps = {
  report: GenerateMinistryOfAyushReportOutput;
};

const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function ReportDisplay({ report }: ReportDisplayProps) {
  const { summary, namasteBreakdown, icd11Breakdown, systemDistribution, narrative } = report;

  const pieData = systemDistribution.map((item) => ({
    name: item.system,
    value: item.count,
  }));

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Don't render label for small percentages to avoid overlap
    if (percent < 0.03) {
      return null;
    }

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };


  return (
    <>
      <div className="space-y-8 animate-fade-in p-4 bg-background">
        <Card>
            <CardHeader>
              <CardTitle>Report Summary</CardTitle>
              <CardDescription>
                An overview of the key metrics from the generated report.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Total Diagnoses</CardTitle>
                          <Syringe className="h-5 w-5 text-secondary" />
                      </CardHeader>
                      <CardContent>
                          <div className="text-4xl font-bold">{summary.totalDiagnoses}</div>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Unique Patients</CardTitle>
                          <Users className="h-5 w-5 text-primary" />
                      </CardHeader>
                      <CardContent>
                          <div className="text-4xl font-bold">{summary.uniquePatients}</div>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Top System</CardTitle>
                          <FileText className="h-5 w-5 text-accent" />
                      </CardHeader>
                      <CardContent>
                          <div className="text-4xl font-bold">{summary.topSystem}</div>
                      </CardContent>
                  </Card>
              </div>
            </CardContent>
          </Card>

        <div className="grid gap-8 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>System Distribution</CardTitle>
              <CardDescription>
                Breakdown of diagnoses by medical system.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={<CustomLabel />}
                    outerRadius={120}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Narrative Summary</CardTitle>
              <CardDescription>
                AI-generated insights and trends.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              <MarkdownRenderer content={narrative} />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top 5 NAMASTE Diagnoses</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {namasteBreakdown.map((dx) => (
                    <TableRow key={dx.code}>
                      <TableCell>
                        <Badge variant="default">{dx.code}</Badge>
                      </TableCell>
                      <TableCell>{dx.description}</TableCell>
                      <TableCell className="text-right font-medium">{dx.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top 5 ICD-11 Diagnoses</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {icd11Breakdown.map((dx) => (
                    <TableRow key={dx.code}>
                      <TableCell>
                        <Badge variant="secondary">{dx.code}</Badge>
                      </TableCell>
                      <TableCell>{dx.description}</TableCell>
                      <TableCell className="text-right font-medium">{dx.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
