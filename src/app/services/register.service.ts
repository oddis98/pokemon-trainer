import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private _response: string = '';
  private _error: string = '';
  private API_URL: string = 'https://noroff-api-oddalm.herokuapp.com/trainers';
  private API_KEY =
    'qculjKQjXUX0uauq3T98kX4iDInwsNI3E0gvJffCy5WJa8GXRVbMLyd8aGaYqsAd';

  constructor(private readonly http: HttpClient) {}

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
          console.log(response);
          this._response = response;
        },
        (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      );
  }

  public response(): string {
    return this._response;
  }

  public error(): string {
    return this._error;
  }
}
