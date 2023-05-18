import { Component, Input, OnInit } from '@angular/core';

export interface LineChartColumn {
  label: string;
  height: number;
  color?: string;
}

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss'],
})
export class LineGraphComponent implements OnInit {
  @Input() public lines = ['20%', '50%', '80%'];
  @Input() public columns: LineChartColumn[] = [];
  @Input() public colors = [
    '#C4F789',
    '#F7802A',
    '#49D0B0 ',
    '#EA686D',
    '#6884e8',
    '#ffa3fd',
  ];

  public bars: LineChartColumn[] = [];
  public hoveredIndex: number | null = null;

  constructor() {}

  public getBarHeight(bar: LineChartColumn): string {
    return Math.min(100, bar.height) + '%';
  }

  private resetHeights(): void {
    this.bars = this.columns.map((column, index) => {
      return { ...column, height: 0, color: this.colors[index] };
    });
  }

  private growChartBars(): void {
    this.bars.forEach((bar, index) => {
      bar.height = this.columns[index].height;
    });
  }

  public ngOnInit(): void {
    this.resetHeights();
    setTimeout(() => this.growChartBars(), 200);
  }
}
