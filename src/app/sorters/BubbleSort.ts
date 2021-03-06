import {Sorter} from "./Sorter";
import {Frame} from "../components/frame";
import {Bar} from "../components/bar";
import {Label} from "./Label";

export class BubbleSort extends Sorter {

  constructor() {
    super();
    this._name = "Bubble Sort";
    this._complexity = "n²";
    this._stable = true;
    this._labels = [Label.Initial, Label.Comparing, Label.Sorted, Label.Minimum];
  }

  sort(array: Bar[], l: number, r: number) : Frame[] {
    let i, j, frames = [], frameArray = this.copy(array), done;
    frames.push(new Frame(array, [], false));

    for (i = l; i <= r; i++) {
      done = true;
      for (j = r; j > i; j--) {
        frameArray = this.copy(frameArray);

        if (j == r) {
          frameArray[j].state = 'comparing';
        }

        frameArray[j - 1].state = 'comparing';
        frames.push(new Frame(frameArray, [j, j - 1], false));

        frameArray = this.copy(frameArray);
        this._comparisons++;
        if (this.less(frameArray[j], frameArray[j - 1])) {
          done = false;
          frameArray = this.copy(frameArray);
          this.swap(frameArray, j - 1, j);
          frameArray[j - 1].state = 'minimum';
          frameArray[j].state = 'initial';
        }

        else {
          frameArray[j - 1].state = 'minimum';
          frameArray[j].state = 'initial';
        }
        frames.push(new Frame(frameArray, [j, j - 1], false));
      }

      if (done) {
        for (; i <= r; i++) {
          frameArray = this.copy(frameArray);
          frameArray[i].state = 'sorted';
          frames.push(new Frame(frameArray, [i], false));
        }
        break;
      }
      else {
        frameArray = this.copy(frameArray);
        frameArray[i].state = 'sorted';
        frames.push(new Frame(frameArray, [i], false));
      }
    }
    return frames;
  }
}
