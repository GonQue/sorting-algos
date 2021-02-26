export class Label {
  color: string;
  text: string;

  constructor(color: string, text: string) {
    this.color = color;
    this.text = text;
  }

  static Initial = new Label('#6ff9ff', 'Initial');
  static Comparing = new Label('purple', 'Comparing');
  static Sorted = new Label('green', 'Sorted');
  static Maximum = new Label('yellow', 'Maximum');
  static Minimum = new Label('yellow', 'Minimum');
  static Highlighted = new Label('#EF233C', 'Highlighted');
  static Boundary = new Label('orange', 'Boundary');
  static Considered = new Label('orange', 'Being considered');
}
