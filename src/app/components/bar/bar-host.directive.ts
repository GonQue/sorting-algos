import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[bar-host]'
})
export class BarDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
