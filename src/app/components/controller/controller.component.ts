import {Component, Output, EventEmitter, Input} from '@angular/core';
import {MatSelectChange} from "@angular/material/select";
import {ArrayComponent} from "../array/array.component";
import {Sorter} from "../../sorters/Sorter";
import {SelectionSort} from "../../sorters/SelectionSort";
import {InsertionSort} from "../../sorters/InsertionSort";
import {Transition} from "../transition";

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent {

  private _sorter: Sorter = new SelectionSort();
  _disableButtons: boolean = false;
  _transitions: Transition[] = [];
  _tranIndex: number = 0;
  _timer: number;

  private _arrayComponent: ArrayComponent;

  @Input()
  _speed: number;

  @Output()
  disableButtons = new EventEmitter();

  @Output()
  enableButtons = new EventEmitter();
  // disableButtons.emit()

  constructor() { }

  set arrayComponent(value: ArrayComponent) {
    this._arrayComponent = value;
  }

  onSelectChange(event: MatSelectChange): void {
    if (event.value === "Selection Sort")
      this._sorter = new SelectionSort();
    else if (event.value === "Insertion Sort")
      this._sorter = new InsertionSort();
    else
      window.alert("ERROR");
  }

  sort(): void {
    this._disableButtons = true;
    this.disableButtons.emit();

    this._transitions = [];
    this._transitions = this._arrayComponent.sort(this._sorter);

    this._timer = setInterval(() => {
      // done like this instead of calling the function directly so that
      // it can use the latest variables in animate()
      this.animate();
    }, this._speed);
  }

  animate(): void {
    if (this._tranIndex < this._transitions.length) {
      let index1 = this._transitions[this._tranIndex].index1;
      let index2 = this._transitions[this._tranIndex].index2;
      let state = this._transitions[this._tranIndex].state;

      if (state === 'swap') {
        this._arrayComponent.swapBars(index1, index2);
      }

      else if (state === 'set') {
        this._arrayComponent.changeBarHeight(index1, index2);
      }

      else {
        this._arrayComponent.changeBarStatus(index1, state);
        if (index2 !== -1)
          this._arrayComponent.changeBarStatus(index2, state);
      }
      this._tranIndex++;
    }
    else {
      this._tranIndex = 0;
      this.stop();
    }
  }

  stop(): void {
    this._disableButtons = false;
    this.enableButtons.emit();
    clearInterval(this._timer);
  }

  resume(): void {
    this._disableButtons = true;
    this.disableButtons.emit();
    this._timer = setInterval(() => {
      this.animate();
    }, this._speed);
  }



  // IMPLEMENTAR TEMPO QUE DEMOROU A CORRER
  // BUGS COM SEQUENCIA DE SORT, RESET, STOP, RESUME
}
