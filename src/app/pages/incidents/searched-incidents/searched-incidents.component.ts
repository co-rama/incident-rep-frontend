import {
  Component,
  DestroyRef,
  effect,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IncidentsService } from '../../../services/incidents.service';
import { MaterialImportModule } from '../../../shared/material-import.module';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { Incident } from '../../../shared/incident.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-searched-incidents',
  standalone: true,
  imports: [MaterialImportModule, CommonModule],
  templateUrl: './searched-incidents.component.html',
  styleUrl: './searched-incidents.component.scss',
})
export class SearchedIncidentsComponent implements OnInit {
  private incidentsService = inject(IncidentsService);
  private toastrService = inject(ToastrService);
  private destroyRef = inject(DestroyRef);
  loadingState: boolean = false;
  filteredIncidents = this.incidentsService.loadRetrievedIncidents;
  @Output() showDetailedItem = new EventEmitter<boolean>();
  // Material Table Implementation
  displayedColumns: string[] = [
    'title',
    'datetime',
    'category',
    'location',
    'region',
    'statement',
    'action',
  ];
  dataSource = new MatTableDataSource<Incident>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      // Use the effect to reactively update the data source whenever incidents change
      this.dataSource = new MatTableDataSource<Incident>(
        this.filteredIncidents()
      );
      // console.log(this.fetchedIncidents());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {}
  onRowClick(clickedIncident: Incident) {
    this.incidentsService.setClickedIncident(clickedIncident);
    this.showDetailedItem.emit(true);
  }
}
