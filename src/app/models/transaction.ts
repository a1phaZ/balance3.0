export class Transaction {
  id: string;
  userId: string;
  title: string;
  price: number;
  count: number;
  income: boolean;
  tags: string[];
  cardId: string;
  date: number = +new Date();
  sum: number;

  constructor(transaction) {
    const {title, price, count, income, tags, cardId} = transaction;
    this.title = title;
    this.price = +price;
    this.count = +count;
    this.income = income === 'true';
    this.tags = tags.split(' ');
    this.cardId = cardId;
    this.sum = this.price * this.count;
  }
}
