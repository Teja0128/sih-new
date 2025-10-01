'use client';

import { useEffect, useState } from 'react';
import DoctorDashboard from './doctor-dashboard';
import PatientDashboard from './patient-dashboard';
import { samplePatientFiles } from '@/lib/patient-data';

type DashboardPageProps = {
  searchParams: {
    role?: 'doctor' | 'patient';
  };
};

export default function DashboardPageClient({ searchParams }: DashboardPageProps) {
  const role = searchParams?.role || 'doctor';
  const [patientFiles, setPatientFiles] = useState([]);
  const [doctorFiles, setDoctorFiles] = useState([]);

  useEffect(() => {
    if (role === 'patient') {
      setPatientFiles(samplePatientFiles.filter(file => file.id === 'PAT-001'));
    } else {
      setDoctorFiles(
        samplePatientFiles.filter(
          file =>
            file.id.toLowerCase().includes(''.toLowerCase()) ||
            file.patientName.toLowerCase().includes(''.toLowerCase())
        )
      );
    }
  }, [role]);

  if (role === 'patient') {
    return <PatientDashboard files={patientFiles} />;
  }

  return <DoctorDashboard files={doctorFiles} />;
}
