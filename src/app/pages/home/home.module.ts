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
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { PaginationButtonComponent } from 'src/app/components/pagination-button/pagination-button.component';
import { InfoTooltipComponent } from 'src/app/components/info-tooltip/info-tooltip.component';
import { PokemonDescriptionComponent } from './pokemon-drawer/pokemon-description/pokemon-description.component';
import { PokemonStatusComponent } from './pokemon-drawer/pokemon-status/pokemon-status.component';
import { PokemonInfosComponent } from './pokemon-drawer/pokemon-infos/pokemon-infos.component';
import { LineGraphComponent } from '../../components/line-graph/line-graph.component';

@NgModule({
  declarations: [
    HomeComponent,
    PokemonsSectionComponent,
    PokemonsCardComponent,
    PokemonDrawerComponent,
    PokemonTypeBadgeComponent,
    LoadingComponent,
    PaginationButtonComponent,
    InfoTooltipComponent,
    ClickAwayDirective,
    PokemonDescriptionComponent,
    PokemonStatusComponent,
    PokemonInfosComponent,
    LineGraphComponent,
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
