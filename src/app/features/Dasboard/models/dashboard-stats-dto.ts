import { MedicationStatsDto } from './MedicationStatsDto';

export interface DashboardStatsDto {
  todaysRevenue: number;
  todaysAppointments: number;
  totalPatients: number;
  totalDoctors: number;
  completedAppointments: number;
  scheduledAppointments: number;
  cancelledAppointments: number;
  top5Medications: MedicationStatsDto[];
}
