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
  @Input() public colors = [
    '#C4F789',
    '#F7802A',
    '#49D0B0 ',
    '#EA686D',
    '#6884e8',
    '#ffa3fd',
  ];
  @Input() public columns: LineChartColumn[] = [];
  public bars: LineChartColumn[] = [];
  public hoveredIndex: number | null = null;

  constructor() {}

  public ngOnInit(): void {
    this.bars = this.columns.map((column, index) => {
      return { ...column, height: 0, color: this.colors[index] };
    });
    setTimeout(() => {
      this.bars.forEach((bar, index) => {
        bar.height = this.columns[index].height;
      });
    }, 200);
  }
}
