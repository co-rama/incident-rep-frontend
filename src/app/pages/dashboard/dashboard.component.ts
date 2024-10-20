import {
  Component,
  DestroyRef,
  HostListener,
  inject,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialImportModule } from '../../shared/material-import.module';
import { BaseChartDirective } from 'ng2-charts';
import { isPlatformBrowser } from '@angular/common';
import { IncidentsService } from '../../services/incidents.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialImportModule, CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  isBrowser: boolean;
  private incidentsService = inject(IncidentsService);
  private toastrService = inject(ToastrService);
  private destroyRef = inject(DestroyRef);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  fetchedIncidentsCount$ = this.incidentsService.loadedIncidentsCount;
  loadingState: boolean = false;

  isLargeScreen: boolean = true;

  chartData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Incidents',
        data: [5, 10, 8, 12, 15, 30, 12, 16, 0, 15],
        backgroundColor: 'rgba(63, 81, 181, 0.5)',
        borderColor: 'rgba(63, 81, 181, 1)',
        borderWidth: 1,
      },
    ],
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (typeof window !== 'undefined') {
      // Safe to use window here
      this.isLargeScreen = window.innerWidth >= 600;
    }
  }

  ngOnInit() {
    this.onResize();
    this.loadingState = true;
    const subscription = this.incidentsService.getIncidentsCounts().subscribe({
      next: () => {},
      error: (error) => {
        this.loadingState = false;
        const message = error.error.message;
        console.log(error);
        this.toastrService.error(message, 'Error');
      },
      complete: () => {
        this.loadingState = false;
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
