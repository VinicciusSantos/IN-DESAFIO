import { catchError, of, take } from 'rxjs';
import PokemonsService from '../../../services/pokemons-service/pokemons.service';
import { PokemonCardSizes } from '../../../components/pokemons-card/pokemons-card.component';
import {
  Component,
  Input,
  OnInit,
  ElementRef,
  HostListener,
  AfterContentChecked,
} from '@angular/core';

export type SectionType = 'automatic' | 'customSelection';
export type PaginationPosition = 'top' | 'sides';

@Component({
  selector: 'app-pokemons-section',
  templateUrl: './pokemons-section.component.html',
  styleUrls: ['./pokemons-section.component.scss'],
})
export class PokemonsSectionComponent implements OnInit, AfterContentChecked {
  @Input() public titulo = '';
  @Input() public rows = 2;
  @Input() public pokemonsNameList: any[] = [];
  @Input() public type: SectionType = 'automatic';
  @Input() public paginationPosition: PaginationPosition = 'top';

  public visibleColumns: number = 0;
  public firstVisibleCardIndex = 0;

  public get tooltipMessage(): string {
    const customSelectionMsg = `Listas dos ${this.pokemonsNameList.length} pokémons que atendem o requisito "${this.titulo}"`;
    const automaticMsg = 'Lista de todos os pokémons existentes';
    return this.type === 'customSelection' ? customSelectionMsg : automaticMsg;
  }

  public get cardSize(): PokemonCardSizes {
    return this.visibleColumns <= 2 ? 'md' : 'sm';
  }

  constructor(
    private elementRef: ElementRef,
    private pokemonsService: PokemonsService
  ) {}

  @HostListener('window:resize')
  public checkSizes() {
    const containerElement =
      this.elementRef.nativeElement.querySelector('.cards-container');
    const containerWidth = containerElement.offsetWidth;
    this.visibleColumns = this.determineVisibleColumns(containerWidth);
  }

  public onPaginationDown(): void {
    if (this.firstVisibleCardIndex < this.rows) return;
    this.firstVisibleCardIndex -= this.rows;
  }

  public onPaginationUp(): void {
    this.firstVisibleCardIndex += this.rows;
    if (this.type === 'customSelection') return;
    const nextVisibleIndex =
      this.firstVisibleCardIndex + this.rows * this.visibleColumns;
    const willOverflow = nextVisibleIndex + 2 >= this.pokemonsNameList!.length;
    if (willOverflow) this.fetchPokemonNames(this.rows, nextVisibleIndex);
  }

  public isDecreaseButtonDisabled(): boolean {
    return this.firstVisibleCardIndex === 0;
  }

  public isIncreaseButtonDisabled(): boolean {
    if (this.type === 'automatic') return false;
    const nextVisibleIndex =
      this.firstVisibleCardIndex + this.rows * this.visibleColumns;
    if (nextVisibleIndex >= this.pokemonsNameList!.length) return true;
    return false;
  }

  public isCardVisible(index: number): boolean {
    return (
      index >= this.firstVisibleCardIndex &&
      index <= this.rows * this.visibleColumns + this.firstVisibleCardIndex - 1
    );
  }

  private determineVisibleColumns(containerWidth: number): number {
    if (containerWidth > 1220) return 5;
    if (containerWidth >= 1000) return 4;
    if (containerWidth >= 729) return 3;
    if (containerWidth >= 590) return 2;
    return 1;
  }

  private fetchPokemonNames(limit: number, offset: number): void {
    for (let i = 0; i < limit; i++) this.pokemonsNameList.push('');
    this.pokemonsService
      .getPokemonsInRange(limit, offset)
      .pipe(
        take(1),
        catchError(() => {
          return of(null);
        })
      )
      .subscribe(res => {
        for (let i = 0; i < limit; i++) this.pokemonsNameList.pop();
        if (!res) {
          for (let i = 0; i < limit; i++) this.pokemonsNameList.push(null);
          return;
        }
        this.pokemonsNameList.push(...res.results.map(r => r.name));
      });
  }

  public ngOnInit(): void {
    const maxColumnsInGrid = 5;
    if (this.type === 'automatic' && this.pokemonsNameList?.length === 0)
      this.fetchPokemonNames((maxColumnsInGrid + 1) * this.rows, 0);
  }

  public ngAfterContentChecked(): void {
    this.checkSizes();
  }
}
