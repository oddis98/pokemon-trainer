import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';

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
  @Input() url: string = '';
  @Input() user?: User;

  constructor(private readonly loginService: LoginService) {}


  ngOnInit(): void {}

  onCatchButtonClick(event: any): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user) {
      this.loginService.updatePokemon(user.id, user.username, {
        id: this.id,
        name: this.name,
        url: this.url,
        avatar: this.image,
      });
    }
  }
}
