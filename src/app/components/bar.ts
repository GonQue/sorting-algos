export class Bar {
  private _height: number;
  private _state: string;

  constructor(height: number, state: string) {
    this._height = height;
    this._state = state;
  }

  get height(): number {
    return this._height;
  }

  get state(): string {
    return this._state;
  }

  set height(value: number) {
    this._height = value;
  }

  set state(value: string) {
    this._state = value;
  }
}
