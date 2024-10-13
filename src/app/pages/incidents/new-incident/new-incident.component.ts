import { Component } from '@angular/core';
import { MaterialImportModule } from '../../../shared/material-import.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-incident',
  standalone: true,
  imports: [MaterialImportModule, FormsModule, CommonModule],
  templateUrl: './new-incident.component.html',
  styleUrl: './new-incident.component.scss',
})
export class NewIncidentComponent {
  items = [{ title: '', quantity: 0, cost: 0, specification: '' }];

  addItem() {
    this.items.push({ title: '', quantity: 0, cost: 0, specification: '' });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }
  submitNewIncident() {}
}
