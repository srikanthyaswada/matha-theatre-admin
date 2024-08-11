import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMobile = false;
  isExpanded = false;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe((result) => {
        this.isMobile = result.matches;
        this.updateSidenavMode();
      });
  }

  ngAfterViewInit() {
    this.breakpointObserver
      .observe(['(min-width: 961px)'])
      .subscribe((result) => {
        this.isExpanded = !this.isMobile;
        this.updateSidenavMode();
      });
  }

  toggleSidenav() {
    if (this.isMobile) {
      this.sidenav.toggle();
    } else {
      this.isExpanded = !this.isExpanded;
    }
  }

  onLinkClick() {
    if (this.isMobile) {
      this.sidenav.close();
    }
  }

  logout(): void {
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
    this.router.navigate(['/login']);
  }

  private updateSidenavMode() {
    if (this.isMobile) {
      this.sidenav.mode = 'over';
      this.sidenav.close();
    } else {
      this.sidenav.mode = 'side';
      this.sidenav.open();
    }
  }
}

