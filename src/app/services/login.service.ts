import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _user: User[] = [];
  private _error: string = '';
  private API_URL: string = 'https://noroff-api-oddalm.herokuapp.com/trainers';

  constructor(private readonly http: HttpClient) {}

  public fetchUser(username: string): void {
    this.http.get<User[]>(`${this.API_URL}?username=${username}`).subscribe(
      (user: User[]) => {
        this._user = user;
      },
      (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    );
  }

  public user(): User[] {
    return this._user;
  }

  public error(): string {
    return this._error;
  }
}
