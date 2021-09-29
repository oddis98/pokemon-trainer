import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private _pokemons: any[] = [];
  private _error: string = '';
  private API_URL: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private readonly http: HttpClient) {}

  public fetchPokemon(): void {
    this.http.get<Pokemon[]>(`${this.API_URL}`).subscribe(
      (pokemon: any) => {
        this._pokemons = pokemon.results.map((pokemon: any) => {
          const url = pokemon.url.split('/');
          if (url[url.length - 2] !== 'pokemon') {
            const id = url[url.length - 2];
            pokemon.avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
            pokemon.id = id;
            return pokemon;
          }
          return pokemon;
        });
        this.setPokemonInfo();
      },
      (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    );
  }

  private fetchIndividualPokemon(id: number): void {
    this.http.get<any>(`${this.API_URL}/${id}`).subscribe(
      (pokemon: any) => {
        this._pokemons[pokemon.id - 1] = pokemon;
      },
      (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    );
  }

  public setPokemonInfo(): void {
    for (const pokemon of this._pokemons) {
      this.fetchIndividualPokemon(pokemon.id);
    }
    console.log(this._pokemons);
    localStorage.setItem('pokemons', JSON.stringify(this._pokemons));
  }

  public pokemons() {
    return JSON.parse(localStorage.getItem('pokemons') || '{}');
  }
}
