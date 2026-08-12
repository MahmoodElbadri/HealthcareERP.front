import { Component, inject, OnInit } from '@angular/core';
import { DoctorDto } from '../../Doctors/models/DoctorDto';
import { PatientDto } from '../../Patients/models/patient-dto';
import { AppointmentDTO } from '../models/appointment-dto';
import { FormGroup } from '@angular/forms';
import { AppointmentService } from '../appointment-service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiResponse } from '../../../core/ApiResponse';

@Component({
  selector: 'app-appointment-list-component',
  imports: [DatePipe, FormsModule],
  templateUrl: './appointment-list-component.html',
  styleUrl: './appointment-list-component.css',
})
export class AppointmentListComponent implements OnInit {
  //injections
  private appointmentService = inject(AppointmentService);
  private toastr = inject(ToastrService);
  
  //vars
  public appointments: AppointmentDTO[] = [];
  public doctors: DoctorDto[] = [];
  protected selectedDoctor: number = 0;

  //methods
  ngOnInit(): void {
    this.loadAppointments();
    this.getDoctors();
  }

  // getStatusText(status: string){
  //   switch(status){
  //     case 'Pending':
  //       return 'Pending';
  //     case 'Confirmed':
  //       return 'Confirmed';
  //     case 'Completed':
  //       return 'Completed';
  //     case 'Cancelled':
  //       return 'Cancelled';
  //     default:
  //       return 'Unknown';
  //   }
  // }

  private async loadAppointments() {
    await this.appointmentService.getAllAppointments().subscribe({
      next: (response) => {
        this.appointments = response.data;
      },
      error: (error) => {
        this.toastr.error(error.error);
      },
    });
  }

  private getDoctors(){
    this.appointmentService.getDoctors().subscribe({
      next: (response) => {
        this.doctors = response.data;
      },
      error: (error) => {
        this.toastr.error(error.error);
      },
    });
  }

  getDoctorAppointments(doctorId: number){
    this.appointmentService.getDoctorAppointments(doctorId).subscribe({
      next: (response: ApiResponse<AppointmentDTO[]>) => {
        this.appointments = response.data;
      },
      /*{
    "isSuccess": false,
    "message": "No appointments found for this doctor with Id 7",
    "data": null,
    "errors": [
        "No appointments found for this doctor with Id 7"
    ]
}
    */
      error: (error) => {
        this.toastr.error(error.error.message);
      },
    });
  }

  onChange(){
    if(this.selectedDoctor > 0){
      this.getDoctorAppointments(this.selectedDoctor);
    }else{
      this.loadAppointments();
    }
  }
}
