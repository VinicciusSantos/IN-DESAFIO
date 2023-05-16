import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonDrawerComponent } from 'src/app/pages/home/pokemon-drawer/pokemon-drawer.component';
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

  @HostListener('document:click') checkActivedRoute() {
    const drawerTransitionDuration = 450;
    setTimeout(this.checkIfIsInPokemonPage, drawerTransitionDuration);
  }

  public pokemon!: any;
  public cardConfig: CardConfig = {
    selected: false,
  };

  public footerCharacteristcs = Object.entries({
    Altura: 'height',
    Peso: 'weight',
  });

  constructor(private route: ActivatedRoute, private router: Router) {}

  public async selectCard() {
    this.cardConfig.selected = !this.cardConfig.selected;
    this.router.navigate(['/pokemons', this.pokemon.name]);
  }

  private checkIfIsInPokemonPage = () => {
    this.cardConfig.selected =
      this.router.url.split('/')[2] === this.pokemon.name;
  };

  public ngOnInit(): void {
    this.pokemon = POKE_MOCK;
  }
}
