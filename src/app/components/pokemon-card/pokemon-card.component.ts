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

  ngOnInit(): void {
    if (this.sessionService.getUser()) {
      for (const pokemon of this.sessionService.getUser().pokemon) {
        if (pokemon.id === this.id) {
          this.caught = true;
        }
      }
    }
  }

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

  opacity() {
    if (this.disabled) {
      return '100%';
    }
    return '';
  }

  cursor() {
    if (this.disabled) {
      return 'default';
    }
    return '';
  }

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
      default:
        return '#ffffff';
    }
  }
}
