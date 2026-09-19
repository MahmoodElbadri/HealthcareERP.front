import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./features/Dasboard/dashboard-routes').then((m) => m.DASHBOARD_ROUTES)
    },
    {
        path: 'doctors',
        loadChildren: () => import('./features/Doctors/doctors.routes').then((m) => m.DOCTORS_ROUTES)
    },
    {
        path: 'patients',
        loadChildren: () => import('./features/Patients/patients.routes').then((m) => m.PATIENTS_ROUTES)
    },
    {
        path: 'appointments',
        loadChildren: () => import('./features/Appointments/appointments.routes').then((m) => m.APPOINTMENT_ROUTES)
    },
    {
        path: 'invoices',
        loadChildren: () => import('./features/Invoices/invoices.routes').then((m) => m.INVOICES_ROUTES)
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];
