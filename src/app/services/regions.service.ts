import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type Region = {
  id: number;
  name: string;
};

@Injectable({
  providedIn: 'root',
})
export class RegionsService {
  constructor(private httpService: HttpClient) {}

  getRegions(): Observable<Region[]> {
    return this.httpService.get<Region[]>('/regions.json');
  }
}
