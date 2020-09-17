import {Sorter} from "./Sorter";
import {Frame} from "../components/frame";
import {Bar} from "../components/bar";

export class ShellSort extends Sorter {

  constructor() {
    super();
    this._complexity = "n²/³";
    this._stable = false;
  }

  sort(array: Bar[], l: number, r: number) : Frame[] {
    let i, h, frames = [], frameArray = this.copy(array), lastJ = 1, multiples = [];
    frames.push(new Frame(array, [], false));

    for (h = 1; h <= (r - l)/ 9; h = 3 * h + 1)
      ;

    console.log(h);

    for (; h > 0; h = Math.round(h / 3)) {
      frameArray = this.copy(frameArray);
      for (i = l + h; i <= r; i++) {
        let j = i, v = frameArray.slice(i)[0], changes = [];
        frameArray = this.copy(frameArray);

        multiples.forEach(i => frameArray[i].state = 'initial');

        // highlighting v bar
        frameArray[lastJ].state = 'initial';
        frameArray[i].state = 'highlight';
        multiples.push(lastJ);
        multiples.push(i);
        frames.push(new Frame(frameArray, /*[i, lastJ]*/ multiples, false));
        frameArray = this.copy(frameArray);
        changes.push(i);

        // highlighting all the bars spaced of v by a multiple of h
        multiples = [];
        for (let k = i; k >= l + h; k -= h) {
          frameArray[k - h].state = 'zone';
          multiples.push(k - h);
        }
        frames.push(new Frame(frameArray, multiples, false ));
        frameArray = this.copy(frameArray);

        while (j >= l + h && this.less(v, frameArray[j - h])) {
          this._comparisons++;
          frameArray[j - h].state = 'comparing';
          changes.push(j - h);

          frames.push(new Frame(frameArray, [j - h, j], false));
          frameArray = this.copy(frameArray);

          frameArray[j - h].state = 'initial';

          frameArray[j] = frameArray[j - h];
          j -= h;
        }
        changes.push(j);
        frameArray[j] = v;
        frameArray[j].state = 'highlight';
        frames.push(new Frame(frameArray, changes, false));
        frameArray = this.copy(frameArray);
        lastJ = j;
      }
    }
    frameArray = this.copy(frameArray);
    let changes = [];
    for (let i = 0; i <= r; i++) {
      changes.push(i);
      frameArray[i].state = 'sorted';
    }
    frames.push(new Frame(frameArray, changes, true));

    return frames;
  }
}
