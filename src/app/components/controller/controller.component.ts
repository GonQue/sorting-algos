import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ArrayComponent} from "../array/array.component";
import {Sorter} from "../../sorters/Sorter";
import {Frame} from "../frame";
import {SelectionSort} from "../../sorters/SelectionSort";

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent {

  _sorter: Sorter = new SelectionSort();
  _disableButtons: boolean = false;
  private _frames: Frame[] = [];
  private _index: number = 0;
  private _timer: number;
  _stepMode: boolean = false;
  private _rewind: boolean = false;
  _middleBtnState: string = 'sort';
  _backwardsBtnDisabled: boolean = true;
  _middleBtnDisabled: boolean = false;
  _forwardBtnDisabled: boolean = true;

  private _arrayComponent: ArrayComponent;

  @Input()
  _speed: number;

  @Output()
  disableButtons = new EventEmitter();

  @Output()
  enableButtons = new EventEmitter();

  constructor() { }

  set arrayComponent(value: ArrayComponent) {
    this._arrayComponent = value;
  }

  resetAnimation(): void {
    this._index = 0;
    this._frames = [];
    this._middleBtnState = 'sort';
    this._middleBtnDisabled = false;
    this._backwardsBtnDisabled = true;
    this._forwardBtnDisabled = true;
    this._rewind = false;
  }

  changeSorter(sorter: Sorter): void {
    this._middleBtnState = 'sort';
    this._sorter = sorter;
    this.resetAnimation();
    this._arrayComponent.restartArray();
  }

  changeStepMode(mode: boolean): void {
    this._stepMode = mode;

    // when the animation ran before activating step mode
    if (this._stepMode && this._frames.length !== 0) {
        this._middleBtnDisabled = true;
        this._forwardBtnDisabled = false;
        this._backwardsBtnDisabled = false;
    }

    if (this._index === 0)
      this._backwardsBtnDisabled = true;

    if (this._index === this._frames.length)
      this._forwardBtnDisabled = true;
  }

  sort(): void {
    this._middleBtnState = 'pause';
    this._frames = [];
    this._frames = this._arrayComponent.sort(this._sorter);

    if (this._stepMode) {
      this._backwardsBtnDisabled = false;
      this._middleBtnDisabled = true;
      this._forwardBtnDisabled = false;
      this.animate();
    }

    else {
      this._disableButtons = true;
      this.disableButtons.emit();
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
      if (!this._stepMode) {
        this._middleBtnDisabled = true;
        this.stop();
      }
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
      if (!this._stepMode) {
        this._middleBtnDisabled = true;
        this.stop();
      }
    }
  }

  stop(): void {
    this._middleBtnState = 'play';
    this._disableButtons = false;
    this.enableButtons.emit();
    clearInterval(this._timer);
  }

  resume(): void {
    this._middleBtnState = 'pause';
    this._disableButtons = true;
    this.disableButtons.emit();
    clearInterval(this._timer);
    this._timer = setInterval(() => {
      if (this._rewind) {
        this.animateBackwards();
      }
      else
        this.animate();
    }, this._speed);
  }

  rewind(): void {
    this._rewind = true;
    clearInterval(this._timer);
    this._timer = setInterval(() => {
      this.animateBackwards();
    }, this._speed);
  }

  backwardsButton(): void {
    if (this._stepMode) {
      this.animateBackwards();
      this._forwardBtnDisabled = false;
      if (this._index === 0) {
        this._backwardsBtnDisabled = true;
      }
    }
    else {
      this._disableButtons = true;
      this.disableButtons.emit();
      this._rewind = true;
      this._backwardsBtnDisabled = true;
      this._middleBtnDisabled = false;
      this._forwardBtnDisabled = false;
      this.rewind();
      this._middleBtnState = 'pause';
    }
  }

  middleButton(): void {
    if (this._middleBtnState === 'sort') {
      this._backwardsBtnDisabled = false;
      this.sort();
    }
    else if (this._middleBtnState === 'play') {
      this.resume();
    }
    else {
      this.stop();
    }
  }

  forwardButton(): void {
    if (this._stepMode) {
      this.animate();
      this._backwardsBtnDisabled = false;
      if (this._index === this._frames.length)
        this._forwardBtnDisabled = true;
    }
    else {
      this._rewind = false;
      this.resume();
      this._middleBtnState = 'pause';
      this._middleBtnDisabled = false;
      this._backwardsBtnDisabled = false;
      this._forwardBtnDisabled = true;
    }
  }

  // IMPLEMENTAR TEMPO QUE DEMOROU A CORRER
  // BUGS COM SEQUENCIA DE SORT, RESET, STOP, RESUME
  // KEYBINDS TO CONTROL
  // save last session size, speed and warning message
}
