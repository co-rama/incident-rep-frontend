import { Component } from '@angular/core';
import { MaterialImportModule } from '../../../shared/material-import.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-incident',
  standalone: true,
  imports: [MaterialImportModule, FormsModule],
  templateUrl: './new-incident.component.html',
  styleUrl: './new-incident.component.scss',
})
export class NewIncidentComponent {
submitNewIncident() {
}
}
