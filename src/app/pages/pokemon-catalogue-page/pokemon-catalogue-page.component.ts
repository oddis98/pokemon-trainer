import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-catalogue-page',
  templateUrl: './pokemon-catalogue-page.component.html',
  styleUrls: ['./pokemon-catalogue-page.component.css'],
})
export class PokemonCataloguePageComponent implements OnInit {
  constructor(private readonly pokemonService: PokemonService) {}

  ngOnInit(): void {
    if (!localStorage.getItem('pokemons')) {
      this.pokemonService.fetchPokemon();
    }
  }

  get pokemons(): Pokemon[] {
    return this.pokemonService.pokemons().map((pokemon: any) => {
      const url = pokemon.url.split('/');
      if (url[url.length - 2] !== 'pokemon') {
        const id = url[url.length - 2];
        pokemon.avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        pokemon.id = id;
        return pokemon;
      }
      return pokemon;
    });
  }
}
