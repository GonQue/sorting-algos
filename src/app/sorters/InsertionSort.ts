import {Sorter} from "./Sorter";
import {Frame} from "../components/frame";
import {Bar} from "../components/bar";
import {Label} from "./Label";

export class InsertionSort extends Sorter {

  constructor() {
    super();
    this._name = "Insertion Sort";
    this._complexity = "n²";
    this._stable = true;
    this._labels = [Label.Initial, Label.Comparing, Label.Sorted, Label.Minimum, Label.Highlighted];
  }

  sort(array: Bar[], l: number, r: number) : Frame[] {
    let i, frames = [], frameArray = this.copy(array);
    frames.push(new Frame(array, [], false));

    for (i = r; i > l; i--) {
      frameArray = this.copy(frameArray);

      if (i == r) {
        frameArray[i].state = 'comparing';
      }

      frameArray[i - 1].state = 'comparing';

      frames.push(new Frame(frameArray, [i, i - 1], false));
      frameArray = this.copy(frameArray);

      this._comparisons++;
      if (this.less(frameArray[i], frameArray[i - 1])) {
        frameArray[i].state = 'minimum';
        frameArray[i - 1].state = 'initial';
        frames.push(new Frame(frameArray, [i, i - 1], false));

        frameArray = this.copy(frameArray);
        this.swap(frameArray, i - 1, i);
        frameArray[i - 1].state = 'minimum';
        frameArray[i].state = 'initial';
      }
      else {
        frameArray[i - 1].state = 'minimum';
        frameArray[i].state = 'initial';
      }
      frames.push(new Frame(frameArray, [i, i - 1], false));
    }
    frameArray = this.copy(frameArray);
    frameArray[0].state = 'sorted';
    frames.push(new Frame(frameArray, [0], false));
    frameArray = this.copy(frameArray);

    let lastJ = 1;

    for (i = l + 2; i <= r; i++) {
      let j = i, v = frameArray.slice(i)[0], changes = [];

      frameArray[lastJ].state = 'initial';
      frameArray[i].state = 'highlight';
      frames.push(new Frame(frameArray, [i, lastJ], false));
      frameArray = this.copy(frameArray);
      changes.push(i); // to change last highlight to initial

      while (this.less(v, frameArray[j - 1])) {
        this._comparisons++;
        frameArray[j - 1].state = 'comparing';
        changes.push(j - 1);

        // j in changes to have only one compare animation
        frames.push(new Frame(frameArray, [j - 1, j], false));
        frameArray = this.copy(frameArray);

        // comment to have multiple bar compare animation
        frameArray[j - 1].state = 'initial';

        frameArray[j] = frameArray[j - 1];
        j--;
      }

      // uncomment to have multiple bar compare animation
      //changes.forEach(i => frameArray[i].state = 'initial');

      changes.push(j);
      frameArray[j] = v;
      frameArray[j].state = 'highlight';
      frames.push(new Frame(frameArray, changes, false));
      frameArray = this.copy(frameArray);
      lastJ = j;
    }
    frameArray = this.copy(frameArray);
    let changes = [];
    for (i = 1; i <= r; i++) {
      changes.push(i);
      frameArray[i].state = 'sorted';
    }
    frames.push(new Frame(frameArray, changes, true));
    return frames;
  }
}
