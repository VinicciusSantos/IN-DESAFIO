import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonDrawerComponent } from 'src/app/pages/home/pokemon-drawer/pokemon-drawer.component';
import { POKE_MOCK } from 'src/app/pages/home/pokemons-section/poke-mock';
import PokemonsService from '../../services/pokemons-service/pokemons.service';
import { finalize, take } from 'rxjs';
import { Pokemon } from 'src/app/services/pokemons-service/interfaces';

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

  public loading = false;
  public pokemon!: Pokemon;
  public cardConfig: CardConfig = { selected: false };
  public footerCharacteristcs = Object.entries({
    Altura: 'height',
    Peso: 'weight',
  });

  constructor(
    private pokemonsService: PokemonsService,
    private router: Router
  ) {}

  @HostListener('document:click')
  @HostListener('document:keydown')
  public checkActivedRoute() {
    const drawerTransitionDuration = 450;
    setTimeout(this.checkIfIsInPokemonPage, drawerTransitionDuration);
  }

  public async selectCard() {
    this.cardConfig.selected = !this.cardConfig.selected;
    this.router.navigate(['/pokemons', this.pokemon.name]);
  }

  private checkIfIsInPokemonPage = () => {
    this.cardConfig.selected =
      this.router.url.split('/')[2] === this.pokemon.name;
  };

  private fetchPokemonData(): void {
    this.loading = true;
    this.pokemonsService
      .getPokemonInfos(this.nameOrId)
      .pipe(
        take(1),
        finalize(() => (this.loading = false))
      )
      .subscribe(res => {
        this.pokemon = res;
      });
  }

  public ngOnInit(): void {
    this.fetchPokemonData();
  }
}
