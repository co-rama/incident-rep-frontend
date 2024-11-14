import {
  Component,
  DestroyRef,
  effect,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { WhistleblowService } from '../../services/whistleblow.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MaterialImportModule } from '../../shared/material-import.module';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TruncateTextPipe } from '../../shared/truncate-text.pipe';
import { BlowDetailComponent } from './blow-detail/blow-detail.component';

@Component({
  selector: 'app-whistleblow',
  standalone: true,
  imports: [
    MaterialImportModule,
    DatePipe,
    TruncateTextPipe,
    BlowDetailComponent,
  ],
  templateUrl: './whistleblow.component.html',
  styleUrl: './whistleblow.component.scss',
})
export class WhistleblowComponent {
  private whistleService = inject(WhistleblowService);
  private destroyRef = inject(DestroyRef);
  private toastrService = inject(ToastrService);
  fetchedWistles = this.whistleService.loadedWhistles;

  // Material Table Implementation
  displayedColumns: string[] = [
    'Taarifa',
    'Reported ON',
    'Location',
    'Whistleblower',
    'Phone',
    'Action',
  ];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loadingState = false;
  @Output() showDetailedBlow = new EventEmitter<boolean>();
  showBlow = false;
  constructor() {
    effect(() => {
      // Use the effect to reactively update the data source whenever incidents change
      this.dataSource = new MatTableDataSource<any>(this.fetchedWistles());
      // console.log(this.fetchedIncidents());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  ngOnInit(): void {
    this.reloadBlow();
  }
  viewBlow(blow: any) {
    this.whistleService.setClickedBlow(blow);
    this.showBlow = true;
  }
  onShowBlowDetails(event: boolean) {}
  onCloseBlow(event: boolean) {
    this.showBlow = !event;
  }
  reloadBlow() {
    this.loadingState = true;
    const subscription = this.whistleService.loadWhistles().subscribe({
      next: () => {
        this.loadingState = false;
        this.toastrService.success('Whistlesblows Fetched Successfully');
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
}
