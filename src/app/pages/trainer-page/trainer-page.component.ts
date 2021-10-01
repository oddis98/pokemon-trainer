import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.css'],
})
export class TrainerPageComponent implements OnInit {
  constructor(private readonly sessionService: SessionService, private readonly router: Router) {}

  ngOnInit(): void {}

  get pokemons(): any[] {
    return this.sessionService.getTrainerPokemon();
  }

  logout(){
   this.sessionService.logout()
   return this.router.navigate(["/landing-page"])
    
  }

  backToCatalogue(){
    return this.router.navigate(["/pokemon-catalogue"])

  }
}
