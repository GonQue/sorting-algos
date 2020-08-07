import {BarComponent} from "../components/bar/bar.component";
import {Transition} from "../components/transition";

export abstract class Sorter {
  abstract sort(array: BarComponent[], l: number, r: number) : Transition[];

  less(a: BarComponent, b: BarComponent) : boolean {
    return a.height < b.height;
  }

  swap(array: BarComponent[], i: number, j: number) : void {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
