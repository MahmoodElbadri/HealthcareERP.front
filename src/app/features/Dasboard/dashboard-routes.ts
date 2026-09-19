import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard-component/dashboard-component";

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '', component: DashboardComponent,
        title: 'Dashboard'
    }
]