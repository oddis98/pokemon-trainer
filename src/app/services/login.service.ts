import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { finalize, switchMap } from 'rxjs/operators';
import { SessionService } from './session.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _isLoading: boolean = false;
  private _error: string = '';
  private API_URL: string = environment.apiUrl;
  private API_KEY: string = environment.apiKey;

  constructor(
    private readonly http: HttpClient,
    private readonly sessionService: SessionService
  ) {}
  
  /**
   * fetches user from loginAPI
   */
  private fetchUser(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}?username=${username}`);
  }

  /**
   * registers user in the loginAPI
   */
  private registerUser(username: string): Observable<User> {
    const requestOptions = {
      headers: {
        'X-API-Key': this.API_KEY,
        'Content-Type': 'application/json',
      },
    };
    return this.http.post<User>(
      this.API_URL,
      {
        username,
        pokemon: [],
      },
      requestOptions
    );
  }
  
  /**
   * authenticates the user by first trying to login.
   * if the user does not exists, the user is registered and logged in
   * sets the user in localstorage
   */
  public authenticate(username: string, onSuccess: () => void): void {
    this._isLoading = true;

    this.fetchUser(username)
      .pipe(
        switchMap((users: User[]) => {
          if (users.length) {
            return of(users[0]);
          }
          return this.registerUser(username);
        }),
        finalize(() => {
          this._isLoading = false;
        })
      )
      .subscribe(
        (user: User) => {
          if (user.id) {
            this.sessionService.setUser(user);
            onSuccess();
          }
        },
        (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      );
  }

  /**
   * fetches the pokemons from the current logged in user
   * adds pokemons from parameters to the lists and updates the list in te pokemonAPI
   * runs authenticate to set new session with the updated pokemon array
   */
  public updatePokemon(id: number, username: string, pokemon: Pokemon): void {
    const newPokemon: Pokemon[] = this.sessionService.getUser().pokemon;

    newPokemon.push(pokemon);

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
          this.authenticate(username, () => {});
        },
        (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      );
  }

  /**
   * deletes a pokemon by filtering the pokemon array based on pokemon in parameters.
   * runs authenticate to set the session with the updated pokemon array.
   */
  public deletePokemon(id: number, username: string, pokemon: Pokemon): void {
    const pokemons: Pokemon[] = this.sessionService.getUser().pokemon;

    const newPokemons = pokemons.filter((p) => p.id !== pokemon.id);

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
          pokemon: newPokemons,
        },
        requestOptions
      )

      .subscribe(
        () => {
          this.authenticate(username, () => {});
        },
        (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      );
  }

  public error(): string {
    return this._error;
  }

  public isLoading(): boolean {
    return this._isLoading;
  }
}
