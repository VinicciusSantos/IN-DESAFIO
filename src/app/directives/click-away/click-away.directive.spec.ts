import { ElementRef } from '@angular/core';
import { ClickAwayDirective } from './click-away.directive';

describe('ClickAwayDirective', () => {
  let directive: ClickAwayDirective;
  let elementRefMock: ElementRef;

  beforeEach(() => {
    elementRefMock = {
      nativeElement: document.createElement('div'),
    } as ElementRef;
    directive = new ClickAwayDirective(elementRefMock);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should emit event when clicking outside the element', () => {
    const spy = jest.spyOn(directive.clickAway, 'emit');
    directive.onClick(document.createElement('div'));
    expect(spy).toHaveBeenCalled();
  });

  it('should not emit event when clicking inside the element', () => {
    const spy = jest.spyOn(directive.clickAway, 'emit');
    directive.onClick(elementRefMock.nativeElement);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not emit event when element is appearing', () => {
    const spy = jest.spyOn(directive.clickAway, 'emit');
    elementRefMock.nativeElement.classList.add('appearing');
    directive.onClick(document.createElement('div'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not emit event when clicking an ignored element', () => {
    jest
      .spyOn(directive as any, 'clickedInIgnoredElement')
      .mockReturnValueOnce(true);
    directive.onClick(document.createElement('div'));
    const spy = jest.spyOn(directive.clickAway, 'emit');
    expect(spy).not.toHaveBeenCalled();
  });
});
