import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { PokemonsSectionComponent } from './pokemons-section/pokemons-section.component';
import { PokemonsCardComponent } from 'src/app/components/pokemons-card/pokemons-card.component';
import { PokemonDrawerComponent } from './pokemon-drawer/pokemon-drawer.component';
import { RouterModule } from '@angular/router';
import { ClickAwayDirective } from 'src/app/directives/click-away/click-away.directive';
import { PokemonTypeBadgeComponent } from 'src/app/components/pokemon-type-badge/pokemon-type-badge.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import PokemonsService from 'src/app/services/pokemons-service/pokemons.service';

@NgModule({
  declarations: [
    HomeComponent,
    PokemonsSectionComponent,
    PokemonsCardComponent,
    PokemonDrawerComponent,
    PokemonTypeBadgeComponent,
    ClickAwayDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [PokemonsService],
})
export class HomeModule {}
