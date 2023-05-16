import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';

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
export class PokemonDrawerComponent implements OnInit, OnChanges {
  @Input() public isOpen: boolean = false;
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

  constructor(private router: Router) {}

  public onOpen(): void {
    if (this.state === 'open') return;
    this.state = 'appearing';
    setTimeout(() => {
      this.state = 'open';
      this.isOpen = true;
    }, 400);
  }

  public onClose = (): void => {
    this.router.navigate(['../']);
    if (this.state === 'closed') return;
    this.state = 'hiding';
    setTimeout(() => {
      this.state = 'closed';
      this.isOpen = false;
      this.closeEvent.emit();
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
    this.pokemonSprites = this.getPokemonSprites();
  }

  public ngOnChanges(): void {
    this.isOpen ? this.onOpen() : this.onClose();
  }
}
