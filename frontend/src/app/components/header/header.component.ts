import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private authSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authSubscription = this.authService.authState$.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  logout() {
    sessionStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigateByUrl('/login');
  }
}
