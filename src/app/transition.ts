export class Transition {
  private _index1 : number;
  private _index2 : number;
  private _state : string;

  constructor(index1: number, index2: number, state: string) {
    this._index1 = index1;
    this._index2 = index2;
    this._state = state;
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
}
