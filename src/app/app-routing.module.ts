import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PokemonCataloguePageComponent } from './pages/pokemon-catalogue-page/pokemon-catalogue-page.component';
import { TrainerPageComponent } from './pages/trainer-page/trainer-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/landing-page',
  },
  {
    path: 'landing-page',
    component: LandingPageComponent,
  },
  {
    path: 'trainer-page',
    component: TrainerPageComponent,
  },
  {
    path: 'pokemon-catalogue',
    component: PokemonCataloguePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
