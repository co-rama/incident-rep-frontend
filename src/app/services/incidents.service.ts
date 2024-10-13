import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Incident } from '../shared/incident.model';
import { environment } from '../../environments/environment';
import { catchError, map, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IncidentsService {
  private httpService = inject(HttpClient);
  private router = inject(Router);
  url = `${environment.backendUrl}/incidents`;
  private incidents = signal<Incident[]>([]);

  loadedIncidents = this.incidents.asReadonly();
  constructor() {}
  AddNewIncident(newIncident: Incident) {
    return this.httpService.put(this.url + '/new', newIncident);
  }
  getIncidents() {
    return this.httpService
      .get<{ incidents: Incident[] }>(this.url + '/all')
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
        next: (userIncidents) => this.incidents.set(userIncidents),
      })
    );
  }
}