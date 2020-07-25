import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {BarComponent} from "../bar/bar.component";
import {SelectionSort} from "../sorters/SelectionSort";
import {Transition} from "../transition";
import set = Reflect.set;

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss']
})
export class ArrayComponent implements OnInit, AfterViewInit {
  _size : number = 5;
  @ViewChildren(BarComponent) _barList: QueryList<BarComponent>;
  _barArray: BarComponent[] = [];
  _sorter : SelectionSort = new SelectionSort();
  _transitions : Transition[] = [];
  _tranIndex : number = 0;

  constructor() { }

  ngOnInit(): void {
    /*this.array.push(120);
    this.array.push(50);
    this.array.push(250);
    this.bars = document.getElementsByTagName('app-bar');*/
  }

  ngAfterViewInit(): void {
    console.log("after view");
    console.log(this._barList.length);
    this._barArray = this._barList.toArray();
  }

  sort() {
    this._transitions = this._sorter.sort(this._barArray.slice(),0,4);
    this.animate();
    /*this.bars[0].children[0];
    setTimeout(() => {
      document.getElementById("1").style.order = '120';
      document.getElementById("2").style.order = '50';
      document.getElementById("3").style.order = '250';
    }, 500);*/
  }

  animate() {
    console.log(this._transitions);
    let time = 500;

    // if (this._tranIndex < this._transitions.length) {
    //   if (this._transitions[this._tranIndex].state === 'swap') {
    //     let temp = this._barArray[this._transitions[this._tranIndex].index1].height;
    //     setTimeout(() => {
    //       this._barArray[this._transitions[this._tranIndex].index1].height = this._barArray[this._transitions[this._tranIndex].index2].height;
    //       this._barArray[this._transitions[this._tranIndex].index2].height = temp;
    //     }, time);
    //   }
    //   else {
    //     setTimeout(() => {
    //       this._barArray[this._transitions[this._tranIndex].index1].state = this._transitions[this._tranIndex].state;
    //       if (this._transitions[this._tranIndex].index2 !== -1)
    //         this._barArray[this._transitions[this._tranIndex].index2].state = this._transitions[this._tranIndex].state;
    //     }, time);
    //   }
    // }

    for (let i = 0; i < this._transitions.length; i++) {
      if (this._transitions[i].state === 'swap') {
        setTimeout(() => {
          let temp = this._barArray[this._transitions[i].index1].height;
          this._barArray[this._transitions[i].index1].height = this._barArray[this._transitions[i].index2].height;
          this._barArray[this._transitions[i].index2].height = temp;
        }, i * time);
      } else {
        setTimeout(() => {
          this._barArray[this._transitions[i].index1].state = this._transitions[i].state;
          if (this._transitions[i].index2 !== -1)
            this._barArray[this._transitions[i].index2].state = this._transitions[i].state;
        }, i * time);
      }
    }
  }

  next() {
    this._tranIndex++;
    this.animate();
  }

  range(number) {
    return Array(number);
  }

}
