import { Component, Input } from '@angular/core';

export type PokemonType =
  | 'normal'
  | 'fire'
  | 'water'
  | 'grass'
  | 'flying'
  | 'fighting'
  | 'poison'
  | 'electric'
  | 'ground'
  | 'rock'
  | 'psychic'
  | 'ice'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'dragon'
  | 'dark'
  | 'fairy';

@Component({
  selector: 'app-pokemon-type-badge',
  templateUrl: './pokemon-type-badge.component.html',
  styleUrls: ['./pokemon-type-badge.component.scss'],
})
export class PokemonTypeBadgeComponent {
  @Input() public pokemonType!: PokemonType;

  public typeColors: Record<PokemonType, string> = {
    normal: '#BFBFBF',
    fire: '#F45F30',
    water: '#328FFA',
    grass: '#5EC028',
    flying: '#96C8F9',
    fighting: '#FAA431',
    poison: '#9A5CCE',
    electric: '#FCDD3A',
    ground: '#AA773D',
    rock: '#BABA87',
    psychic: '#F2637A',
    ice: '#43D6FC',
    bug: '#A0A526',
    ghost: '#6C4273',
    steel: '#6CB0D5',
    dragon: '#5563D7',
    dark: '#888',
    fairy: '#F1AEFD',
  };

  public get backgroundColor(): string {
    return this.typeColors[this.pokemonType];
  }

  constructor() {}
}
