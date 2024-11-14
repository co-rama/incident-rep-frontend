import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhistleblowService {
  private httpService = inject(HttpClient);
  private url = `${environment.backendUrl}/whistleblow`;
  private whistles = signal<[]>([]);
  private clickedBlow = signal({});
  constructor() {}
  getWhistles() {
    return this.httpService.get<any>(this.url + '/all').pipe(
      map((response) => {
        response.whistles;
      }),
      catchError((error) => {
        throw error;
      })
    );
  }
  loadWhistles() {
    return this.httpService.get<any>(this.url + '/all').pipe(
      tap({
        next: (response: any) => {
          this.whistles.set(response.whistles);
        },
      })
    );
  }
  setClickedBlow(blow: any) {
    this.clickedBlow.set(blow);
  }
  get loadClickedBlow() {
    return this.clickedBlow.asReadonly();
  }
  get loadedWhistles() {
    return this.whistles.asReadonly();
  }
}
