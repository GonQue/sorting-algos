import {Component, Output, EventEmitter, Input} from '@angular/core';
import {MatSelectChange} from "@angular/material/select";
import {ArrayComponent} from "../array/array.component";
import {Sorter} from "../../sorters/Sorter";
import {SelectionSort} from "../../sorters/SelectionSort";
import {InsertionSort} from "../../sorters/InsertionSort";
import {Transition} from "../transition";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent {

  private _sorter: Sorter = new SelectionSort();
  _disableButtons: boolean = false;
  _transitions: Transition[] = [];
  _backwardsTransitions: Transition[] = [];
  _tranIndex: number = 0;
  _backTranIndex: number = 0;
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
    this._tranIndex = 0;
    this._transitions = [];
  }

  onSelectChange(event: MatSelectChange): void {
    if (event.value === "Selection Sort")
      this._sorter = new SelectionSort();
    else if (event.value === "Insertion Sort")
      this._sorter = new InsertionSort();
    else
      window.alert("ERROR");
  }

  onToggleChange(event: MatSlideToggleChange): void {
    this._stepMode = event.checked;
  }

  sort(): void {
    this._disableButtons = true;
    this.disableButtons.emit();

    this._transitions = [];
    this._transitions = this._arrayComponent.sort(this._sorter);
    this._backwardsTransitions = this._transitions.slice();
    this.tweakBackwardsTransitions();

    console.log("finished");

    if (this._stepMode)
      this.animate();

    else {
      this._timer = setInterval(() => {
        // done like this instead of calling the function directly so that
        // it can use the latest variables in animate()
        this.animate();
        this._tranIndex++;
      }, this._speed);
    }
  }

  tweakBackwardsTransitions(): void {
    for (let i = 0; i < this._backwardsTransitions.length; i++) {
      let index1 = this._backwardsTransitions[i].index1;
      let index2 = this._backwardsTransitions[i].index2;
      let state = this._backwardsTransitions[i].state;

      if (state === 'swap')
        this._backwardsTransitions[i].swapIndexes();

      else if (state === 'set')
        this._backwardsTransitions[i].changeToInitialHeight();

      else if (state === 'comparing') {
        if (index2 !== -1) {
          this._backwardsTransitions.splice(i, 0, new Transition(index1, index2, 'initial', true));
          i++;
        }
        else {
          this._backwardsTransitions.splice(i, 0, new Transition(index1, -1, 'initial', true));
          i++;
        }
      }

      else if (state === 'sorted') {
        this._backwardsTransitions.splice(i, 0, new Transition(index1, -1, 'initial', true));
        i++;
      }
    }

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
      console.log(this._tranIndex);
      console.log(this._transitions[this._tranIndex]);
    }
    else {
      //this._tranIndex = 0;
      if (!this._stepMode)
        this.stop();
    }
  }

  animateBackwards(): void {
    if (this._backTranIndex >= 0) {
      let index1 = this._backwardsTransitions[this._backTranIndex].index1;
      let index2 = this._backwardsTransitions[this._backTranIndex].index2;
      let state = this._backwardsTransitions[this._backTranIndex].state;

      if (state === 'swap') {
        this._arrayComponent.swapBars(index2, index1);
      }

      else if (state === 'set') {
        this._arrayComponent.changeBarHeight(index1, index2);
      }

      else if (state === 'comparing') {
        this._arrayComponent.changeBarStatus(index1, state);
        if (index2 !== -1) {
          this._arrayComponent.changeBarStatus(index2, state);
        }
      }
      else {
        this._arrayComponent.changeBarStatus(index1, state);
        if (index2 !== -1)
          this._arrayComponent.changeBarStatus(index2, state);
      }
      console.log(this._backTranIndex);
      console.log(this._backwardsTransitions[this._backTranIndex]);
    }
    else {
      //this._tranIndex = 0;
      if (!this._stepMode)
        this.stop();
    }
  }

  // animateBackwards(): void {
  //   if (this._tranIndex >= 0) {
  //     let index1 = this._transitions[this._tranIndex].index1;
  //     let index2 = this._transitions[this._tranIndex].index2;
  //     let state = this._transitions[this._tranIndex].state;
  //
  //     if (state === 'swap') {
  //       this._arrayComponent.swapBars(index2, index1);
  //     }
  //
  //     else if (state === 'set') {
  //       let initialHeight = this._transitions[this._tranIndex].initialHeight;
  //       this._arrayComponent.changeBarHeight(index1, initialHeight);
  //     }
  //
  //     else if (state === 'comparing') {
  //       this._arrayComponent.changeBarStatus(index1, state);
  //       if (index2 !== -1) {
  //         this._arrayComponent.changeBarStatus(index2, state);
  //         this._transitions.splice(this._tranIndex - 1, 0, new Transition(index1, index2, 'initial', true));
  //       }
  //       else
  //         this._transitions.splice(this._tranIndex - 1, 0, new Transition(index1, -1, 'initial', true));
  //     }
  //     else {
  //       this._arrayComponent.changeBarStatus(index1, state);
  //       if (index2 !== -1)
  //         this._arrayComponent.changeBarStatus(index2, state);
  //     }
  //     console.log(this._tranIndex);
  //     console.log(this._transitions[this._tranIndex]);
  //   }
  //   else {
  //     //this._tranIndex = 0;
  //     if (!this._stepMode)
  //       this.stop();
  //   }
  // }

  increaseIndexes(): void {
    if (this._tranIndex < this._transitions.length - 1) {
      this._tranIndex++;

      if (this._backwardsTransitions[this._backTranIndex].backwards) {
        while (this._backwardsTransitions[this._backTranIndex].backwards) {
          this._backTranIndex++;
        }
      } else
        this._backTranIndex++;
    }
  }

  decreaseIndexes(): void {
    if (this._backTranIndex >= 1) {

      if (this._backwardsTransitions[this._backTranIndex].backwards) {
        while (this._backwardsTransitions[this._backTranIndex].backwards) {
          this._backTranIndex--;
        }
      } else {
        this._tranIndex--;
        this._backTranIndex--;
      }
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
      this._tranIndex++;
    }, this._speed);
  }

  rewind(): void {
    this._rewind == true;
    clearInterval(this._timer);
    this._timer = setInterval(() => {
      this.animateBackwards();
      this._tranIndex--;
    }, this._speed);
  }

  next(): void {
    this.increaseIndexes();
    this.animate();
  }

  previous(): void {
    this.animateBackwards();
    this.decreaseIndexes();
  }

  // IMPLEMENTAR TEMPO QUE DEMOROU A CORRER
  // BUGS COM SEQUENCIA DE SORT, RESET, STOP, RESUME
}
