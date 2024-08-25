import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})
export class SingupComponent {
  registerForm = {
    username: '',
    email: '',
    password: '',
  };
  http = inject(HttpClient);
  isPending = false;

  constructor(private router: Router, private authService: AuthService) {}

  async handleSubmit() {
    this.isPending = true;

    try {
      await this.registerUser();
      await this.loginUser();
      this.router.navigateByUrl('social-post');
    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      this.isPending = false;
    }
  }

  private async registerUser(): Promise<void> {
    const { email, username, password } = this.registerForm;
    const response = await this.authService.register(email, username, password).toPromise();
    if (!response) {
      throw new Error('Registration failed or token missing');
    }
  }

  private async loginUser(): Promise<void> {
    const { email, password } = this.registerForm;
    const response = await this.authService.login(email, password).toPromise();
    if (!response || !response.token) {
      throw new Error('Login failed or token missing');
    }
    sessionStorage.setItem('token', response.token);
  }
}
