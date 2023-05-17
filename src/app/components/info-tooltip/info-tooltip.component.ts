import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-tooltip',
  templateUrl: `./info-tooltip.component.html`,
  styleUrls: ['./info-tooltip.component.scss'],
})
export class InfoTooltipComponent {
  @Input() public message = '';
  @Input() public width = '';
  public isTooltipVisible = false;

  public showTooltip(): void {
    this.isTooltipVisible = true;
  }

  public hideTooltip(): void {
    this.isTooltipVisible = false;
  }
}
