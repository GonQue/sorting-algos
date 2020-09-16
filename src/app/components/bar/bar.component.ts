import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-bar',
  animations: [
    trigger('changeState', [
      state('initial', style({
        backgroundColor: '#6ff9ff'
      })),
      state('comparing', style({
        backgroundColor: 'purple',
      })),
      state('minimum', style({
        backgroundColor: 'yellow',
      })),
      state('maximum', style({
        backgroundColor: 'yellow',
      })),
      state('highlight', style({
        backgroundColor: '#EF233C',
      })),
      state('sorted', style({
        backgroundColor: 'green',
      })),
      state('zone', style({
        backgroundColor: 'orange',
      })),
      transition('* => *', [
        animate('10ms'),
      ])
    ])
  ],
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent {
  @Input() _height : number;

  _state : string = 'initial';

  constructor() {
    let max = 500, min = 5;
    this._height = Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  set state(value: string) {
    this._state = value;
  }
}
