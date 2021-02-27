export class Label {
  private _color: string;
  private _text: string;

  constructor(color: string, text: string) {
    this._color = color;
    this._text = text;
  }

  static Initial = new Label('#6ff9ff', 'Initial');
  static Comparing = new Label('purple', 'Comparing');
  static Sorted = new Label('green', 'Sorted');
  static Maximum = new Label('yellow', 'Maximum');
  static Minimum = new Label('yellow', 'Minimum');
  static Highlighted = new Label('#EF233C', 'Highlighted');
  static Boundary = new Label('orange', 'Boundary');
  static Considered = new Label('orange', 'Being considered');


  get color(): string {
    return this._color;
  }

  get text(): string {
    return this._text;
  }
}
