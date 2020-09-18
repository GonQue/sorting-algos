import {Sorter} from "./Sorter";
import {Frame} from "../components/frame";
import {Bar} from "../components/bar";

export class SelectionSort extends Sorter {

  constructor() {
    super();
    this._complexity = "n²";
    this._stable = false;
  }

  sort(array: Bar[], l: number, r: number) : Frame[] {
    let i, j, frames = [], frameArray = this.copy(array);
    frames.push(new Frame(array, [], false ));
    for (i = l; i < r; i++) {
      let min = i;
      frameArray = this.copy(frameArray);
      frameArray[i].state = 'minimum';
      frames.push(new Frame(frameArray, [i], false));
      for (j = i + 1; j <= r; j++) {
        let changes;
        frameArray = this.copy(frameArray);
        frameArray[j].state = 'comparing';
        frameArray[min].state = 'comparing';
        frames.push(new Frame(frameArray, [j, min], false));

        frameArray = this.copy(frameArray);
        this._comparisons++;
        if (this.less(frameArray[j], frameArray[min])) {
          frameArray[min].state = 'initial';
          changes = [min, j];
          min = j;
          frameArray[j].state = 'minimum';
        }
        else {
          frameArray[min].state = 'minimum';
          frameArray[j].state = 'initial';
          changes = [min, j];
        }
        frames.push(new Frame(frameArray, changes, false));
      }
      frameArray = this.copy(frameArray);
      this.swap(frameArray, i, min);

      if (i === r - 1)  { // last iteration, everything is sorted
        frameArray[i].state = 'sorted';
        frameArray[i + 1].state = 'sorted';
        frames.push(new Frame(frameArray, [i, i + 1], true));
      }
      else {
        frameArray[min].state = 'initial';
        frameArray[i].state = 'sorted';
        frames.push(new Frame(frameArray, [i, min], false));
      }
    }
    return frames;
  }
}
