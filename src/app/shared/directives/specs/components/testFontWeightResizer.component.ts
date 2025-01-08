import { Component } from '@angular/core';
import { fontWeightResizerDirective } from '../../fontWeightResizer.directive';

@Component({
  imports: [fontWeightResizerDirective],
  standalone: true,
  template: `<h2 fontWeightResizer="bold">Teste Directive</h2>`,
})
export class testFontWeightResizer {}
