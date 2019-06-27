import { ShowHideTextDirective } from './show-hide-text.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('ShowHideTextDirective', () => {
  it('should create an instance', () => {
    const elementRef: ElementRef = null;
    const renderer: Renderer2 = null;
    const directive = new ShowHideTextDirective(elementRef, renderer);
    expect(directive).toBeTruthy();
  });
});
