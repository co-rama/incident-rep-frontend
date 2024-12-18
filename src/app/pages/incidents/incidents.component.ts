import { Component, inject, OnInit, signal } from '@angular/core';
import { MaterialImportModule } from '../../shared/material-import.module';
import { NewIncidentComponent } from './new-incident/new-incident.component';
import { AvailableIncidentsComponent } from './available-incidents/available-incidents.component';
import { ActionsComponent } from './actions/actions.component';
import { SearchedIncidentsComponent } from './searched-incidents/searched-incidents.component';
import { IncidentDetailsComponent } from './incident-details/incident-details.component';

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [
    MaterialImportModule,
    NewIncidentComponent,
    AvailableIncidentsComponent,
    ActionsComponent,
    SearchedIncidentsComponent,
    IncidentDetailsComponent,
  ],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.scss',
})
export class IncidentsComponent implements OnInit {
  create = signal(false);
  showFilteredResults = false;
  showIncidentDetails = false;
  // loadingState: boolean = false;
  ngOnInit(): void {}

  handleConnectionChange(event: boolean) {
    this.create.set(event);
  }
  onShowResultsFiltered(event: boolean) {
    this.showFilteredResults = event; // Show the search results component
  }
  onShowIncidentDetails(event: boolean) {
    this.showIncidentDetails = event;
    this.resetSearchResults();
  }
  onCloseIncidentDetails(event: boolean) {
    this.showFilteredResults = true;
    this.showIncidentDetails = !event;
  }
  resetSearchResults() {
    this.showFilteredResults = false; // Hide the search results component
  }
}
