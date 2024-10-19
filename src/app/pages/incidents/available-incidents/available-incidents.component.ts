import {
  AfterViewInit,
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { MaterialImportModule } from '../../../shared/material-import.module';
import { IncidentsService } from '../../../services/incidents.service';
import { ToastrService } from 'ngx-toastr';
import { Incident } from '../../../shared/incident.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-available-incidents',
  standalone: true,
  imports: [MaterialImportModule, DatePipe],
  templateUrl: './available-incidents.component.html',
  styleUrl: './available-incidents.component.scss',
})
export class AvailableIncidentsComponent implements OnInit, AfterViewInit {
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
    'action',
  ];
  dataSource = new MatTableDataSource<Incident>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      // Use the effect to reactively update the data source whenever incidents change
      this.dataSource = new MatTableDataSource<Incident>(
        this.fetchedIncidents()
      );
      // console.log(this.fetchedIncidents());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  ngOnInit(): void {
    this.loadingState = true;
    const subscription = this.incidentsService.loadUserIncidents().subscribe({
      next: () => {
        this.loadingState = false;
      },
      error: (error) => {
        this.loadingState = false;
        const message = error.error.message;
        console.error(error);
        this.toastrService.error(message, 'Error');
      },
      complete: () => {
        this.loadingState = false;
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
}
