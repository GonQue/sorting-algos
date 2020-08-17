export class Transition {
  private _index1: number;
  private _index2: number;
  private _state: string;
  private _initialHeight: number;
  private _backwards: boolean;

  constructor(index1: number, index2: number, state: string, backwards: boolean) {
    this._index1 = index1;
    this._index2 = index2;
    this._state = state;
    this._backwards = backwards;
  }

  get index1(): number {
    return this._index1;
  }

  get index2(): number {
    return this._index2;
  }

  get state(): string {
    return this._state;
  }

  get initialHeight(): number {
    return this._initialHeight;
  }

  get backwards(): boolean {
    return this._backwards;
  }

  set initialHeight(value: number) {
    this._initialHeight = value;
  }

  swapIndexes(): void {
    let temp = this._index1;
    this._index1 = this._index2;
    this._index2 = temp;
  }

  changeToInitialHeight(): void {
    this._index2 = this._initialHeight;
  }
}
