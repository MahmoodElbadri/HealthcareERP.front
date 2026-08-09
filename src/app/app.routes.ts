import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'doctors',
        loadChildren: () => import('./features/Doctors/doctors.routes').then((m) => m.DOCTORS_ROUTES)
    },
    {
        path: 'patients',
        loadChildren: () => import('./features/Patients/patients.routes').then((m) => m.PATIENTS_ROUTES)
    },
    {
        path: '',
        redirectTo: 'doctors',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'doctors',
        pathMatch: 'full'
    }
];
