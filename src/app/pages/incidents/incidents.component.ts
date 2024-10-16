import { Component, inject, OnInit, signal } from '@angular/core';
import { MaterialImportModule } from '../../shared/material-import.module';
import { NewIncidentComponent } from './new-incident/new-incident.component';
import { AvailableIncidentsComponent } from './available-incidents/available-incidents.component';

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [
    MaterialImportModule,
    NewIncidentComponent,
    AvailableIncidentsComponent,
  ],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.scss',
})
export class IncidentsComponent implements OnInit {
  create = signal(false);
  // loadingState: boolean = false;
  ngOnInit(): void {}
}
