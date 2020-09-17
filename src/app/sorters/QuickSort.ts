import {Sorter} from "./Sorter";
import {Frame} from "../components/frame";
import {Bar} from "../components/bar";

export class QuickSort extends Sorter{
  private _frameArray: Bar[] = [];

  constructor() {
    super();
    this._complexity = "n²";
    this._stable = false;
  }

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
    let i;
    this._frameArray = this.copy(this._frameArray);

    if (r <= l)
      return;

    i = this.partition(l, r, frames);
    this.auxSort(l, i - 1, frames);
    this.auxSort(i + 1, r, frames);
  }

  partition(l: number, r: number, frames: Frame[]): number {
    let i = l - 1, j = r, v = this._frameArray.slice(r)[0];
    this._frameArray = this.copy(this._frameArray);

    this._frameArray[l].state = 'zone';
    this._frameArray[r].state = 'zone';
    frames.push(new Frame(this._frameArray, [l, r], false));
    this._frameArray = this.copy(this._frameArray);

    let lastI = i + 1;
    while (i < j) {
      let lastJ = j - 1;

      while (this.less(this._frameArray[++i], v)) {
        this._comparisons++;
        this._frameArray[i].state = 'comparing';
        frames.push(new Frame(this._frameArray, [i, lastI], false));

        this._frameArray = this.copy(this._frameArray);
        if (i === l)
          this._frameArray[i].state = 'zone';
        else
          this._frameArray[i].state = 'initial';
        lastI = i;
      }

      this._frameArray[i].state = 'comparing';
      frames.push(new Frame(this._frameArray, [i, lastI], false));
      this._frameArray = this.copy(this._frameArray);

      while (this.less(v, this._frameArray[--j])) {
        if (j == l)
          break;

        this._comparisons++;
        this._frameArray[j].state = 'comparing';
        frames.push(new Frame(this._frameArray, [j, lastJ], false));

        this._frameArray = this.copy(this._frameArray);
        this._frameArray[j].state = 'initial';
        lastJ = j;
      }

      this._frameArray[j].state = 'minimum';
      frames.push(new Frame(this._frameArray, [j, lastJ], false));
      this._frameArray = this.copy(this._frameArray);

      if (i < j) {
        this.swap(this._frameArray, i, j);
        this._frameArray[i].state = 'minimum';
        this._frameArray[j].state = 'initial';
        frames.push(new Frame(this._frameArray, [i, j], false));
        this._frameArray = this.copy(this._frameArray);
        if (i === l)
          this._frameArray[i].state = 'zone';
        else
          this._frameArray[i].state = 'initial';
        lastI = i;
      }
    }
    this.swap(this._frameArray, i, r);
    frames.push(new Frame(this._frameArray, [i, r], false));

    this._frameArray = this.copy(this._frameArray);

    this._frameArray[j].state = 'initial'
    this._frameArray[i].state = 'initial';
    this._frameArray[l].state = 'initial';
    this._frameArray[r].state = 'initial';
    frames.push(new Frame(this._frameArray, [i, j, l, r], false));

    return i;
  }
}
