import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { IncidentsService } from '../../../services/incidents.service';
import { MaterialImportModule } from '../../../shared/material-import.module';
// import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-incident-details',
  standalone: true,
  imports: [MaterialImportModule, CommonModule],
  templateUrl: './incident-details.component.html',
  styleUrl: './incident-details.component.scss',
})
export class IncidentDetailsComponent implements OnInit {
  private incidentsService = inject(IncidentsService);
  incident = this.incidentsService.getClickedIncident;
  @Output() closeDetails = new EventEmitter<boolean>();
  close() {
    this.closeDetails.emit(true);
  }
  ngOnInit(): void {}
}
