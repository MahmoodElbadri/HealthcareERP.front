import { Routes } from '@angular/router';
import { PatientListComponent } from './patient-list-component/patient-list-component';
import { PatientFormComponent } from './patient-form-component/patient-form-component';

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
    }
];
