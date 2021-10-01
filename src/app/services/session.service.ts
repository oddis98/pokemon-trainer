import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

/**
 * Gathers and sets different data to localstorage.
 */
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _user?: User;
  private _pokemon: any = [];

  
  constructor() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this._user = JSON.parse(storedUser);
    }
  }
  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  setUser(user: User): void {
    this._user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getPokemon() {
    return JSON.parse(localStorage.getItem('pokemon') || '{}');
  }

  getTrainerPokemon() {
    return JSON.parse(localStorage.getItem('user') || '{]').pokemon;
  }

  setPokemon(pokemon: any): void {
    this._pokemon = pokemon;
    localStorage.setItem('pokemon', JSON.stringify(pokemon));
  }

  logout() {
    this._user = undefined;
    localStorage.clear();
  }

  setNext(next: string): void {
    localStorage.setItem('next', next);
  }

  getNext(): string {
    return localStorage.getItem('next') || '';
  }
}
