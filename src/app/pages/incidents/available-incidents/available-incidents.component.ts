import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MaterialImportModule } from '../../../shared/material-import.module';
import { IncidentsService } from '../../../services/incidents.service';
import { ToastrService } from 'ngx-toastr';

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
  fetchedIncidents = this.incidentsService.loadUserIncidents;
  ngOnInit(): void {
    const subscription = this.incidentsService.getIncidents().subscribe({
      // next: () => {},
      error: (error) => {
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
