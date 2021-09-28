import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private _pokemons: Pokemon[] = [];
  private _error: string = '';
  private API_URL: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private readonly http: HttpClient) {}

  public fetchPokemon(): void {
    this.http.get<Pokemon[]>(`${this.API_URL}`).subscribe(
      (pokemon: any) => {
        this._pokemons = pokemon.results;
        localStorage.setItem('pokemons', JSON.stringify(pokemon.results));
      },
      (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    );
  }

  public pokemons() {
    return JSON.parse(localStorage.getItem('pokemons') || '{}');
  }
}
