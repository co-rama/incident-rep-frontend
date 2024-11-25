import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MaterialImportModule } from '../../../shared/material-import.module';
import { WhistleblowService } from '../../../services/whistleblow.service';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blow-detail',
  standalone: true,
  imports: [MaterialImportModule, DatePipe, CommonModule],
  templateUrl: './blow-detail.component.html',
  styleUrl: './blow-detail.component.scss',
})
export class BlowDetailComponent implements OnInit {
  private blowService = inject(WhistleblowService);
  blow: any = this.blowService.loadClickedBlow;
  @Output() closeBlow = new EventEmitter<boolean>();
  backendUrl = `${environment.backendUrl}/`;
  fileType: string = '';
  close() {
    this.closeBlow.emit(true);
  }
  ngOnInit(): void {
    this.fileType = this.getFileExtension(this.blow().attachment);
  }
  getFileExtension(url: string): string {
    this.backendUrl = this.backendUrl + url;
    const lastDotIndex = this.backendUrl.lastIndexOf('.');
    if (lastDotIndex === -1) return ''; // If no dot is found, return an empty string
    console.log(this.backendUrl);
    return this.backendUrl.substring(lastDotIndex + 1).toLowerCase(); // Get the substring after the last dot and convert to lowercase
  }
}
