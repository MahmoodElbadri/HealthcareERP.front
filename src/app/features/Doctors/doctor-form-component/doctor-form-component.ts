import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DoctorsService } from '../doctors-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpecialityService } from '../../../shared/services/speciality-service';
import { SpecialityDto } from '../../../shared/models/speciality-dto';
import { ApiResponse } from '../../../core/ApiResponse';
import { ToastrService } from 'ngx-toastr';
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

  //vars
  doctorForm!: FormGroup;
  isSubmitted = false;
  isLoading = signal<boolean>(false);
  formTitle = 'Add Doctor';
  formMode: 'add' | 'edit' = 'add';
  specialities: SpecialityDto[] = [];

  //methods
  ngOnInit(): void {
    this.initForm();
    this.getAllSpecialities();
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
