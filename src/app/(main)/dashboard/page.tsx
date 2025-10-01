"use client";
import DoctorDashboard from './doctor-dashboard';
import PatientDashboard from './patient-dashboard';
import { samplePatientFiles } from '@/lib/patient-data';

type DashboardPageProps = {
  searchParams: {
    role?: 'doctor' | 'patient';
  };
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const role = searchParams?.role || 'doctor';

  if (role === 'patient') {
    // In a real app, you would fetch this data based on the logged-in user
    const patientFiles = samplePatientFiles.filter(file => file.id === "PAT-001");
    return <PatientDashboard files={patientFiles} />;
  }
  
  // In a real app, you would fetch this data from a database
  const files = samplePatientFiles.filter(
    (file) =>
      file.id.toLowerCase().includes("".toLowerCase()) ||
      file.patientName.toLowerCase().includes("".toLowerCase())
  );

  return <DoctorDashboard files={files} />;
}
