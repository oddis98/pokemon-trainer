import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-pokemon-catalogue-page',
  templateUrl: './pokemon-catalogue-page.component.html',
  styleUrls: ['./pokemon-catalogue-page.component.css'],
})
export class PokemonCataloguePageComponent implements OnInit {
  private API_URL: string = 'https://pokeapi.co/api/v2/pokemon';
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly sessionService: SessionService
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('pokemon')) {
      this.pokemonService.getPokemon(this.API_URL, () =>
        this.pokemonService.getPokemonInfo(this.API_URL)
      );
    }
  }

  goToNextPage() {
    this.pokemonService.getPokemon(this.sessionService.getNext(), () =>
      this.pokemonService.getPokemonInfo(this.API_URL)
    );
  }

  goToStart() {
    this.pokemonService.getPokemon(this.API_URL, () =>
      this.pokemonService.getPokemonInfo(this.API_URL)
    );
  }

  get pokemons(): any[] {
    return this.sessionService.getPokemon();
  }
}
