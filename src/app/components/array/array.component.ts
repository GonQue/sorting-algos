import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import {BarComponent} from "../bar/bar.component";
import {Transition} from "../transition";
import {BarDirective} from "../bar/bar-host.directive";
import {Sorter} from "../../sorters/Sorter";

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss']
})
export class ArrayComponent implements OnInit {
  _initialArray: number[] = [];
  _barArray: BarComponent[] = [];
  _size: number = 5;
  @ViewChild(BarDirective, {static: true}) barHost: BarDirective;

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

  changeSize(size: number): void {
    this._size = size;
    this.loadBars();
  }

  sort(sorter: Sorter): Transition[] {
    return sorter.sort(this._barArray.slice(),0,this._size - 1);
  }

  swapBars(i: number, j: number): void {
    let temp = this._barArray[i].height;
    this._barArray[i].height = this._barArray[j].height;
    this._barArray[j].height = temp;
  }

  changeBarHeight(index: number, height: number): void {
    this._barArray[index].height = height;
  }

  changeBarStatus(index: number, status: string): void {
    this._barArray[index].state = status;
  }
}
