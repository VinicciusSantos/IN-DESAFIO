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
import { finalize, take } from 'rxjs/operators';
import KeyboardService from 'src/app/services/keyboard-controller/keyboard.service';
import { Pokemon } from 'src/app/services/pokemons-service/interfaces';

import PokemonsService from '../../../services/pokemons-service/pokemons.service';

export type DrawerState = 'appearing' | 'open' | 'hiding' | 'closed';
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

  public drawerState: DrawerState = 'closed';
  public pokemonSprites: PokemonSprite[] = [];
  public nameOrId!: string;
  public loading = true;

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
    if (this.drawerState === 'open') return;
    this.drawerState = 'appearing';
    setTimeout(() => {
      this.drawerState = 'open';
      this.isOpen = true;
    }, 400);
  }

  public onCloseDrawer = (): void => {
    if (this.drawerState === 'closed') return;
    this.drawerState = 'hiding';
    setTimeout(() => {
      this.drawerState = 'closed';
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
    this.loading = true;
    this.pokemonsService
      .getPokemonInfos(this.nameOrId)
      .pipe(
        take(1),
        finalize(() => (this.loading = false))
      )
      .subscribe(res => {
        this.pokemon = res;
        this.onOpenDrawer();
        this.checkPokemonSprites();
      });
  }

  private checkPokemonNameOrId(): void {
    this.route.params.subscribe((params: any) => {
      this.nameOrId = params['name'];
      this.fetchPokemonData();
    });
  }

  private configureKeyboardActions(): void {
    const keyboardActions = [{ key: 'Escape', action: this.onCloseDrawer }];
    this.keyboardService.setActions(keyboardActions);
    this.keyboardService.initActions();
  }

  public ngOnInit(): void {
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
