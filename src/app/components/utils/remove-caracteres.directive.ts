import { Directive, HostListener, ElementRef, Input } from '@angular/core';
@Directive({
  selector: '[removeCaracteres]'
})
export class RemoveCaracteresDirective {

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyPress(event) {
    if (event.key == "\\") {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event) {
    setTimeout(() => {
      this.el.nativeElement.value = this.el.nativeElement.value.replace("\\", "");
      event.preventDefault();
    }, 100);
  }
}
