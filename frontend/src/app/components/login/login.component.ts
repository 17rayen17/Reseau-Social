import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // corrected styleUrls
})
export class LoginComponent {
  loginForm = {
    email: '',
    password: '',
  };
  http = inject(HttpClient);
  isPending = false;
  errorMsg: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  async handleSubmit() {
    this.isPending = true;
    this.errorMsg = '';
    
    this.authService.login(this.loginForm.email, this.loginForm.password).subscribe({
      next: (response) => {
        if (response && response.token) {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('userId', response.user._id);
          this.router.navigateByUrl('social-post');
          window.location.reload();
        } else {
          this.errorMsg = 'Email or password Invalid';
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMsg = 'An error occurred while logging in. Please try again later.';
        this.isPending = false;
      },
      complete: () => {
        this.isPending = false;
      },
    });
  }
}
