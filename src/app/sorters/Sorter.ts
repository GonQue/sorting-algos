import {Frame} from "../components/frame";
import {Bar} from "../components/bar";

export abstract class Sorter {

  abstract sort(array: Bar[], l: number, r: number): Frame[];

  less(a: Bar, b: Bar): boolean {
    return a.height < b.height;
  }

  swap(array: Bar[], i: number, j: number): void {
    let temp = array[i].height;
    array[i].height = array[j].height;
    array[j].height = temp;
  }

  copy(array: Bar[]): Bar[] {
    let newArray = [];
    array.forEach(el => newArray.push(new Bar(el.height, el.state)));
    return newArray;
  }
}
