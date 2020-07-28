import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {BarComponent} from "../bar/bar.component";
import {SelectionSort} from "../sorters/SelectionSort";
import {Transition} from "../transition";
import {BarDirective} from "../bar-host.directive";

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss']
})
export class ArrayComponent implements OnInit {
  _size : number = 5;
  @ViewChildren(BarComponent) _barList: QueryList<BarComponent>;
  _barArray: BarComponent[] = [];
  _sorter : SelectionSort = new SelectionSort();
  _transitions : Transition[] = [];
  _tranIndex : number = 0;
  @ViewChild(BarDirective, {static: true}) barHost : BarDirective;

  constructor(private componentFactoryResolver : ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.loadBars();

  }

  loadBars() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BarComponent);

    const viewContainerRef = this.barHost.viewContainerRef;
    viewContainerRef.clear();

    for (let i = 0 ; i < this._size; i++) {
      let componentRef = viewContainerRef.createComponent(componentFactory);
      this._barArray.push(componentRef.instance);
    }

  }

  sort() {
    this._transitions = this._sorter.sort(this._barArray.slice(),0,this._size - 1);
    this.animate();
  }

  animate() {
    console.log(this._transitions);
    let time = 10;

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


  // IMPLEMENTAR TEMPO QUE DEMOROU A CORRER, RESET PARA ESTADO INICIAL DO ARRAY, GERAR NOVO ARRAY

  next() {
    this._tranIndex++;
    this.animate();
  }

  newArray() {
    this._barArray = [];
    this._size = 10;
    this.loadBars();
  }
}
