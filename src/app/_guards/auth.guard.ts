import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthCanActivateGuard implements CanActivate {
  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {}

  canActivate() {
    const isLoggedIn: string | null = localStorage.getItem('user');
    if (isLoggedIn) return true;

    this.router.navigate(['/']);
    return false;
  }
}
