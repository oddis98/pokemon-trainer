import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
})
export class PokemonCardComponent implements OnInit {
  public caught: boolean = false;

  /**
   * Inherited variables from pokemon-catalogue/trainer-page
   */
  @Input() image: string = '';
  @Input() name: string = '';
  @Input() id: number = 0;
  @Input() type: string = '';
  @Input() stats: any;
  @Input() disabled: boolean = false;

  constructor(
    private readonly loginService: LoginService,
    private readonly sessionService: SessionService
  ) {}
  
  /**
   * when initialized, checks if the user has caught a pokemon
   * If true, caught = true
   */
  ngOnInit(): void {
    if (this.sessionService.getUser()) {
      for (const pokemon of this.sessionService.getUser().pokemon) {
        if (pokemon.id === this.id) {
          this.caught = true;
        }
      }
    }
  }

  /**
   * if !disabled, tries to catch the current pokemon
   * sends a pokemon object with its values
   */
  onCatchButtonClick(): void {
    if (!this.disabled) {
      if (this.sessionService.getUser()) {
        this.loginService.updatePokemon(
          this.sessionService.getUser().id,
          this.sessionService.getUser().username,
          {
            id: this.id,
            name: this.name,
            avatar: this.image,
            type: this.type,
          }
        );
      }
    }
  }

  /**
   * dispatches deletepokemon from loginservice.
   */
  onDeleteButtonClick(): void {
    if (this.sessionService.getUser()) {
      this.loginService.deletePokemon(
        this.sessionService.getUser().id,
        this.sessionService.getUser().username,
        {
          id: this.id,
          name: this.name,
          avatar: this.image,
          type: this.type,
        }
      );
    }
  }

  /**
   * reverts the opacity effect on cards when disabled.
   */
  opacity() {
    if (this.disabled) {
      return '100%';
    }
    return '';
  }

    /**
   * reverts the cursor effect on cards when disabled.
   */
  cursor() {
    if (this.disabled) {
      return 'default';
    }
    return '';
  }
  
  /**
   * Switch statement 
   * returns custom color hexcodes based on pokemon type.
   */
  getColor(type: string) {
    switch (type) {
      case 'grass':
        return '#adf7b6';
      case 'fire':
        return '#ffc09f';
      case 'water':
        return '#a0ced9';
      case 'electric':
        return '#ffee93';
      case 'bug':
        return '#fcf5c7';
      case 'normal':
        return '#f0efeb';
      case 'ice':
        return '#d7e3fc'
      case 'fighting':
        return '#d4afb9'
      case 'poison':
        return '#cdb4db';
      case 'ground':
        return '#dab894';
      case 'flying':
        return '#dfb2f4';
      case 'psychic':
        return '#f49097';
      case 'rock':
        return '#d3ab9e';
      case 'ghost':
        return '#966fd6';
      case 'dark':
        return '#d1d1d1';
      case 'dragon':
        return '#9e56f0';
      case 'steel':
        return '#e2e2e2';
      case 'fairy':
        return '#fce1e4';
      default:
        return '#ffffff';
    }
  }
}
