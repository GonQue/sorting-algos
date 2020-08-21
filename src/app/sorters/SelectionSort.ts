import {Sorter} from "./Sorter";
import {Frame} from "../components/frame";
import {Bar} from "../components/bar";

export class SelectionSort extends Sorter{
  sort(array: Bar[], l: number, r: number) : Frame[] {
    let i, j, frames = [], frameArray = this.copy(array);
    //maybe all change
    frames.push(new Frame(array, [], false ));
    for (i = l; i < r; i++) {
      let min = i;
      frameArray = this.copy(frameArray);
      //transitions.push(new Transition(i, -1, 'minimum', false));
      frameArray[i].state = 'minimum';
      frames.push(new Frame(frameArray, [i], false));
      for (j = i + 1; j <= r; j++) {
        let changes;
        frameArray = this.copy(frameArray);
        //transitions.push(new Transition(j, -1, 'comparing', false));
        frameArray[j].state = 'comparing';
        frameArray[min].state = 'comparing';
        frames.push(new Frame(frameArray, [j, min], false));

        frameArray = this.copy(frameArray);
        if (this.less(frameArray[j], frameArray[min])) {
          //transitions.push(new Transition(min, -1, 'initial', false));
          //transitions.push(new Transition(j, -1, 'minimum', false));
          frameArray[min].state = 'initial';
          changes = [min, j];
          min = j;
          frameArray[j].state = 'minimum';
        }
        else {
          frameArray[min].state = 'minimum';
          frameArray[j].state = 'initial';
          //transitions.push(new Transition(j, -1, 'initial', false));
          //transitions.push(new Transition(min, -1, 'minimum'));
          changes = [min, j];
        }
        frames.push(new Frame(frameArray, changes, false));
      }
      frameArray = this.copy(frameArray);
      console.log('before:' + frameArray[i].height + " ; " + frameArray[min].height);
      this.swap(frameArray, i, min);
      console.log('after:' + frameArray[i].height + " ; " + frameArray[min].height);
      //transitions.push(new Transition(i, min, 'swap', false));
      // frames.push(new Frame(frameArray, [i, min], false));
      //
      // frameArray = this.copy(frameArray);

      if (i === r - 1)  { // last iteration, everything is sorted
        //transitions.push(new Transition(i, i + 1, 'sorted', false));
        frameArray[i].state = 'sorted';
        frameArray[i + 1].state = 'sorted';
        frames.push(new Frame(frameArray, [i, i + 1], true));
      }
      else {
        // transitions.push(new Transition(min, -1, 'initial', false));
        // transitions.push(new Transition(i, -1, 'sorted', false));
        frameArray[min].state = 'initial';
        frameArray[i].state = 'sorted';
        frames.push(new Frame(frameArray, [i, min], false));
      }

    }
    frames[frames.length - 1].array.forEach(element => console.log(element.height));
    console.log('There are ' + frames.length + ' frames.');
    return frames;
  }
}
