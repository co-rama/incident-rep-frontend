import { Component } from '@angular/core';
import { MaterialImportModule } from '../../../shared/material-import.module';

@Component({
  selector: 'app-available-incidents',
  standalone: true,
  imports: [MaterialImportModule],
  templateUrl: './available-incidents.component.html',
  styleUrl: './available-incidents.component.scss',
})
export class AvailableIncidentsComponent {}
