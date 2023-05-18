import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/services/pokemons-service/interfaces';

@Component({
  selector: 'app-pokemon-infos',
  templateUrl: './pokemon-infos.component.html',
  styleUrls: [
    './pokemon-infos.component.scss',
    '../pokemon-drawer.component.scss',
  ],
})
export class PokemonInfosComponent {
  @Input() public pokemon!: Pokemon;

  constructor() {}
}
