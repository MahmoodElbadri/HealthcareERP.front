import { Routes } from "@angular/router";
import { LoginComponent } from "./login-component/login-component";

export const AUTH_ROUTES : Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full'
    },
    { path: '**', redirectTo: 'login' }
]