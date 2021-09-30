import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.css'],
})
export class TrainerPageComponent implements OnInit {
  constructor(private readonly sessionService: SessionService) {}

  ngOnInit(): void {}

  get pokemons(): any[] {
    return this.sessionService.getTrainerPokemon();
  }
}
