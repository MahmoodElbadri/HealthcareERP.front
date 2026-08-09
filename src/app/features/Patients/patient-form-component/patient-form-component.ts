import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PatientsService } from '../patients-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiResponse } from '../../../core/ApiResponse';
import { ToastrService } from 'ngx-toastr';
import { PatientDto } from '../models/patient-dto';
import { AlertService } from '../../../shared/services/alert-service';

@Component({
  selector: 'app-patient-form-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './patient-form-component.html',
  styleUrl: './patient-form-component.css',
})
export class PatientFormComponent implements OnInit {
  //injections
  private patientService = inject(PatientsService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private toastService = inject(ToastrService);
  private route = inject(ActivatedRoute);
  private swalService = inject(AlertService);

  //vars
  patientForm!: FormGroup;
  isSubmitted = false;
  isLoading = signal<boolean>(false);
  formTitle: 'Add Patient' | 'Update Patient' = 'Add Patient';
  formMode: 'add' | 'edit' = 'add';
  id: number = 0;

  //methods
  ngOnInit(): void {
    this.initForm();
    // getting id
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.toastService.info(`Id is ${this.id}`);
      this.formMode = 'edit';
      this.formTitle = 'Update Patient';
      this.getPatientById(this.id);
    }
  }

  getPatientById(id: number) {
    this.patientService.getPatientById(id).subscribe({
      next: (response: ApiResponse<PatientDto>) => {
        this.patientForm.patchValue(response.data);
      },
      error: (error: any) => {
        console.error('Error fetching patient:', error);
      },
    });
  }

  private initForm() {
    this.patientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    });
  }

  onSubmit() {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }
    if (this.formMode === 'edit') {
      const patient = this.patientForm.value as PatientDto;
      patient.id = this.id;
      this.patientService.updatePatient(patient.id, patient).subscribe({
        next: (res) => {
          this.router.navigate(['/patients']);
          this.toastService.success('Patient updated successfully');
        },
        error: (err) => {
          this.toastService.error(err.error?.message || 'Error updating patient');
        },
      });
    } else {
      this.patientService.addPatient(this.patientForm.value).subscribe({
        next: (res) => {
          this.router.navigate(['/patients']);
          this.toastService.success('Patient added successfully');
        },
        error: (err) => {
          this.toastService.error(err.error?.message || 'Error adding patient');
        },
      });
    }
  }

  onDelete() {
    this.swalService.confirm(
      `Are you sure you want to delete patient: ${this.patientForm.value.name}`,
      "This action can't be undone",
    ).then((result) => {
      if (result.isConfirmed) {
        this.patientService.deletePatient(this.id).subscribe({
          next: (res) => {
            this.router.navigate(['/patients']);
            this.toastService.success('Patient deleted successfully');
          },
          error: (err) => {
            this.toastService.error(err.error?.message || 'Error deleting patient');
          },
        });
      }
    });
  }
}
