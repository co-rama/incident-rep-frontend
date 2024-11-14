import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MaterialImportModule } from '../../../shared/material-import.module';
import { WhistleblowService } from '../../../services/whistleblow.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blow-detail',
  standalone: true,
  imports: [MaterialImportModule, DatePipe],
  templateUrl: './blow-detail.component.html',
  styleUrl: './blow-detail.component.scss',
})
export class BlowDetailComponent implements OnInit {
  private blowService = inject(WhistleblowService);
  blow: any = this.blowService.loadClickedBlow;
  @Output() closeBlow = new EventEmitter<boolean>();
  close() {
    this.closeBlow.emit(true);
  }
  ngOnInit(): void {}
}
