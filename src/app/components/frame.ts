import {Bar} from "./bar";

export class Frame {
  private _array: Bar[];
  private _changes: number[];
  private _animated: boolean;

  constructor(array: Bar[], changes: number[], animated: boolean) {
    this._array = array;
    this._changes = changes;
    this._animated = animated;
  }

  get array(): Bar[] {
    return this._array;
  }

  get changes(): number[] {
    return this._changes;
  }

  get animated(): boolean {
    return this._animated;
  }
}
