import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-bar',
  animations: [
    trigger('changeState', [
      state('initial', style({
        backgroundColor: 'cyan'
      })),
      state('comparing', style({
        backgroundColor: 'purple',
      })),
      state('minimum', style({
        backgroundColor: 'yellow',
      })),
      state('sorted', style({
        backgroundColor: 'green',
      })),
      transition('* => *', [
        animate('10ms'),

      ])
    ])
  ],
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  @Input() _height : number;

  _state : string = 'initial';

  constructor() {
    this._height = Math.floor(Math.random() * (500 - 5 + 1) ) + 5;
  }

  ngOnInit(): void {
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

/*function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}*/
