import { Routes } from '@angular/router';
import { DoctorListComponent } from './doctor-list-component/doctor-list-component';
import { DoctorFormComponent } from './doctor-form-component/doctor-form-component';

export const DOCTORS_ROUTES: Routes = [
    {
        path: '',
        component: DoctorListComponent,
        title: 'Doctors'
    },
    {
        path: 'add-doctor',
        component: DoctorFormComponent,
        title: 'Add Doctor'
    },
    {
        path: 'edit-doctor/:id',
        component: DoctorFormComponent,
        title: 'Edit Doctor'
    }
];