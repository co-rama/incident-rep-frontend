import { Component, signal } from '@angular/core';
import { MaterialImportModule } from '../../shared/material-import.module';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
};

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [MaterialImportModule],
  template: `
    <!-- <div class="sidenav-header">
      <div class="header-text">
        <h5>INC</h5>
      </div>
    </div> -->
    <mat-nav-list>
      @for(item of menuItems(); track item.label){
      <a mat-list-item>
        <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
        <span matListItemTitle>{{ item.label }}</span>
      </a>
      }
    </mat-nav-list>
  `,
  styles: [
    `
      mat-nav-list {
        margin-top: 35px;
      }
    `,
  ],
})
export class LeftSidebarComponent {
  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard',
    },
    {
      icon: 'analytics',
      label: 'Analytics',
      route: 'analytics',
    },
    {
      icon: 'comment',
      label: 'Comments',
      route: 'comment',
    },
  ]);
}
