import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _user: User[] = [];
  private _isLoggedIn: boolean = false;
  private _response: string = '';
  private _error: string = '';
  private API_URL: string = 'https://noroff-api-oddalm.herokuapp.com/trainers';
  private API_KEY =
    'qculjKQjXUX0uauq3T98kX4iDInwsNI3E0gvJffCy5WJa8GXRVbMLyd8aGaYqsAd';

  constructor(private readonly http: HttpClient) {}

  public fetchUser(username: string): void {
    this.http.get<User[]>(`${this.API_URL}?username=${username}`).subscribe(
      (user: User[]) => {
        if (user.length === 0) {
          this.registerUser(username);
        }
        this._user = user;
        this._isLoggedIn = true;
      },
      (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    );
  }

  public registerUser(username: string): void {
    const requestOptions = {
      headers: {
        'X-API-Key': this.API_KEY,
        'Content-Type': 'application/json',
      },
    };
    this.http
      .post<string>(
        this.API_URL,
        {
          username,
          pokemon: [],
        },
        requestOptions
      )
      .subscribe(
        (response: string) => {
          this._response = response;
          this.fetchUser(username);
        },
        (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      );
  }

  public logout(): void {}

  public user(): User[] {
    return this._user;
  }

  public error(): string {
    return this._error;
  }

  public isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
}
