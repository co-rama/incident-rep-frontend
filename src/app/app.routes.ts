import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainContainerComponent } from './navigation/main/main-container.component';
import { IncidentsComponent } from './pages/incidents/incidents.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { ReportsComponent } from './pages/reports/reports.component';

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
  {
    path: '',
    component: MainContainerComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'incidents',
        component: IncidentsComponent,
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
    ],
  },
];
