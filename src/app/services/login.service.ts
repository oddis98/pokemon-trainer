import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import {finalize, switchMap} from 'rxjs/operators'
import { SessionService } from './session.service';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _isLoggedIn: boolean = false;
  private _isLoading: boolean = false;
  private _error: string = '';
  private API_URL: string = 'https://noroff-api-oddalm.herokuapp.com/trainers';
  private API_KEY =
    'qculjKQjXUX0uauq3T98kX4iDInwsNI3E0gvJffCy5WJa8GXRVbMLyd8aGaYqsAd';

  constructor(private readonly http: HttpClient, private readonly sessionService : SessionService) {}

  private fetchUser(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}?username=${username}`)
    
  }

  private registerUser(username: string): Observable<User> {
    const requestOptions = {
      headers: {
        'X-API-Key': this.API_KEY,
        'Content-Type': 'application/json',
      },
    };
    return this.http
      .post<User>(
        this.API_URL,
        {
          username,
          pokemon: [],
        },
        requestOptions
      )
  }

  public authenticate(username: string, onSuccess: () => void): void {
    this._isLoading = true

    this.fetchUser(username)
    .pipe(
      switchMap((users: User[]) =>{
        if (users.length){
          return of(users[0])
        }
        return this.registerUser(username)
      }
    ),
    finalize(() => {
      this._isLoading = false;
    })).subscribe(
      (user: User) =>{
        if(user.id){
          this.sessionService.setUser(user)
          onSuccess();
        }
      },
      (error: HttpErrorResponse) => {
        this._error = error.message
      }
    )
  }

  public updatePokemon(id: number, username: string, pokemon: Pokemon): void {
    const newPokemon: Pokemon[] = JSON.parse(
      localStorage.getItem('user') || '{}'
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

  public isLoggedIn(): boolean {
    if (localStorage.getItem('user')) {
      return true;
    }
    return this._isLoggedIn;
  }

  public isLoading(): boolean {
    return this._isLoading;
  }
}
