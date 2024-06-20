import { Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';

export const routes: Routes = [
  { path: '', title: 'admin-login', component: LoginComponent },
  { path: 'login', title: 'admin-login', component: LoginComponent },
];
