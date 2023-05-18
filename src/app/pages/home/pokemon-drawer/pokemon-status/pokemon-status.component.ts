import { Component, OnInit, Input } from '@angular/core';
import { LineChartColumn } from 'src/app/components/line-graph/line-graph.component';
import { Stat } from 'src/app/services/pokemons-service/interfaces';

@Component({
  selector: 'app-pokemon-status',
  templateUrl: './pokemon-status.component.html',
  styleUrls: [
    './pokemon-status.component.scss',
    '../pokemon-drawer.component.scss',
  ],
})
export class PokemonStatusComponent implements OnInit {
  @Input() public stats!: Stat[];

  public columns: LineChartColumn[] = [];
  private maxPokemonPont = 100;
  private wantedProperties = ['hp', 'attack', 'speed', 'defense'];

  constructor() {}

  public ngOnInit(): void {
    this.columns = this.stats
      .map(stat => {
        const height = Math.min(
          Math.round((stat.base_stat / this.maxPokemonPont) * 100),
          100
        );
        return {
          height,
          label: stat.stat.name,
        } as LineChartColumn;
      })
      .filter(e => this.wantedProperties.includes(e.label));
  }
}
