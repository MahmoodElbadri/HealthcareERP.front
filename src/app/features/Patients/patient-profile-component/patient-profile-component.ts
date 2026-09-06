import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PatientsService } from '../patients-service';
import { PatientDto } from '../models/patient-dto';
import { ToastrService } from 'ngx-toastr';
import { PatientHistoryDto } from '../models/patient-history-dto';
import { DiagnosisDto } from '../models/DiagnosisDto';
import { PrescriptionDto } from '../models/PrescriptionDto';
import { AppointmentDTO } from '../../Appointments/models/appointment-dto';

@Component({
  selector: 'app-patient-profile-component',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './patient-profile-component.html',
  styleUrl: './patient-profile-component.css',
})
export class PatientProfileComponent implements OnInit {

  // vars
  protected patientDto?: PatientDto;
  protected patientHistoryDto?: PatientHistoryDto | PatientHistoryDto[];
  protected id!: number;
  protected isLoading: boolean = true;

  // injections
  protected activatedRoute = inject(ActivatedRoute);
  private patientService = inject(PatientsService);
  private toastr = inject(ToastrService);

  // methods
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.id = Number(params['id']);
        if (this.id) {
          this.loadPatientData();
        }
      },
    });
  }

  loadPatientData(): void {
    this.isLoading = true;
    this.patientService.getPatientById(this.id).subscribe({
      next: (res) => {
        this.patientDto = res.data;
      },
      error: (error) => {
        this.toastr.error(error?.error?.message || 'Failed to load patient details');
      },
    });

    this.getPatientHistory();
  }

  getPatientHistory(): void {
    this.patientService.getPatientHistory(this.id).subscribe({
      next: (res) => {
        this.patientHistoryDto = res.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error(error?.error?.message || 'Failed to load patient history');
        this.isLoading = false;
      },
    });
  }

  // Get active history object (handles single object or array response)
  get historyObj(): PatientHistoryDto | null {
    if (!this.patientHistoryDto) return null;
    if (Array.isArray(this.patientHistoryDto)) {
      return this.patientHistoryDto[0] || null;
    }
    return this.patientHistoryDto;
  }

  get appointments(): AppointmentDTO[] {
    return this.historyObj?.appointments || [];
  }

  getDiagnosisForAppointment(appointmentId: number): DiagnosisDto | undefined {
    const diagnoses = this.historyObj?.diagnoses || [];
    return diagnoses.find(d => d.appointmentId === appointmentId);
  }

  getPrescriptionsForAppointment(appointmentId: number): PrescriptionDto[] {
    const history = this.historyObj;
    if (!history) return [];
    const prescriptions = history.drescriptions || (history as any).prescriptions || [];
    return prescriptions.filter(p => p.appointmentId === appointmentId);
  }

  getInitials(name?: string): string {
    if (!name) return 'PA';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  }

  getStatusBadgeClass(status?: string): string {
    switch (status?.toLowerCase()) {
      case 'completed': return 'badge-completed';
      case 'scheduled': return 'badge-scheduled';
      case 'cancelled': return 'badge-cancelled';
      default: return 'badge-secondary';
    }
  }
}

