import {BarComponent} from "../bar/bar.component";
import {Transition} from "../transition";

export class SelectionSort {
  sort(array: BarComponent[], l: number, r: number) : Transition[] {
    let i, j, transitions = [];
    for (i = l; i < r; i++) {
      let min = i;
      transitions.push(new Transition(i, -1, 'minimum'));
      for (j = i + 1; j <= r; j++) {
        transitions.push(new Transition(min, j, 'comparing'));
        if (array[j].height < array[min].height) {
          transitions.push(new Transition(min, -1, 'initial'));
          transitions.push(new Transition(j, -1, 'minimum'));
          min = j;
        }
        else {
          transitions.push(new Transition(j, -1, 'initial'));
          transitions.push(new Transition(min, -1, 'minimum'));
        }
      }
      let temp = array[i];
      array[i] = array[min];
      array[min] = temp;
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
