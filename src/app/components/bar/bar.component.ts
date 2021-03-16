import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-bar',
  animations: [
    trigger('changeState', [
      state('initial', style({
        backgroundColor: '#82F8FF'
      })),
      state('comparing', style({
        backgroundColor: 'purple',
      })),
      state('minimum', style({
        backgroundColor: '#FFF73F',
      })),
      state('maximum', style({
        backgroundColor: '#FFF73F',
      })),
      state('highlight', style({
        backgroundColor: '#EF233C',
      })),
      state('sorted', style({
        backgroundColor: 'green',
      })),
      state('zone', style({
        backgroundColor: '#FFB000',
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
  @Input() _height: number;

  _state = 'initial';

  constructor() {
    const max = Math.round(window.innerHeight * 500 / 921), min = 5;
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
