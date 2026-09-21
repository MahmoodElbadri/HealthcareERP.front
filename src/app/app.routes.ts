import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth-guard';
import { adminGuard } from './core/auth/guards/admin-guard';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./features/Dasboard/dashboard-routes').then((m) => m.DASHBOARD_ROUTES),
        canActivate: [authGuard],
    },
    {
        path: 'doctors',
        loadChildren: () => import('./features/Doctors/doctors.routes').then((m) => m.DOCTORS_ROUTES),
        canActivate: [authGuard, adminGuard],
    },
    {
        path: 'patients',
        loadChildren: () => import('./features/Patients/patients.routes').then((m) => m.PATIENTS_ROUTES),
        canActivate: [authGuard, adminGuard],
    },
    {
        path: 'appointments',
        loadChildren: () => import('./features/Appointments/appointments.routes').then((m) => m.APPOINTMENT_ROUTES),
        canActivate: [authGuard, adminGuard],
    },
    {
        path: 'invoices',
        loadChildren: () => import('./features/Invoices/invoices.routes').then((m) => m.INVOICES_ROUTES),
        canActivate: [authGuard, adminGuard],
    },
    {
        path: 'auth',
        loadChildren: () => import('./core/auth/auth-routes').then((m) => m.AUTH_ROUTES),
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'auth',
        pathMatch: 'full'
    }
];
