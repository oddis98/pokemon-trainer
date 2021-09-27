import { Component, OnInit, OnChanges } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit, OnChanges {
  private _user: string = '';
  loggedUser: User[] = [];

  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {}

  onInputChange(event: any): void {
    this._user = event;
    this.loginService.fetchUser(this._user);
  }

  onLoginButtonClick(): void {
    console.log(this.user);
  }

  get user(): User[] {
    return this.loginService.user();
  }
}
