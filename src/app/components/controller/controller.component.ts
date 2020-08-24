import {Component, Output, EventEmitter, Input} from '@angular/core';
import {MatSelectChange} from "@angular/material/select";
import {ArrayComponent} from "../array/array.component";
import {Sorter} from "../../sorters/Sorter";
import {SelectionSort} from "../../sorters/SelectionSort";
import {InsertionSort} from "../../sorters/InsertionSort";
import {Transition} from "../transition";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {Frame} from "../frame";
import {BubbleSort} from "../../sorters/BubbleSort";
import {ShellSort} from "../../sorters/ShellSort";

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent {

  private _sorter: Sorter = new SelectionSort();
  _disableButtons: boolean = false;
  _frames: Frame[] = [];
  _index: number = 0;
  _timer: number;
  _stepMode: boolean = false;
  _rewind: boolean = false;

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

  resetAnimation(): void {
    this._index = 0;
    this._frames = [];
  }

  onSelectChange(event: MatSelectChange): void {
    if (event.value === "Selection Sort")
      this._sorter = new SelectionSort();
    else if (event.value === "Insertion Sort")
      this._sorter = new InsertionSort();
    else if (event.value === "Bubble Sort")
      this._sorter = new BubbleSort();
    else if (event.value === "Shell Sort")
      this._sorter = new ShellSort();
    else
      window.alert("ERROR");
  }

  onToggleChange(event: MatSlideToggleChange): void {
    this._stepMode = event.checked;
  }

  sort(): void {
    this._disableButtons = true;
    this.disableButtons.emit();

    this._frames = [];
    this._frames = this._arrayComponent.sort(this._sorter);

    console.log("finished");

    if (this._stepMode)
      this.animate();

    else {
      this._timer = setInterval(() => {
        // done like this instead of calling the function directly so that
        // it can use the latest variables in animate()
        this.animate();
      }, this._speed);
    }
  }

  animate(): void {
    if (this._index === 0)
      this._index++;

    if (this._index < this._frames.length) {
      let array = this._frames[this._index].array;

      if (this._frames[this._index].animated && !this._stepMode) {
        let changes = this._frames[this._index].changes;

        for (let i = 0; i < changes.length; i++) {
          setTimeout(() => {
            this._arrayComponent.changeBarStatus(changes[i], array[changes[i]].state);
            this._arrayComponent.changeBarHeight(changes[i], array[changes[i]].height);
          }, i * (this._speed / changes.length));
        }
      }
      else {
        this._frames[this._index].changes.forEach(i => {
          this._arrayComponent.changeBarStatus(i, array[i].state);
          this._arrayComponent.changeBarHeight(i, array[i].height);
        });
      }
      this._index++;
    }
    else {
      if (!this._stepMode)
        this.stop();
    }
  }

  animateBackwards(): void {
    if (this._index === this._frames.length)
      this._index--;

    if (this._index > 0) {
      let array = this._frames[this._index - 1].array;

      if (this._frames[this._index].animated && !this._stepMode) {
        let changes = this._frames[this._index].changes;

        for (let i = changes.length - 1; i >= 0; i--) {
          setTimeout(() => {
            this._arrayComponent.changeBarStatus(changes[i], array[changes[i]].state);
            this._arrayComponent.changeBarHeight(changes[i], array[changes[i]].height);
          }, (i - changes.length - 1) * (this._speed / changes.length));
        }
      }

      else {
        this._frames[this._index].changes.forEach(i => {
          this._arrayComponent.changeBarStatus(i, array[i].state);
          this._arrayComponent.changeBarHeight(i, array[i].height);
        })
      }
      this._index--;
    }
    else {
      if (!this._stepMode)
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

  rewind(): void {
    this._rewind == true;
    clearInterval(this._timer);
    this._timer = setInterval(() => {
      this.animateBackwards();
    }, this._speed);
  }
  //
  // next(): void {
  //   if (this._index < this._frames.length - 1) {
  //     this._index++;
  //     this.animate();
  //   }
  // }
  //
  // previous(): void {
  //   if (this._index > 0) {
  //     this.animateBackwards();
  //     this._index--;
  //   }
  // }

  // IMPLEMENTAR TEMPO QUE DEMOROU A CORRER
  // BUGS COM SEQUENCIA DE SORT, RESET, STOP, RESUME
  // KEYBINDS TO CONTROL
}
