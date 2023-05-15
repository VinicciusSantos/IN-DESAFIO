import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { PokemonsSectionComponent } from './pokemons-section/pokemons-section.component';
import { PokemonsCardComponent } from 'src/app/components/pokemons-card/pokemons-card.component';

@NgModule({
  declarations: [
    HomeComponent,
    PokemonsSectionComponent,
    PokemonsCardComponent,
  ],
  imports: [CommonModule],
  exports: [HomeRoutingModule],
})
export class HomeModule {}
