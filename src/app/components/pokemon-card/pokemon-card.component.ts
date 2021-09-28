import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
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

  constructor(private readonly loginService: LoginService) {}

  ngOnInit(): void {}

  onCatchButtonClick(event: any): void {
    const user = JSON.parse(localStorage.getItem('lit-ss') || '{}');

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
