import {Frame} from '../components/frame';
import {Bar} from '../components/bar';

export abstract class Sorter {
  _complexity: string;
  _comparisons: number= 0;
  _stable: boolean;

  abstract sort(array: Bar[], l: number, r: number): Frame[];

  less(a: Bar, b: Bar): boolean {
    return a.height < b.height;
  }

  swap(array: Bar[], i: number, j: number): void {
    const temp = array[i].height;
    array[i].height = array[j].height;
    array[j].height = temp;
  }

  copy(array: Bar[]): Bar[] {
    const newArray = [];
    array.forEach(el => newArray.push(new Bar(el.height, el.state)));
    return newArray;
  }

  get complexity(): string {
    return this._complexity;
  }

  get comparisons(): number {
    return this._comparisons;
  }

  get stable(): boolean {
    return this._stable;
  }
}
