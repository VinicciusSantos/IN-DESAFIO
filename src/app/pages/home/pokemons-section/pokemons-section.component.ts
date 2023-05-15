import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemons-section',
  templateUrl: './pokemons-section.component.html',
  styleUrls: ['./pokemons-section.component.scss'],
})
export class PokemonsSectionComponent {
  @Input() public title!: string;

  constructor() {}
}
