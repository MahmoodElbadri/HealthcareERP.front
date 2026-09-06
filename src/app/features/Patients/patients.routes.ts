import { Routes } from '@angular/router';
import { PatientListComponent } from './patient-list-component/patient-list-component';
import { PatientFormComponent } from './patient-form-component/patient-form-component';
import { PatientProfileComponent } from './patient-profile-component/patient-profile-component';

export const PATIENTS_ROUTES: Routes = [
    {
        path: '',
        component: PatientListComponent,
        title: 'Patients'
    },
    {
        path: 'add-patient',
        component: PatientFormComponent,
        title: 'Add Patient'
    },
    {
        path: 'edit-patient/:id',
        component: PatientFormComponent,
        title: 'Edit Patient'
    },
    {
        path: 'profile/:id',
        component: PatientProfileComponent,
        title: 'Patient Profile'
    }
];
