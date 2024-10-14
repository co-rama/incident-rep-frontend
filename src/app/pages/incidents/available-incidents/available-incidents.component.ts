import { Component, DestroyRef, effect, inject, OnInit } from '@angular/core';
import { MaterialImportModule } from '../../../shared/material-import.module';
import { IncidentsService } from '../../../services/incidents.service';
import { ToastrService } from 'ngx-toastr';
import { Incident } from '../../../shared/incident.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-available-incidents',
  standalone: true,
  imports: [MaterialImportModule],
  templateUrl: './available-incidents.component.html',
  styleUrl: './available-incidents.component.scss',
})
export class AvailableIncidentsComponent implements OnInit {
  private incidentsService = inject(IncidentsService);
  private toastrService = inject(ToastrService);
  private destroyRef = inject(DestroyRef);
  loadingState: boolean = false;
  fetchedIncidents = this.incidentsService.loadedIncidents;
  // Material Table Implementation
  displayedColumns: string[] = [
    'title',
    'datetime',
    'category',
    'location',
    'region',
    'statement',
  ];
  dataSource = new MatTableDataSource<Incident>([]);
  constructor() {
    effect(() => {
      // Use the effect to reactively update the data source whenever incidents change
      this.dataSource = new MatTableDataSource<Incident>(
        this.fetchedIncidents()
      );
      // console.log(this.fetchedIncidents());
    });
  }
  ngOnInit(): void {
    this.loadingState = true;
    const subscription = this.incidentsService.loadUserIncidents().subscribe({
      // next: () => {},
      error: (error) => {
        this.loadingState = false;
        this.toastrService.error(error.message, 'Error');
      },
      complete: () => {
        this.loadingState = false;
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
