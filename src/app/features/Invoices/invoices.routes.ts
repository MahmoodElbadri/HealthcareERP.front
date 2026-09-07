import { Routes } from '@angular/router';
import { InvoicesListComponent } from './invoices-list-component/invoices-list-component';

export const INVOICES_ROUTES: Routes = [
    {
        path: '',
        component: InvoicesListComponent,
        title: 'Invoices & Billing'
    }
];
