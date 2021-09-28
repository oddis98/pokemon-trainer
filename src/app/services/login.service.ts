import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _user: User[] = [];
  private _isLoggedIn: boolean = false;
  private _isLoading: boolean = false;
  private _response: string = '';
  private _error: string = '';
  private API_URL: string = 'https://noroff-api-oddalm.herokuapp.com/trainers';
  private API_KEY =
    'qculjKQjXUX0uauq3T98kX4iDInwsNI3E0gvJffCy5WJa8GXRVbMLyd8aGaYqsAd';

  constructor(private readonly http: HttpClient) {}

  public fetchUser(username: string): void {
    this._isLoading = true;
    this.http.get<User[]>(`${this.API_URL}?username=${username}`).subscribe(
      (user: User[]) => {
        if (user.length === 0) {
          this.registerUser(username);
        }
        this._user = user;
        this._isLoggedIn = true;
        this._isLoading = false;
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

  public updatePokemon(id: number, username: string, pokemon: Pokemon): void {
    const newPokemon: Pokemon[] = JSON.parse(
      localStorage.getItem('lit-ss') || '{}'
    ).pokemon;

    newPokemon.push(pokemon);

    console.log(newPokemon);

    const requestOptions = {
      headers: {
        'X-API-Key': this.API_KEY,
        'Content-Type': 'application/json',
      },
    };
    this.http
      .patch(
        `${this.API_URL}/${id}`,
        {
          pokemon: newPokemon,
        },
        requestOptions
      )
      .subscribe(
        () => {
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
    if (localStorage.getItem('lit-ss')) {
      return true;
    }
    return this._isLoggedIn;
  }

  public isLoading(): boolean {
    return this._isLoading;
  }
}
