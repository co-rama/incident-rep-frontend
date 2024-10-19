import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MaterialImportModule } from '../../../shared/material-import.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [MaterialImportModule, FormsModule, CommonModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss',
})
export class ActionsComponent {
  searchQuery: string = '';
  selectedFilters: string[] = [];
  selectedRegions: string[] = [];
  fromDate: Date | null = null;
  toDate: Date | null = null;
  create = signal(true);
  @Output() showCreationForm = new EventEmitter<boolean>();
  incidents = [
    { title: 'Vandalism in Arusha', category: 'Vandalism', region: 'Arusha' },
    { title: 'Theft in Iringa', category: 'Theft', region: 'Iringa' },
    { title: 'Kishoka Incident', category: 'Kishoka', region: 'Dar es Salaam' },
    // Add more incidents here as needed
  ];

  filters = [{ title: 'Vandalism' }, { title: 'Kishoka' }, { title: 'Theft' }];

  regions = [
    { title: 'Arusha' },
    { title: 'Iring' },
    { title: 'Dar es Salaam' },
    // Add more regions here as needed
  ];

  add() {
    // Logic to open a dialog for adding a new incident
    this.showCreationForm.emit(true);
    this.create.set(false);
  }
  cancel() {
    this.showCreationForm.emit(false);
    this.create.set(true);
  }

  exportToExcel() {
    // Logic to export incidents to Excel
    console.log('Exporting incidents');
  }

  searchByQuery() {
    // Logic to search incidents based on searchQuery
    console.log('Searching for incidents:', this.searchQuery);
  }

  applyFilters() {
    // Logic to apply filters based on selectedFilters and selectedRegions
    console.log(
      'Applying filters:',
      this.selectedFilters,
      this.selectedRegions
    );
  }

  filterIncidents(incidents: any) {
    return incidents.filter(
      (incident: {
        title: string;
        category: string;
        region: string;
        date: Date;
      }) => {
        const matchesSearch = this.searchQuery
          ? incident.title
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
          : true;
        const matchesCategory = this.selectedFilters.length
          ? this.selectedFilters.includes(incident.category)
          : true;
        const matchesRegion = this.selectedRegions.length
          ? this.selectedRegions.includes(incident.region)
          : true;
        const matchesDateRange = this.dateInRange(incident.date); // Assuming incident.date is a Date object

        return (
          matchesSearch && matchesCategory && matchesRegion && matchesDateRange
        );
      }
    );
  }

  dateInRange(date: Date) {
    if (this.fromDate && this.toDate) {
      return date >= this.fromDate && date <= this.toDate;
    }
    return true; // If no date filter is applied, include the date
  }
}
