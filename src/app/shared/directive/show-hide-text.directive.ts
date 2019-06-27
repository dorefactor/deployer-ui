import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appShowHideText]'
})
export class ShowHideTextDirective implements OnInit {

  private visible = false;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  public ngOnInit(): void {
    this.setUpToogleElement();
  }

  private setUpToogleElement(): void {
    // Get input element attributes
    const inputElement = this.elementRef.nativeElement;
    const inputElementHeight = inputElement.offsetHeight;
    const inputElementTop = inputElement.offsetTop;
    const parentElement = inputElement.parentElement;

    // Create toggle element
    const toggleElement = this.renderer.createElement('mat-icon');

    // Set toggle element render attributes
    this.renderer.setStyle(parentElement, 'position', 'relative');
    this.renderer.setStyle(inputElement, 'padding-right', (inputElementHeight + 5) + 'px');
    this.renderer.setStyle(toggleElement, 'position', 'absolute');
    this.renderer.setStyle(toggleElement, 'top', inputElementTop + 'px');
    this.renderer.setStyle(toggleElement, 'right', '0px');
    this.renderer.setStyle(toggleElement, 'width', inputElementHeight + 'px');
    this.renderer.setStyle(toggleElement, 'height', inputElementHeight + 'px');
    this.renderer.setStyle(toggleElement, 'cursor', 'pointer');
    this.renderer.addClass(toggleElement, 'fa');
    this.renderer.addClass(toggleElement, 'fa-eye-slash');

    // Append toggle element to input element holder
    this.renderer.appendChild(parentElement, toggleElement);

    // Listen to click event on toggle button
    this.renderer.listen(toggleElement, 'click', (event) => {
      this.visible = !this.visible;
      this.renderer.removeClass(toggleElement, `${this.visible ? 'fa-eye-slash' : 'fa-eye'}`);
      this.renderer.addClass(toggleElement, `${this.visible ? 'fa-eye' : 'fa-eye-slash'}`);
      this.renderer.setAttribute(inputElement, 'type', this.visible ? 'text' : 'password');
    });
  }

}
