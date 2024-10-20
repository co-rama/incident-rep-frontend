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

  // loadedIncidents = this.incidents.asReadonly();
  constructor() {}
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
  getFilteredIncidents(params: Filters) {
    let httpParams = new HttpParams();

    // Add categories as a comma-separated string if provided
    if (params.categories?.length) {
      httpParams = httpParams.set('category', params.categories.join(','));
    }
    // Add regions as a comma-separated string if provided
    if (params.regions?.length) {
      httpParams = httpParams.set('region', params.regions.join(','));
    }
    // Add dates if provided
    if (params.from)
      httpParams = httpParams.set('from', params.from.toISOString());
    if (params.to) httpParams = httpParams.set('to', params.to.toISOString());

    // Send the request with dynamic query parameters
    return this.httpService
      .get<IncidentResponse>(`${this.url}/filters`, {
        params: httpParams,
        ...this.authService.getOptions(),
      })
      .pipe(
        tap((response) => {
          this.retrievedIncidents.set(response.incidents);
        }),
        catchError((error) => {
          this.retrievedIncidents.set([]);
          console.error('Error fetching incidents:', error);
          throw error;
        })
      );
  }

  getIncidentsByDateUnused(from: string, to: string) {
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
