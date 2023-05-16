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
import { POKE_MOCK } from '../pokemons-section/poke-mock';
import KeyboardService from 'src/app/services/keyboard-controller/keyboard.service';

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
  @Input() public pokemon!: any;
  @Output() public closeEvent = new EventEmitter<void>();

  public state: DrawerState = 'closed';

  public pokemonSprites: PokemonSprite[] = [];

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
    private keyboardService: KeyboardService
  ) {}

  public onOpen(): void {
    if (this.state === 'open') return;
    this.state = 'appearing';
    setTimeout(() => {
      this.state = 'open';
      this.isOpen = true;
    }, 400);
  }

  public onClose = (): void => {
    if (this.state === 'closed') return;
    this.state = 'hiding';
    setTimeout(() => {
      this.state = 'closed';
      this.isOpen = false;
      this.closeEvent.emit();
      this.router.navigate(['../']);
    }, 400);
  };

  private getPokemonSprites(): PokemonSprite[] {
    return Object.entries(this.pokemon.sprites)
      .filter(pok => typeof pok[1] === 'string')
      .map(pok => {
        const [name, link] = pok;
        const selected = name === 'front_default';
        return { selected, link, name } as PokemonSprite;
      });
  }

  public ngOnInit(): void {
    this.pokemon = POKE_MOCK;
    this.pokemonSprites = this.getPokemonSprites();
    this.onOpen();
    this.route.params.subscribe((params: any) => {
      // console.log(params['name']);
    });
    this.keyboardService.setActions([
      {
        key: 'Escape',
        action: this.onClose,
      },
    ]);
    this.keyboardService.initActions();
  }

  public ngOnChanges(): void {
    this.isOpen ? this.onOpen() : this.onClose();
  }

  public ngOnDestroy(): void {
    this.keyboardService.endActions();
  }
}
