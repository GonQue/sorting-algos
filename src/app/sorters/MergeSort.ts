import {Sorter} from "./Sorter";
import {Frame} from "../components/frame";
import {Bar} from "../components/bar";

export class MergeSort extends Sorter{
  private _frameArray: Bar[] = [];

  sort(array: Bar[], l: number, r: number): Frame[] {
    let frames = [];
    this._frameArray = this.copy(array) ;
    frames.push(new Frame(this._frameArray, [], false ));
    this.auxSort(l, r, frames);

    this._frameArray = this.copy(this._frameArray);
    let changes = [];
    for (let i = 0; i <= r; i++) {
      changes.push(i);
      this._frameArray[i].state = 'sorted';
    }
    frames.push(new Frame(this._frameArray, changes, true));

    return frames;
  }

  auxSort(l: number, r: number, frames: Frame[]): void {
    let m = Math.floor((r + l) / 2);
    console.log(m);
    this._frameArray = this.copy(this._frameArray);

    if (r <= l)
      return;

    this.auxSort(l, m, frames);
    this.auxSort(m + 1, r, frames);
    this.merge(l, m, r, frames);
  }

  merge(l: number, m: number, r: number, frames: Frame[]): void {
    let i, j, k, aux = [];
    this._frameArray.forEach( () => aux.push(0));

    for (i = m + 1; i > l; i--) {
      aux[i - 1] = this._frameArray[i - 1];
    }

    for (j = m; j < r; j++) {
      aux[r + m - j] = this._frameArray[j + 1];
    }

    for (k = l; k <= r; k++) {
      this._frameArray = this.copy(this._frameArray);
      this._frameArray[k].state = 'highlight';
      frames.push(new Frame(this._frameArray, [k], false));
      this._frameArray = this.copy(this._frameArray);

      if (this.less(aux[j], aux[i])) {
        this._frameArray[k] = aux[j--];
      }
      else {
        this._frameArray[k] = aux[i++];
      }
      this._frameArray[k].state = 'initial';
      frames.push(new Frame(this._frameArray, [k], false));
    }
  }
}
