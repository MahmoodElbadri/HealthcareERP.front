import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DoctorsService } from '../doctors-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpecialityService } from '../../../shared/services/speciality-service';
import { SpecialityDto } from '../../../shared/models/speciality-dto';
import { ApiResponse } from '../../../core/ApiResponse';
import { ToastrService } from 'ngx-toastr';
import { DoctorDto } from '../models/DoctorDto';
import { AlertService } from '../../../shared/services/alert-service';
@Component({
  selector: 'app-doctor-form-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './doctor-form-component.html',
  styleUrl: './doctor-form-component.css',
})
export class DoctorFormComponent implements OnInit {
  //injections
  private doctorService = inject(DoctorsService);
  private specialityService = inject(SpecialityService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private toastService = inject(ToastrService);
  private route = inject(ActivatedRoute);
  private swalService = inject(AlertService);

  //vars
  doctorForm!: FormGroup;
  isSubmitted = false;
  isLoading = signal<boolean>(false);
  formTitle: 'Add Doctor' | 'Update Doctor' = 'Add Doctor';
  formMode: 'add' | 'edit' = 'add';
  specialities: SpecialityDto[] = [];
  id: number = 0;

  //methods
  ngOnInit(): void {
    this.initForm();
    this.getAllSpecialities();
    // getting id
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.toastService.info(`Id is ${this.id}`);
      this.formMode = 'edit';
      this.formTitle = 'Update Doctor';
      this.getDoctorById(this.id);
    }
  }

  getDoctorById(id: number) {
    this.doctorService.getDoctorById(id).subscribe({
      next: (response: ApiResponse<DoctorDto>) => {
        this.doctorForm.patchValue(response.data);
      },
      error: (error: any) => {
        console.error('Error fetching doctor:', error);
      },
    });
  }

  getAllSpecialities() {
    this.specialityService.getSpecialities().subscribe({
      next: (response: ApiResponse<SpecialityDto[]>) => {
        this.specialities = response.data;
      },
      error: (error: any) => {
        console.error('Error fetching specialities:', error);
      },
    });
  }

  private initForm() {
    this.doctorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      specialty: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    });
  }

  onSubmit() {
    if (this.formMode === 'edit') {
      const doctor = this.doctorForm.value as DoctorDto;
      doctor.id = this.id;
      this.doctorService.updateDoctor(doctor.id, doctor).subscribe({
        next: (res) => {
          this.router.navigate(['/doctors']);
          this.toastService.success('Doctor updated successfully');
        },
        error: (err) => {
          this.toastService.error(err.error.message);
        },
      });
    } else {
      this.doctorService.addDoctor(this.doctorForm.value).subscribe({
        next: (res) => {
          this.router.navigate(['/doctors']);
          this.toastService.success('Doctor added successfully');
        },
        error: (err) => {
          this.toastService.error(err.error.message);
        },
      });
    }
  }

  onDelete() {
  this.swalService.confirm(
    `Are you sure you want to delete Dr: ${this.doctorForm.value.name}`,
    "This action can't be undone",
  ).then((result) => {
    if (result.isConfirmed) {
      this.doctorService.deleteDoctor(this.id).subscribe({
        next: (res) => {
          this.router.navigate(['/doctors']);
          this.toastService.success('Doctor deleted successfully');
        },
        error: (err) => {
          this.toastService.error(err.error.message);
        },
      });
    }
  });
}
}
