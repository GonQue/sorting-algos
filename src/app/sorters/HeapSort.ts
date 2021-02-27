import {Sorter} from "./Sorter";
import {Frame} from "../components/frame";
import {Bar} from "../components/bar";
import {Label} from "./Label";

export class HeapSort extends Sorter{
  private _frameArray: Bar[] = [];

  constructor() {
    super();
    this._name = "HeapSort";
    this._complexity = "n log(n)";
    this._stable = false;
    this._labels = [Label.Initial, Label.Comparing, Label.Sorted, Label.Maximum, Label.Highlighted];
  }

  sort(array: Bar[], l: number, r: number): Frame[] {
    let frames = [];
    this._frameArray = this.copy(array) ;
    frames.push(new Frame(this._frameArray, [], false ));


    this.buildHeap(l, r, frames);

    while (r - l > 0) {
      this._frameArray = this.copy(this._frameArray);
      this.swap(this._frameArray, l, r);
      this._frameArray[r].state = 'sorted';
      frames.push(new Frame(this._frameArray, [l, r], false));
      this.fixDown(l, --r, l, 0, frames);
    }

    this._frameArray = this.copy(this._frameArray);
    this._frameArray[l].state = 'sorted';
    frames.push(new Frame(this._frameArray, [l], false));
    return frames;
  }

  parent(k: number): number {
    return (Math.round((k + 1) / 2)) - 1;
  }

  left(k: number): number {
    return 2 * k + 1;
  }

  right(k: number): number {
    return 2 * (k + 1);
  }

  fixDown(l: number, r: number, k: number, lastK: number, frames: Frame[]): void {
    let ileft, iright, largest = k;

    this._frameArray = this.copy(this._frameArray);
    this._frameArray[k].state = 'highlight';
    frames.push(new Frame(this._frameArray, [k, lastK], false));

    ileft = l + this.left(k - l);
    iright = l + this.right(k - l);

    this._comparisons++;
    if (ileft <= r && this.less(this._frameArray[largest], this._frameArray[ileft])) {
      this._frameArray = this.copy(this._frameArray);
      this._frameArray[largest].state = 'comparing';
      this._frameArray[ileft].state = 'comparing';
      frames.push(new Frame(this._frameArray, [largest, ileft], false));

      this._frameArray = this.copy(this._frameArray);
      this._frameArray[largest].state = 'initial';
      this._frameArray[ileft].state = 'maximum';
      frames.push(new Frame(this._frameArray, [largest, ileft], false));
      largest = ileft;
    }

    this._comparisons++;
    if (iright <= r && this.less(this._frameArray[largest], this._frameArray[iright])) {
      this._frameArray = this.copy(this._frameArray);
      this._frameArray[largest].state = 'comparing';
      this._frameArray[iright].state = 'comparing';
      frames.push(new Frame(this._frameArray, [largest, iright], false));

      this._frameArray = this.copy(this._frameArray);
      this._frameArray[largest].state = 'initial';
      this._frameArray[iright].state = 'maximum';
      frames.push(new Frame(this._frameArray, [largest, iright], false));
      largest = iright;
    }

    if (largest !== k) {
      this._frameArray = this.copy(this._frameArray);
      this.swap(this._frameArray, k, largest);
      this._frameArray[k].state = 'maximum';
      this._frameArray[largest].state = 'initial';
      frames.push(new Frame(this._frameArray, [k, largest], false));
      this._frameArray = this.copy(this._frameArray);
      this._frameArray[k].state = 'initial';
      this.fixDown(l, r, largest, k, frames);
    }

    else {
      this._frameArray = this.copy(this._frameArray);
      this._frameArray[k].state = 'initial';
      frames.push(new Frame(this._frameArray, [k], false));
    }
  }

  buildHeap(l: number, r: number, frames: Frame[]): void {
    let k, heapSize = r - l + 1;

    for (k = Math.round(heapSize / 2) - 1; k >= l; k--)
      this.fixDown(l, r, l + k, 0, frames);
  }
}
