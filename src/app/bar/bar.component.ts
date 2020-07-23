import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-bar',
  animations: [
    trigger('changeColor', [
      state('red', style({
        backgroundColor: 'red'
      })),
      state('green', style({
        backgroundColor: 'green',
      })),
      transition('red <=> green', [
        animate('250ms'),

      ])
    ])
  ],
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  @Input() height : number;

  @HostBinding('style.order') order : number;

  colour : string = 'red';

  constructor() {
    this.height = Math.floor(Math.random() * (500 - 5 + 1) ) + 5;
  }

  ngOnInit(): void {
  }

  color() {
    this.colour = this.colour == 'red' ? 'green' : 'red';
    this.order = this.colour == 'red' ? -1 : 999;
  }

  last() {
    this.order = 999;
  }

}

/*function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}*/
