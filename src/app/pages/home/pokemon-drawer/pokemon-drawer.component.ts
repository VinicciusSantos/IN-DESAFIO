import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, map, take } from 'rxjs/operators';
import KeyboardService from 'src/app/services/keyboard-controller/keyboard.service';
import { Pokemon } from 'src/app/services/pokemons-service/interfaces';

import PokemonsService from '../../../services/pokemons-service/pokemons.service';
import { of } from 'rxjs';

export type DrawerState = 'appearing' | 'open' | 'hiding' | 'closed';

interface DrawerConfig {
  nameOrId: string;
  state: DrawerState;
  loading: boolean;
  error: boolean;
}

export interface PokemonSprite {
  link: string;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-pokemon-drawer',
  templateUrl: './pokemon-drawer.component.html',
  styleUrls: ['./pokemon-drawer.component.scss'],
})
export class PokemonDrawerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public isOpen: boolean = true;
  @Input() public pokemon!: Pokemon;
  @Output() public closeEvent = new EventEmitter<void>();

  public pokemonSprites: PokemonSprite[] = [];
  public drawerConfig: DrawerConfig = {
    loading: false,
    error: false,
    state: 'closed',
    nameOrId: '',
  };

  public get selectedSprite(): PokemonSprite {
    return this.pokemonSprites.find(sprite => sprite.selected) as PokemonSprite;
  }

  public set selectedSprite(sprite: PokemonSprite) {
    this.pokemonSprites.forEach(
      spr => (spr.selected = spr.name === sprite.name)
    );
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private keyboardService: KeyboardService,
    private pokemonsService: PokemonsService
  ) {}

  public onOpenDrawer(): void {
    if (this.drawerConfig.state === 'open') return;
    this.drawerConfig.state = 'appearing';
    setTimeout(() => {
      this.drawerConfig.state = 'open';
      this.isOpen = true;
    }, 400);
  }

  public onCloseDrawer = (): void => {
    if (this.drawerConfig.state === 'closed') return;
    this.drawerConfig.state = 'hiding';
    setTimeout(() => {
      this.drawerConfig.state = 'closed';
      this.isOpen = false;
      this.closeEvent.emit();
      this.router.navigate(['../']);
    }, 400);
  };

  private checkPokemonSprites(): void {
    this.pokemonSprites = Object.entries(this.pokemon.sprites)
      .filter(pok => typeof pok[1] === 'string')
      .map(pok => {
        const [name, link] = pok;
        const selected = name === 'front_default';
        return { selected, link, name } as PokemonSprite;
      });
  }

  private fetchPokemonData(): void {
    this.drawerConfig = {
      ...this.drawerConfig,
      loading: true,
      error: false,
    };
    this.pokemonsService
      .getPokemonInfos(this.drawerConfig.nameOrId)
      .pipe(
        take(1),
        finalize(() => (this.drawerConfig.loading = false)),
        catchError(_error => {
          this.drawerConfig.error = true;
          return of(`Não foi possivel buscar esse pokémon!`);
        })
      )
      .subscribe(res => {
        this.pokemon = res;
        this.checkPokemonSprites();
      });
  }

  private checkPokemonNameOrId(): void {
    this.route.params.subscribe((params: any) => {
      const error = params['name'] === '';
      this.drawerConfig = {
        ...this.drawerConfig,
        nameOrId: params['name'],
        error,
      };
      if (error) return;
      this.fetchPokemonData();
    });
  }

  private configureKeyboardActions(): void {
    const keyboardActions = [{ key: 'Escape', action: this.onCloseDrawer }];
    this.keyboardService.setActions(keyboardActions);
    this.keyboardService.initActions();
  }

  public ngOnInit(): void {
    this.onOpenDrawer();
    this.checkPokemonNameOrId();
    this.configureKeyboardActions();
  }

  public ngOnChanges(): void {
    this.checkPokemonNameOrId();
    this.isOpen ? this.onOpenDrawer() : this.onCloseDrawer();
  }

  public ngOnDestroy(): void {
    this.keyboardService.endActions();
  }
}
