import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private _error: string = '';

  constructor(
    private readonly http: HttpClient,
    private readonly sessionService: SessionService
  ) {}

  private getAllPokemon(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  public getPokemon(url: string, onSuccess: () => void): void {
    this.getAllPokemon(url).subscribe(
      (pokemon: any) => {
        if (pokemon) {
          this.sessionService.setPokemon(pokemon.results);
          this.sessionService.setNext(pokemon.next);
          onSuccess();
        }
      },
      (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    );
  }
  public getPokemonInfo(urlToPokemon: string): void {
    const allPokemon = [];
    for (const pokemon of this.sessionService.getPokemon()) {
      const url = pokemon.url.split('/');
      if (url[url.length - 2] !== 'pokemon') {
        const id = url[url.length - 2];
        pokemon.avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        pokemon.id = id;
      }
      allPokemon.push(this.http.get<any>(`${urlToPokemon}/${pokemon.id}`));
    }
    forkJoin(allPokemon).subscribe(
      (result) => this.sessionService.setPokemon(result),
      (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    );
  }

  public pokemons() {
    return JSON.parse(localStorage.getItem('pokemon') || '{}');
  }
}
