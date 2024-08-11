import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin-services/admin.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  message: string | null = null;
  success: boolean = false;
  hidePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  login(): void {
    if (this.loginForm.invalid) {
      // Trigger validation messages by marking all controls as touched
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginData = this.loginForm.value;
    this.adminService.login(loginData).subscribe(
      (res) => {
        localStorage.setItem('admin', JSON.stringify(res));
        localStorage.setItem('adminToken', res.token);
        this.message = res.message;
        this.success = true;
        this.router.navigate(['/admin']);
      },
      (error) => {
        this.message = error.error.message || 'Username and Password are incorrect';
        this.success = false;
      }
    );
  }
}
