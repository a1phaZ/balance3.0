export class MoneyBox {
  id: string;
  userId: string;
  title: string;
  sum: number;
  operations: any[];

  constructor(userId, title, sum = 0, operations = []) {
    this.userId = userId;
    this.title = title;
    this.sum = sum;
    this.operations = operations;
  }

  get box() {
    return new MoneyBox(this.userId, this.title, this.sum, this.operations);
  }
}
