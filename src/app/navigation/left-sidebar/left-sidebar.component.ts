import { Component, Input, signal } from '@angular/core';
import { MaterialImportModule } from '../../shared/material-import.module';
import { Router, RouterLink } from '@angular/router';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
};

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [MaterialImportModule, RouterLink],
  template: `
    <!-- <div class="sidenav-header">
      <div class="header-text">
        <h5>INC</h5>
      </div>
    </div> -->
    <mat-nav-list>
      @for(item of menuItems(); track item.label){
      <a mat-list-item [routerLink]="item.route" routerLinkActive="active">
        <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
        @if(!sideNavCollapsed()){
        <span matListItemTitle>{{ item.label }}</span>
        }
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
      icon: 'security-update-warning',
      label: 'Incidents',
      route: 'incidents',
    },
    {
      icon: 'analytics',
      label: 'Analytics',
      route: 'analytics',
    },
    {
      icon: 'comment',
      label: 'Reports',
      route: 'reports',
    },
  ]);
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }
}
