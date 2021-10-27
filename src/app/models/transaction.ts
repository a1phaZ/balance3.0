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
  transfer?: boolean;

  constructor(transaction) {
    const {title, price, count, income, tags, cardId, transfer = false} = transaction;
    this.title = title;
    this.price = +price;
    this.count = +count;
    this.income = income === 'true';
    this.tags = !!tags ? tags.split(' ') : [];
    this.cardId = cardId;
    this.sum = this.price * this.count;
    this.transfer = transfer;
  }
}
