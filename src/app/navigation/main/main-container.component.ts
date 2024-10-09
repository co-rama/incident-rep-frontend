import { Component } from '@angular/core';
import { MaterialImportModule } from '../../shared/material-import.module';
import { RouterOutlet } from '@angular/router';
import { LeftSidebarComponent } from '../left-sidebar/left-sidebar.component';

@Component({
  selector: 'app-main-sidebar',
  standalone: true,
  imports: [MaterialImportModule, RouterOutlet, LeftSidebarComponent],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
})
export class MainContainerComponent {}
