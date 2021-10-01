import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  private _user: string = '';

  constructor(
    private readonly loginService: LoginService,
    private readonly sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('user') !== 'undefined' &&
      localStorage.getItem('user')
    ) {
      this.router.navigate(['/pokemon-catalogue']);
    }
  }

  onInputChange(event: any): void {
    this._user = event;
  }

  onLoginButtonClick(): void {
    this.loginService.authenticate(this._user ,  () =>  this.router.navigate(["/pokemon-catalogue"]));
  }

  get isLoading(): boolean {
    return this.loginService.isLoading();
  }

  get user(): User | undefined {
    return this.sessionService.getUser();
  }
}
