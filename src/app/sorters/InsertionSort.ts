import {Sorter} from "./Sorter";
import {Transition} from "../components/transition";
import {Frame} from "../components/frame";
import {Bar} from "../components/bar";

export class InsertionSort extends Sorter {
  sort(array: Bar[], l: number, r: number) : Frame[] {
    let i, frames = [], frameArray = this.copy(array);

    frames.push(new Frame(array, [], false));

    for (i = r; i > l; i--) {
      frameArray = this.copy(frameArray);
      //transitions.push(new Transition(i, i - 1, 'comparing', false));
      frameArray[i].state = 'comparing';
      frameArray[i - 1].state = 'comparing';
      frames.push(new Frame(frameArray, [i, i - 1], false));

      frameArray = this.copy(frameArray);

      if (this.less(frameArray[i], frameArray[i - 1])) {

        // transitions.push(new Transition(i - 1, i, 'swap', false));
        // transitions.push(new Transition(i - 1, -1, 'minimum', false))
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
    //transitions.push(new Transition(0, -1, 'sorted', false));
    frameArray = this.copy(frameArray);
    frameArray[0].state = 'sorted';
    frames.push(new Frame(frameArray, [0], false));

    let lastJ = 1;

    for (i = l + 2; i <= r; i++) {
      let j = i, v = frameArray.slice(i)[0], changes = [];
      frameArray = this.copy(frameArray);

      frameArray[lastJ].state = 'initial';
      frameArray[i].state = 'highlight';
      frames.push(new Frame(frameArray, [i, lastJ], false));
      frameArray = this.copy(frameArray);

      changes.push(i);

      while (this.less(v, frameArray[j - 1])) {
        //transitions.push(new Transition(i, j - 1, 'comparing', false));
        //frameArray[i].state = 'comparing';
        frameArray[j - 1].state = 'comparing';
        changes.push(j - 1);

        frames.push(new Frame(frameArray, [j - 1], false));
        frameArray = this.copy(frameArray);

        //frameArray[i].state = 'initial';
        frameArray[j - 1].state = 'initial';

        frameArray[j] = frameArray[j - 1];
        //frames.push(new Frame(frameArray, [j], false));
        //frameArray = this.copy(frameArray);
        // let transition = new Transition(j, frameArray[j - 1].height, 'set', false);
        // transition.initialHeight = frameArray[j].height;
        // transitions.push(transition);
        // transitions.push(new Transition(i, j - 1, 'initial', false));
        j--;
      }
      changes.push(j);
      frameArray[j] = v;
      frameArray[j].state = 'highlight';
      frames.push(new Frame(frameArray, changes, false));
      lastJ = j;
      // let transition = new Transition(j, v.height, 'set', false);
      // transition.initialHeight = frameArray[j].height;
      // transitions.push(transition);
    }
    frameArray = this.copy(frameArray);
    let changes = [];
    for (i = 1; i <= r; i++) {
      changes.push(i);
      // transitions.push(new Transition(i, -1, "sorted", false));
      frameArray[i].state = 'sorted';
    }
    frames.push(new Frame(frameArray, changes, true));
    array.forEach(element => console.log(element.height));
    return frames;
  }
}
