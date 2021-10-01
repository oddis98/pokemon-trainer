import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.css'],
})
export class TrainerPageComponent {
  constructor(private readonly sessionService: SessionService, private readonly router: Router) {}

  get pokemons(): any[] {
    return this.sessionService.getTrainerPokemon();
  }

  /**
   * dispatches logout from sessionService
   * returns the user to the landing-page
   */
  logout(){
   this.sessionService.logout()
   return this.router.navigate(["/landing-page"])
    
  }

  /**
   * returns the user to the pokemon-catalogue
   */
  backToCatalogue(){
    return this.router.navigate(["/pokemon-catalogue"])
  }
}
