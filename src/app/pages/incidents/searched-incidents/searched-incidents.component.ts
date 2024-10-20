import { Component, inject, OnInit } from '@angular/core';
import { IncidentsService } from '../../../services/incidents.service';

@Component({
  selector: 'app-searched-incidents',
  standalone: true,
  imports: [],
  templateUrl: './searched-incidents.component.html',
  styleUrl: './searched-incidents.component.scss',
})
export class SearchedIncidentsComponent implements OnInit {
  private incidentsService = inject(IncidentsService);
  filtereredIncidents = this.incidentsService.loadRetrievedIncidents;

  ngOnInit(): void {}
}
