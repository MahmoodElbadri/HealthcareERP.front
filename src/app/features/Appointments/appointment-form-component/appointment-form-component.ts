import { Component, inject, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment-service';
import { DoctorDto } from '../../Doctors/models/DoctorDto';
import { PatientDto } from '../../Patients/models/patient-dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiResponse } from '../../../core/ApiResponse';
import { AppointmentDTO } from '../models/appointment-dto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointment-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './appointment-form-component.html',
  styleUrl: './appointment-form-component.css',
})
export class AppointmentFormComponent implements OnInit {

  //injections
  private appointmentService = inject(AppointmentService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toast = inject(ToastrService);

  //properties
  public doctors: DoctorDto[] = [];
  public patients: PatientDto[] = [];
  addAppointment!: FormGroup;

  //methods
  ngOnInit(): void {
    this.loadDoctors();
    this.loadPatients();
    this.buildForm();
  }

  loadDoctors(){
    this.appointmentService.getDoctors().subscribe({
      next: (response) => {
        this.doctors = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  loadPatients(){
    this.appointmentService.getPatients().subscribe({
      next: (response) => {
        this.patients = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  buildForm(){
    this.addAppointment = this.fb.group({
      appointmentDate: ['', Validators.required],
      patientId: ['', Validators.required],
      doctorId: ['', Validators.required],
      notes: ['', Validators.required]
    })
  }

  onSubmit(){
    if(this.addAppointment.invalid){
      this.addAppointment.markAllAsTouched();
      return;
    }

    let appointment = this.addAppointment.value;

    this.appointmentService.createAppointment(appointment).subscribe({
      next: (response:ApiResponse<AppointmentDTO>) => {
        this.toast.success(`Appointment created successfully for Number ${response.data.queueNumber}`);
        this.router.navigate(['/appointments']);
      },
      error: (error) => {
        this.toast.error('Appointment creation failed ' + error.error.message);
      }
    })
    
  }

  

}
