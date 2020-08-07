import {BarComponent} from "../components/bar/bar.component";
import {Transition} from "../components/transition";
import {Sort} from "@angular/material/sort";
import {Sorter} from "./Sorter";

export class SelectionSort extends Sorter{
  sort(array: BarComponent[], l: number, r: number) : Transition[] {
    let i, j, transitions = [];
    for (i = l; i < r; i++) {
      let min = i;
      transitions.push(new Transition(i, -1, 'minimum'));
      for (j = i + 1; j <= r; j++) {
        transitions.push(new Transition(j, -1, 'comparing'));
        if (this.less(array[j], array[min])) {
          transitions.push(new Transition(min, -1, 'initial'));
          transitions.push(new Transition(j, -1, 'minimum'));
          min = j;
        }
        else {
          transitions.push(new Transition(j, -1, 'initial'));
          transitions.push(new Transition(min, -1, 'minimum'));
        }
      }
      this.swap(array, i, min);
      transitions.push(new Transition(i, min, 'swap'));
      if (i === r - 1)  { // last iteration, everything is sorted
        transitions.push(new Transition(i, i + 1, 'sorted'));
      }
      else {
        transitions.push(new Transition(min, -1, 'initial'));
        transitions.push(new Transition(i, -1, 'sorted'));
      }
    }
    array.forEach(element => console.log(element.height));
    console.log('There are ' + transitions.length + ' transitions.');
    return transitions;
  }
}
