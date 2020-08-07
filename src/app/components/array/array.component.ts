import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {BarComponent} from "../bar/bar.component";
import {SelectionSort} from "../../sorters/SelectionSort";
import {Transition} from "../transition";
import {BarDirective} from "../bar/bar-host.directive";
import {MatSliderChange} from "@angular/material/slider";
import set = Reflect.set;
import {Sorter} from "../../sorters/Sorter";
import {InsertionSort} from "../../sorters/InsertionSort";

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss']
})
export class ArrayComponent implements OnInit {
  _initialArray: number[] = [];
  _barArray: BarComponent[] = [];
  _size: number = 5;
  _sorter: Sorter = new InsertionSort();
  _transitions: Transition[] = [];
  _tranIndex: number = 0;
  _speed: number = 10;
  @ViewChild(BarDirective, {static: true}) barHost: BarDirective;
  _disableButtons: boolean = false;

  constructor(private componentFactoryResolver : ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.loadBars();
  }

  loadBars(): void {
    this._barArray = [];
    this._initialArray = [];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BarComponent);

    const viewContainerRef = this.barHost.viewContainerRef;
    viewContainerRef.clear();

    for (let i = 0 ; i < this._size; i++) {
      let componentRef = viewContainerRef.createComponent(componentFactory);
      this._barArray.push(componentRef.instance);
      this._initialArray.push(componentRef.instance.height);
    }
  }

  restartArray(): void {
    for (let i = 0; i < this._size; i++) {
      this._barArray[i].height = this._initialArray[i];
      this._barArray[i].state = 'initial';
    }
  }

  onSizeSliderChange(event: MatSliderChange): void {
    this._size = event.value;
    this.loadBars();
  }

  onSpeedSliderChange(event: MatSliderChange): void {
    this._speed = event.value;
  }

  sort(): void {
    this._disableButtons = true;
    this._transitions = [];
    this._transitions = this._sorter.sort(this._barArray.slice(),0,this._size - 1);
    this.animate();
  }

  animate() {
    console.log(this._transitions);

    // if (this._tranIndex < this._transitions.length) {
    //   if (this._transitions[this._tranIndex].state === 'swap') {
    //     let temp = this._barArray[this._transitions[this._tranIndex].index1].height;
    //       this._barArray[this._transitions[this._tranIndex].index1].height = this._barArray[this._transitions[this._tranIndex].index2].height;
    //       this._barArray[this._transitions[this._tranIndex].index2].height = temp;
    //   }
    //
    //   else if (this._transitions[this._tranIndex].state === 'set') {
    //     this._barArray[this._transitions[this._tranIndex].index1].height = this._transitions[this._tranIndex].index2;
    //   }
    //
    //   else {
    //       this._barArray[this._transitions[this._tranIndex].index1].state = this._transitions[this._tranIndex].state;
    //       if (this._transitions[this._tranIndex].index2 !== -1)
    //         this._barArray[this._transitions[this._tranIndex].index2].state = this._transitions[this._tranIndex].state;
    //   }
    // }

    for (let i = 0; i < this._transitions.length; i++) {
      setTimeout(() => {
        if (this._transitions[i].state === 'swap') {
          let temp = this._barArray[this._transitions[i].index1].height;
          this._barArray[this._transitions[i].index1].height = this._barArray[this._transitions[i].index2].height;
          this._barArray[this._transitions[i].index2].height = temp;
        }

        else if (this._transitions[i].state === 'set') {
          this._barArray[this._transitions[i].index1].height = this._transitions[i].index2;
        }

        else {
            this._barArray[this._transitions[i].index1].state = this._transitions[i].state;
            if (this._transitions[i].index2 !== -1)
              this._barArray[this._transitions[i].index2].state = this._transitions[i].state;
        }

        if (i === this._transitions.length - 1) // last animation
          this._disableButtons = false;

        }, i * this._speed);
    }
  }


  // IMPLEMENTAR TEMPO QUE DEMOROU A CORRER

  next() {
    this._tranIndex++;
    this.animate();
  }
}
