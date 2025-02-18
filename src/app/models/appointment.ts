export interface Appointment {
    id: number;
    patientEmail: string;
    doctorEmail: string;
    room: string;
    appointmentDate: Date;
    sessionType: string;
    totalCost: number;
    rating?: number | null;
    feedback?: string | null;
    createdAt: string;
    updatedAt?: string | null;
    status?: 'futura' | 'pasada';
  }
      