import {
  AfterViewInit,
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IncidentsService } from '../../services/incidents.service';
import { Incident } from '../../shared/incident.model';
// import { NgChartsModule } from 'ng2-charts';
import { MaterialImportModule } from '../../shared/material-import.module';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Chart,
  ArcElement,
  CategoryScale,
  ChartTypeRegistry,
  Legend,
  Title,
  Tooltip,
  DoughnutController,
  PieController,
} from 'chart.js';

Chart.register(
  ArcElement,
  CategoryScale,
  Legend,
  Title,
  Tooltip,
  DoughnutController,
  PieController
);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [MaterialImportModule, CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  // Signals to store incidents, grouped data, and categories
  // incidents = signal<Incident[]>([]);
  groupedData = signal<Record<string, Record<string, number>>>({});
  categories = signal<string[]>([]);
  loadingState = false;
  // Inject services
  private incidentsService = inject(IncidentsService);
  private toastrService = inject(ToastrService);
  private destroyRef = inject(DestroyRef);

  private chartInstances: Chart[] = [];

  loadedIncidents = this.incidentsService.loadedIncidents;
  loadedIncidentsWithin = signal<any>([]);

  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  isSmallScreenFlag: boolean = false;

  colorPalette = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
    '#B4FF9F',
    '#FF8474',
    '#FFD3B6',
    '#B6FFCE',
    '#FFC3A0',
    '#7F00FF',
    '#0FF1CE',
    '#FF6F61',
    '#6B5B95',
    '#88B04B',
    '#F7CAC9',
    '#92A8D1',
    '#F5F5DC',
    '#F0E68C',
    '#FF4500',
    '#2E8B57',
    '#4682B4',
    '#D2691E',
    '#B22222',
    '#8A2BE2',
    '#DAA520',
    '#5F9EA0',
    '#FF69B4',
    '#CD5C5C',
    '#87CEFA',
    '#B0C4DE',
    '#FA8072',
    '#EE82EE',
    '#98FB98',
    '#8FBC8F',
    '#F08080',
    '#FFE4B5',
    '#4682B4',
  ];

  constructor(private breakpointObserver: BreakpointObserver) {
    effect(
      () => {
        if (this.loadedIncidentsWithin().length > 0) {
          this.setupEffect(this.loadedIncidentsWithin());
          // this.renderCharts();
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((state) => {
        this.isSmallScreenFlag = state.matches; // Update based on screen size
      });
    this.loadIncidentsTimely();
    // this.setupEffect();
    // this.incidentsService.loadUserIncidents().subscribe({ next: () => {} });

    this.loadingState = true;
    if (
      this.loadedIncidents().length > 0 &&
      this.loadedIncidentsWithin().length <= 0
    ) {
      this.loadingState = false;
      this.setupEffect(this.loadedIncidents()); // Render charts when categories are populated
    }
  }
  isSmallScreen() {
    return this.isSmallScreenFlag;
  }
  loadIncidentsTimely() {
    this.loadingState = true;
    const subscription = this.incidentsService.loadUserIncidents().subscribe({
      next: (result) => {
        this.loadingState = false;
        this.loadedIncidentsWithin.set(result);
        console.log(this.loadedIncidents());
        // this.renderCharts();
      },
      error: (error) => {
        this.loadingState = false;
        const message = error.error.message;
        console.error(error);
        this.toastrService.error(message, 'Error');
      },
      complete: () => {
        this.loadingState = false;
        // this.renderCharts();
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
    // this.incidents.set(this.loadedIncidents());
  }

  setupEffect(loadedIncidents: any) {
    const grouped = this.groupIncidentsByCategoryAndRegion(loadedIncidents);
    this.groupedData.set(grouped); // Set the grouped data
    this.categories.set(Object.keys(grouped)); // Set the categories

    if (this.loadedIncidentsWithin().length > 0) {
      this.renderCharts();
    }
  }
  ngAfterViewInit(): void {
    this.renderCharts();
  }

  // Helper function to group data for charts
  private groupIncidentsByCategoryAndRegion(incidents: Incident[]) {
    return incidents.reduce(
      (acc: Record<string, Record<string, number>>, incident) => {
        const { category, region } = incident;

        // Initialize category if not already present
        if (!acc[category]) {
          acc[category] = {};
        }

        // Initialize region count if not already present
        if (!acc[category][region]) {
          acc[category][region] = 0;
        }

        // Increment the count for this category-region pair
        acc[category][region]++;
        // console.log(acc);
        return acc;
      },
      {}
    );
  }
  renderCharts(): void {
    // Destroy old charts if any
    this.chartInstances.forEach((chart) => chart.destroy());
    this.chartInstances = [];

    let i = 1;
    this.categories().forEach((category) => {
      console.log(i++);
      const chartData = this.createChartData(this.groupedData()[category]);
      // console.log(
      //   'Data for this category:',
      //   this.createChartData(this.groupedData()[category])
      // );

      const canvasId = `chart${category}`;
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      const ctx = canvas?.getContext('2d');

      if (ctx) {
        // Create the chart with explicit typing for options
        console.log(`Rendering chart for category: ${category}`);
        const chartConfig = {
          type: 'pie',
          data: chartData,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            },
          },
        };

        // Create the chart with typed configuration
        const chart = new Chart(ctx, chartConfig as any);

        this.chartInstances.push(chart); // Push the created chart into the array
      } else {
        console.error(`Canvas with ID ${canvasId} not found.`);
      }
    });
  }
  createChartData(categoryData: Record<string, number>) {
    const backgroundColors = this.colorPalette.slice(
      0,
      Object.keys(categoryData).length
    );
    return {
      labels: Object.keys(categoryData), // Regions
      datasets: [
        {
          data: Object.values(categoryData), // Incident counts
          backgroundColor: backgroundColors, // Color array
        },
      ],
    };
  }
}
