import { Component, inject } from '@angular/core';
import { MaterialImportModule } from '../../../shared/material-import.module';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Incident } from '../../../shared/incident.model';
import { IncidentsService } from '../../../services/incidents.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-incident',
  standalone: true,
  imports: [MaterialImportModule, FormsModule, CommonModule],
  templateUrl: './new-incident.component.html',
  styleUrl: './new-incident.component.scss',
})
export class NewIncidentComponent {
  items: Array<{
    title: string;
    quantity: string;
    cost: string;
    specification: string;
  }> = [{ title: '', quantity: '', cost: '', specification: '' }];
  private incidentsService = inject(IncidentsService);
  private toastrService = inject(ToastrService)
  loadingState: boolean = false;
  toastr: any;
  destroyRef: any;

  addItem() {
    this.items.push({ title: '', quantity: '', cost: '', specification: '' });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }
  submitNewIncident(newIncidentForm: NgForm) {
    // console.log(newIncidentForm);
    if (newIncidentForm.invalid) {
      return;
    }
    const structuredItems = this.items.map((item) => ({
      title: item.title,
      quantity: item.quantity,
      cost: item.cost,
      specification: item.specification,
    }));

    const newIncident: Incident = {
      title: newIncidentForm.value.title,
      datetime: newIncidentForm.value.date,
      location: newIncidentForm.value.location,
      region: newIncidentForm.value.region,
      category: newIncidentForm.value.category,
      statement: newIncidentForm.value.statement,
      items: structuredItems,
    };
    // console.log(newIncident);
    this.loadingState = true;
    const subscription = this.incidentsService
      .AddNewIncident(newIncident)
      .subscribe({
        next: () => {
          this.loadingState = false;
          this.toastrService.success('Incident Saved Successfuly', 'Info');
        },
        error: (error) => {
          this.loadingState = false;
          const message = error.error.message;
          this.toastrService.error(message, 'Error:');
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
