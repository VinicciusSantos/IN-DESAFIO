import { Component, EventEmitter, Input, Output } from '@angular/core';

type PaginationButtonDirection = 'left' | 'right';

@Component({
  selector: 'app-pagination-button',
  templateUrl: './pagination-button.component.html',
  styleUrls: ['./pagination-button.component.scss'],
})
export class PaginationButtonComponent {
  @Input() public disabled = false;
  @Input() public direction = 'left';
  @Output() public clickEvent = new EventEmitter<void>();

  constructor() {}
}
