import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, of, take } from 'rxjs';
import { Pokemon } from 'src/app/services/pokemons-service/interfaces';

import PokemonsService from '../../services/pokemons-service/pokemons.service';

interface CardConfig {
  selected: boolean;
  loading: boolean;
  error: boolean;
}

@Component({
  selector: 'app-pokemons-card',
  templateUrl: './pokemons-card.component.html',
  styleUrls: ['./pokemons-card.component.scss'],
})
export class PokemonsCardComponent implements OnInit, OnChanges {
  @Input() public nameOrId!: string;

  public pokemon!: Pokemon;
  public cardConfig: CardConfig = {
    selected: false,
    loading: false,
    error: false,
  };

  constructor(
    private pokemonsService: PokemonsService,
    private router: Router
  ) {}

  @HostListener('document:click')
  @HostListener('document:keydown')
  public checkActivedRoute() {
    if (this.nameOrId === '' || !this.nameOrId) return;
    const drawerTransitionDuration = 450;
    setTimeout(this.checkIfIsInPokemonPage, drawerTransitionDuration);
  }

  public async selectCard() {
    if (
      this.cardConfig.selected ||
      this.cardConfig.loading ||
      this.cardConfig.error
    )
      return;
    this.cardConfig.selected = !this.cardConfig.selected;
    return this.router.navigate(['/pokemons', this.pokemon.name]);
  }

  private checkIfIsInPokemonPage = () => {
    this.cardConfig.selected =
      this.router.url.split('/')[2] === this.pokemon?.name;
  };

  private fetchPokemonData(): void {
    this.cardConfig = {
      ...this.cardConfig,
      loading: true,
      error: false,
    };
    if (!this.nameOrId) {
      this.cardConfig.error = true;
      this.cardConfig.loading = false;
      return;
    }
    if (this.nameOrId === '') return;
    this.checkActivedRoute();
    this.pokemonsService
      .getPokemonInfos(this.nameOrId)
      .pipe(
        take(1),
        catchError(() => {
          this.cardConfig.error = true;
          this.cardConfig.loading = false;
          return of(null);
        }),
        finalize(() => (this.cardConfig.loading = false))
      )
      .subscribe(res => {
        this.pokemon = res;
      });
  }

  public ngOnInit(): void {
    this.fetchPokemonData();
  }

  public ngOnChanges(): void {
    this.fetchPokemonData();
  }
}
