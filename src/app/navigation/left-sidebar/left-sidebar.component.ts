import { Component, inject, Input, signal } from '@angular/core';
import { MaterialImportModule } from '../../shared/material-import.module';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
};

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [MaterialImportModule, RouterLink, RouterModule],
  template: `
    <!-- <div class="sidenav-header">
      <div class="header-text">
        <h5>INC</h5>
      </div>
    </div> -->
    <mat-nav-list>
      @for(item of menuItems(); track item.label){
      <a
        mat-list-item
        [routerLink]="item.route"
        routerLinkActive="selected-menu-item"
        #rla="routerLinkActive"
        [activated]="rla.isActive"
      >
        <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
        @if(!sideNavCollapsed()){
        <span matListItemTitle>{{ item.label }}</span>
        }
      </a>
      }
    </mat-nav-list>
    <span class="spacer"></span>
    <div class="logout-div">
      <button
        mat-raised-button
        color="primary"
        (click)="logout()"
        class="logout-btn"
      >
        <mat-icon [style.margin-right]="0">logout</mat-icon>
        @if(!sideNavCollapsed()){
        <span>Logout</span>
        }
      </button>
    </div>
  `,
  styles: [
    `
      mat-nav-list {
        margin-top: 35px;
      }
      .selected-menu-item {
        border-radius: 0px;
        border-left: 5px solid;
        border-left-color: blue;
        border-top-left-radius: 0 !important; /* Ensure no top-left radius */
        border-bottom-left-radius: 0 !important; /* Ensure no bottom-left radius */
      }

      .logout-btn {
        margin-top: auto; /* Pushes the logout button to the bottom */
        margin: 10px;

        &:hover {
          background-color: #d32f2f !important; /* Darker red on hover */
          color: white;
        }

        mat-icon {
          margin-right: 8px;
        }
      }
      .logout-div {
        margin-top: 40px;
        // border: solid 1px black;
        display: flex;
        justify-content: flex-start;
      }
    `,
  ],
})
export class LeftSidebarComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
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
  logout() {
    this.authService.logout();
  }
}
