import {Sorter} from "./Sorter";
import {Transition} from "../components/transition";
import {Frame} from "../components/frame";
import {Bar} from "../components/bar";

export class InsertionSort extends Sorter {
  sort(array: Bar[], l: number, r: number) : Frame[] {
    let i, transitions = [];

    for (i = r; i > l; i--) {
      transitions.push(new Transition(i, i - 1, 'comparing', false));
      if (this.less(array[i], array[i - 1])) {
        this.swap(array, i - 1, i);
        transitions.push(new Transition(i - 1, i, 'swap', false));
        transitions.push(new Transition(i - 1, -1, 'minimum', false))
      }
      transitions.push(new Transition(i, -1, 'initial', false));
    }

    transitions.push(new Transition(0, -1, 'sorted', false));

    for (i = l + 2; i <= r; i++) {
      let j = i, v = array.slice(i)[0];

      while (this.less(v, array[j - 1])) {
        transitions.push(new Transition(i, j - 1, 'comparing', false));
        array[j] = array[j - 1];
        let transition = new Transition(j, array[j - 1].height, 'set', false);
        transition.initialHeight = array[j].height;
        transitions.push(transition);
        transitions.push(new Transition(i, j - 1, 'initial', false));
        j--;
      }
      array[j] = v;
      let transition = new Transition(j, v.height, 'set', false);
      transition.initialHeight = array[j].height;
      transitions.push(transition);
    }

    for (i = 1; i <= r; i++)
      transitions.push(new Transition(i, -1, "sorted", false));

    array.forEach(element => console.log(element.height));

    return transitions;
  }
}
