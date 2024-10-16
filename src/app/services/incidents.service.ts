import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Incident, IncidentsCount } from '../shared/incident.model';
import { environment } from '../../environments/environment';
import { catchError, map, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';

export interface IncidentResponse {
  incidents: Incident[];
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class IncidentsService {
  private httpService = inject(HttpClient);
  private router = inject(Router);
  private toastrService = inject(ToastrService);
  url = `${environment.backendUrl}/incidents`;
  private incidents = signal<Incident[]>([]);
  private incidentsCount = signal<IncidentsCount | null>(null);

  // loadedIncidents = this.incidents.asReadonly();
  constructor() {}
  AddNewIncident(newIncident: Incident) {
    return this.httpService.put<Incident>(this.url + '/new', newIncident);
  }
  getIncidents() {
    return this.httpService
      .get<{ incidents: IncidentResponse }>(this.url + '/all')
      .pipe(
        map((response) => response.incidents),
        catchError((error) => {
          return throwError(
            () => new Error('Something went wrong, plase try again  ')
          );
        })
      );
  }

  loadUserIncidents() {
    return this.getIncidents().pipe(
      tap({
        next: (response: any) => {
          this.incidents.set(response);
          // console.log(this.incidents());
        },
      })
    );
  }
  get loadedIncidents() {
    return this.incidents.asReadonly();
  }

  get loadedIncidentsCount() {
    return this.incidentsCount.asReadonly();
  }

  getIncidentsCounts() {
    return this.httpService.get<IncidentsCount>(this.url + '/count').pipe(
      tap((response) => {
        this.incidentsCount.set(response);
      }),
      catchError((error) => {
        throw error;
        // return of(null); // Return an observable with null on error
      })
    );
  }
}
