import { Routes } from "@angular/router";
import { AppointmentFormComponent } from "./appointment-form-component/appointment-form-component";
import { AppointmentListComponent } from "./appointment-list-component/appointment-list-component";

export const APPOINTMENT_ROUTES: Routes = [
    { path: 'add', component: AppointmentFormComponent, 
        title: 'Add Appointment'
    },
    { path: '', component: AppointmentListComponent,
        title: 'Appointment List'
    }
]