import {Sorter} from "./Sorter";
import {BarComponent} from "../components/bar/bar.component";
import {Transition} from "../components/transition";

export class InsertionSort extends Sorter {
  sort(array: BarComponent[], l: number, r: number) : Transition[] {
    let i, transitions = [];

    for (i = r; i > l; i--) {
      transitions.push(new Transition(i, i - 1, 'comparing'));
      if (this.less(array[i], array[i - 1])) {
        this.swap(array, i - 1, i);
        transitions.push(new Transition(i - 1, i, 'swap'));
        transitions.push(new Transition(i - 1, -1, 'minimum'))
      }
      transitions.push(new Transition(i, -1, 'initial'));
    }

    for (i = l + 2; i <= r; i++) {
      let j = i, v = array.slice(i)[0];

      while (this.less(v, array[j - 1])) {
        transitions.push(new Transition(i, j - 1, 'comparing'));
        array[j] = array[j - 1];
        transitions.push(new Transition(j, array[j - 1].height, 'set'));
        transitions.push(new Transition(i, j - 1, 'initial'));
        j--;
      }
      array[j] = v;
      transitions.push(new Transition(j, v.height, 'set'));
    }

    array.forEach(element => console.log(element.height));

    return transitions;
  }
}
