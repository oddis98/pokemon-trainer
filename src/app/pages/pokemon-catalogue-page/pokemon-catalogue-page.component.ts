import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { SessionService } from 'src/app/services/session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pokemon-catalogue-page',
  templateUrl: './pokemon-catalogue-page.component.html',
  styleUrls: ['./pokemon-catalogue-page.component.css'],
})
export class PokemonCataloguePageComponent implements OnInit {
  private API_URL: string = environment.pokeAPIurl;
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly sessionService: SessionService
  ) {}
  
  /**
   * if there is no pokemons in localstorage.
   * fetch pokemons from pokemon API
   */
  ngOnInit(): void {
    if (!localStorage.getItem('pokemon')) {
      this.pokemonService.getPokemon(this.API_URL, () =>
        this.pokemonService.getPokemonInfo(this.API_URL)
      );
    }
  }

  /**
   * fetches the next 20 pokemon from the pokemon API
  */
  goToNextPage() {
    this.pokemonService.getPokemon(this.sessionService.getNext(), () =>
      this.pokemonService.getPokemonInfo(this.API_URL)
    );
  }
  /**
   * fetches and displays the first 20 pokemon from the pokemonAPI.
   */
  goToStart() {
    this.pokemonService.getPokemon(this.API_URL, () =>
      this.pokemonService.getPokemonInfo(this.API_URL)
    );
  }

  get pokemons(): any[] {
    return this.sessionService.getPokemon();
  }
}
