import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { MaterialImportModule } from '../../../shared/material-import.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegionsService } from '../../../services/regions.service';
import { IncidentsService } from '../../../services/incidents.service';
import { ToastrService } from 'ngx-toastr';

interface Region {
  id: number;
  name: string;
}

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [MaterialImportModule, FormsModule, CommonModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss',
})
export class ActionsComponent implements OnInit {
  searchQuery: string = '';
  selectedCategories: string[] = [];
  selectedRegions: string[] = [];
  fromDate: Date | undefined = undefined;
  toDate: Date | undefined = undefined;
  create = signal(true);
  @Output() showCreationForm = new EventEmitter<boolean>();
  private regionsService = inject(RegionsService);
  private incidentsService = inject(IncidentsService);
  private toastrService = inject(ToastrService);
  private destroyRef = inject(DestroyRef);
  filtereredIncidents = this.incidentsService.loadRetrievedIncidents;
  categoryFilters = [
    { title: 'Vandalism' },
    { title: 'Vishoka' },
    { title: 'Theft' },
    { title: 'Rescue' },
    { title: 'Car Accident' },
  ];

  regions: any = [];
  loadingState = false;
  ngOnInit(): void {
    this.regionsService.getRegions().subscribe({
      next: (regions: Region[]) => {
        regions.forEach((region) => {
          const exists = regions.some((r: any) => r.title === region);
          if (!exists) {
            this.regions.push({ title: region.name });
            // console.log(region);
          }
        });
      },
      error: () => {},
    });
  }

  add() {
    this.showCreationForm.emit(true);
    this.create.set(false);
  }
  cancel() {
    this.showCreationForm.emit(false);
    this.create.set(true);
  }

  exportToExcel() {
    console.log('Exporting incidents');
  }

  searchByQuery() {
    console.log('Searching for incidents:', this.searchQuery);
  }

  applyFilters() {
    // Logic to apply filters based on selectedCategories and selectedRegions and date
    console.log(
      'Applying filters:',
      this.selectedCategories,
      this.selectedRegions,
      this.toDate,
      this.fromDate
    );
    this.loadingState = true;
    const subscription = this.incidentsService
      .getFilteredIncidents({
        categories: this.selectedCategories,
        regions: this.selectedRegions,
        from: this.fromDate ? this.fromDate : undefined,
        to: this.toDate ? this.toDate : undefined,
      })
      .subscribe({
        next: (response) => {
          this.loadingState = false;
          this.toastrService.success(response.message, 'Info');
          // console.log(response);
        },
        error: (error) => {
          this.loadingState = false;
          const message = error.error.message;
          this.toastrService.error(message);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
