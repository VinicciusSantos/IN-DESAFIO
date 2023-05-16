import { Component, Input, OnInit } from '@angular/core';
import { POKE_MOCK } from 'src/app/pages/home/pokemons-section/poke-mock';

interface CardConfig {
  selected: boolean;
}

@Component({
  selector: 'app-pokemons-card',
  templateUrl: './pokemons-card.component.html',
  styleUrls: ['./pokemons-card.component.scss'],
})
export class PokemonsCardComponent implements OnInit {
  @Input() public nameOrId!: string;

  public pokemon!: any;
  public cardConfig: CardConfig = {
    selected: false,
  };

  public footerCharacteristcs = Object.entries({
    Altura: 'height',
    Peso: 'weight',
  });

  constructor() {}

  public onCloseDrawer(): void {
    this.cardConfig.selected = false;
  }

  public selectCard() {
    this.cardConfig.selected = !this.cardConfig.selected;
  }

  public ngOnInit(): void {
    this.pokemon = POKE_MOCK;
    console.log(this.pokemon);
  }
}
