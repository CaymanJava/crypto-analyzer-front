import { Directive, ElementRef, Input } from '@angular/core';
import hljs from 'highlight.js';

@Directive({
  selector: '[highlight]'
})
export class HighlightjsDirective {
  @Input('highlight') highlight;
  nativeEl;

  constructor(public el: ElementRef) {
    // this.registerLanguages();
    this.nativeEl = this.el.nativeElement;

    setTimeout(() => {
      hljs.highlightBlock(this.nativeEl);
    });
  }

}
