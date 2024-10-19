import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Filters, Incident, IncidentsCount } from '../shared/incident.model';
import { environment } from '../../environments/environment';
import { catchError, map, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { AuthResponse } from '../auth/login/auth.model';

export interface IncidentResponse {
  incidents: Incident[];
  success?: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class IncidentsService {
  private httpService = inject(HttpClient);
  private authService = inject(AuthService);
  url = `${environment.backendUrl}/incidents`;
  private incidents = signal<Incident[]>([]);
  private incidentsCount = signal<IncidentsCount | null>(null);
  private retrievedIncidents = signal<Incident[]>([]);
  private options = signal<any | null>(null);

  // loadedIncidents = this.incidents.asReadonly();
  constructor() {
    this.options.set(this.authService.getOptions());
  }
  AddNewIncident(newIncident: Incident) {
    return this.httpService.put<Incident>(
      this.url + '/new',
      newIncident,
      this.authService.getOptions()
    );
  }
  getIncidents() {
    return this.httpService
      .get<{ incidents: IncidentResponse }>(
        this.url + '/all',
        this.authService.getOptions()
      )
      .pipe(
        map((response) => response.incidents),
        catchError((error) => {
          throw error;
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

  get loadRetrievedIncidents() {
    return this.retrievedIncidents.asReadonly();
  }

  getIncidentsCounts() {
    return this.httpService
      .get<IncidentsCount>(this.url + '/count', this.authService.getOptions())
      .pipe(
        tap((response) => {
          this.incidentsCount.set(response);
        }),
        catchError((error) => {
          throw error;
          // return of(null); // Return an observable with null on error
        })
      );
  }
  getIncidentsByDate(from: string, to: string) {
    return this.httpService
      .get<IncidentResponse>(
        `${this.url}/date/from/${from}/to/${to}`,
        this.authService.getOptions()
      )
      .pipe(
        tap((response) => {
          this.retrievedIncidents.set(response.incidents);
        }),
        catchError((error) => {
          throw error;
          // return of(null); // Return an observable with null on error
        })
      );
  }
  getSearchedIncidents(search_query: string) {
    return this.httpService
      .get<IncidentResponse>(
        `${this.url}/search/${search_query}`,
        this.authService.getOptions()
      )
      .pipe(
        tap((response) => {
          this.retrievedIncidents.set(response.incidents);
        }),
        catchError((error) => {
          throw error;
          // return of(null); // Return an observable with null on error
        })
      );
  }
  getFilteredIncidents(filters: Filters) {
    let params = new HttpParams();
    params = this.setQueryParams(filters);

    return this.httpService
      .get<IncidentResponse>(
        `${this.url}/${params}`,
        this.authService.getOptions()
      )
      .pipe(
        tap((response) => {
          this.retrievedIncidents.set(response.incidents);
        }),
        catchError((error) => {
          throw error;
          // return of(null); // Return an observable with null on error
        })
      );
  }
  setQueryParams(filters: Filters) {
    let params = new HttpParams();

    // Iterate over the keys with type assertion to avoid TypeScript error
    (Object.keys(filters) as (keyof Filters)[]).forEach((key) => {
      const value = filters[key];
      if (value) {
        params = params.set(key, value);
      }
    });

    return params;
  }
  deleteIncident(id: string) {
    return this.httpService
      .delete(`${this.url}/delete/${id}`, this.authService.getOptions())
      .pipe(
        tap(),
        catchError((error) => {
          throw error;
          // return of(null); // Return an observable with null on error
        })
      );
  }
}
