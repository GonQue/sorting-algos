export class Label {
  private _color: string;
  private _text: string;

  constructor(color: string, text: string) {
    this._color = color;
    this._text = text;
  }

  static Initial = new Label('#82F8FF', 'Initial');
  static Comparing = new Label('purple', 'Comparing');
  static Sorted = new Label('green', 'Sorted');
  static Maximum = new Label('#FFF73F', 'Maximum');
  static Minimum = new Label('#FFF73F', 'Minimum');
  static Highlighted = new Label('#EF233C', 'Highlighted');
  static Boundary = new Label('#FFB000', 'Boundary');
  static Considered = new Label('#FFB000', 'Being considered');


  get color(): string {
    return this._color;
  }

  get text(): string {
    return this._text;
  }
}
