import { Injectable } from '@angular/core';

export interface KeyboardAction {
  key: string;
  action: Function;
  worksInInput?: boolean;
  freezeInOverlay?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export default class KeyboardService {
  public actions: KeyboardAction[] = [];
  public overlayElements = ['.modal-container'];

  public setActions(actions: KeyboardAction[]): void {
    this.actions = actions;
  }

  public initActions(): void {
    for (let action of this.actions)
      window.addEventListener('keydown', this.eventHandler(action));
  }

  public endActions(): void {
    for (let action of this.actions)
      window.removeEventListener('keydown', this.eventHandler(action));
  }

  private eventHandler = (action: KeyboardAction) => {
    // istanbul ignore next
    return (event: KeyboardEvent) => this.handleKeyboardEvent(event, action);
  };

  private handleKeyboardEvent(
    event: KeyboardEvent,
    action: KeyboardAction
  ): void {
    const activeElement = (document as any).activeElement.tagName;
    if (!action.worksInInput && activeElement === 'INPUT') return;

    const isOverlayElementOpen = !this.overlayElements.every(
      e => !document.querySelector(e)
    );
    if (!!action.freezeInOverlay && isOverlayElementOpen) return;

    if (event.key === action.key) action.action();
  }
}
