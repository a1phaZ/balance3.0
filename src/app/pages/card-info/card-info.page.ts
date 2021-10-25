import { Component, OnInit }  from '@angular/core';
import { CardService }        from '../../services/card.service';
import { ActivatedRoute }     from '@angular/router';
import { Transaction }        from '../../models/transaction';
import { Card }               from '../../models/card';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.page.html',
  styleUrls: ['./card-info.page.scss'],
})
export class CardInfoPage implements OnInit {
  cardId: string;
  card: Card;
  transactions: Transaction[];
  reducedTransactions: IReducedTransactions[];

  constructor(
    private cardService: CardService,
    private transactionService: TransactionService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.cardId = params.id;
      this.card = await this.cardService.getCard(this.cardId);
      this.transactions = await this.transactionService.getByCardId(this.cardId);
      this.reducedTransactions = this.reduceTransactions(this.transactions);
    });
  }

  private reduceTransactions(transactions: Transaction[]): IReducedTransactions[] {
    return transactions.reduce((acc: IReducedTransactions[], cur) => {
      const date = Math.round(cur.date / 10000000) * 10000000;
      if (acc.length === 0) {
        return [{date, transactions: [{...cur}]}];
      }
      if (acc[acc.length - 1].date === date) {
        acc[acc.length - 1].transactions = [...acc[acc.length - 1].transactions, {...cur}];
        return acc;
      }
      return [...acc, {date, transactions: [{...cur}]}];
    }, []);
  }
}

interface IReducedTransactions {
  date: number;
  transactions: Transaction[];
}
