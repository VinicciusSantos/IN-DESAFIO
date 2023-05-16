import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemons-section',
  templateUrl: './pokemons-section.component.html',
  styleUrls: ['./pokemons-section.component.scss'],
})
export class PokemonsSectionComponent implements OnInit {
  @Input() public titulo!: string;
  @Input() pokemonNames?: string[];

  public pokemonNameList: string[] = [];

  constructor() {}

  public ngOnInit(): void {
    this.pokemonNameList = ['ditto', 'pikachu', '2'];
  }
}
