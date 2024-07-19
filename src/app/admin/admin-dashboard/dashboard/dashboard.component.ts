import { Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    CommonModule,
    RouterLink,
    RouterOutlet,
  ],
})
export class DashboardComponent {
  constructor(private router: Router) {}
  isExpanded = false;
  element!: HTMLElement;

  toggleMenu(): void {
    this.isExpanded = !this.isExpanded;
  }
  toggleActive(event: any) {
    event.preventDefault();
    if (this.element !== undefined) {
      this.element.style.backgroundColor = 'white';
    }
    var target = event.currentTarget;
    target.style.backgroundColor = '#EC7063';
    this.element = target;
  }

  logout(): void {
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
    this.router.navigate(['/login']);
  }
}
