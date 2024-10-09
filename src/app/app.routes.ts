import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  // {
  //   path: '**',
  //   redirectTo: '/login',
  // },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
