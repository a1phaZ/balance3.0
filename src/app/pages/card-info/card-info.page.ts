import { Component, OnInit }  from '@angular/core';
import { CardService }        from '../../services/card.service';
import { ActivatedRoute }     from '@angular/router';
import { Transaction }        from '../../models/transaction';
import { Card }               from '../../models/card';
import { TransactionService } from '../../services/transaction.service';
import { ModalService }       from '../../services/modal.service';
import { ModalPage }          from '../modal/modal.page';
import { FieldsService }      from '../../services/fields.service';
import { compareDate }        from '../../shared/handlers';
import { map }                from 'rxjs/internal/operators';

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
    private route: ActivatedRoute,
    private modalCtrl: ModalService,
    private fields: FieldsService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.cardId = params.id;
      this.cardService.getCard(this.cardId).snapshotChanges().pipe(
        map(changes => changes.payload)
      ).subscribe(doc => this.card = doc.data());
      this.transactionService.getByCardId(this.cardId).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({id: c.payload.doc.id, ...c.payload.doc.data()})
          )
        )
      ).subscribe(data => {
        this.transactions = data;
        this.reducedTransactions = this.reduceTransactions(this.transactions);
      });
    });
  }

  async onAddClick() {
    await this.modalCtrl.openModal(
      ModalPage,
      {...this.fields.transactionFields, cardId: this.cardId}
    );
  }

  async addTransaction(transaction: Transaction) {
    const _transaction = new Transaction({...transaction, cardId: this.cardId});
    await this.transactionService.add(_transaction);
    await this.cardService.patchCard(_transaction.cardId, {balance: this.card.balance + (_transaction.income ? 1 : -1) * _transaction.sum});
  }

  async onTransferClick() {
    await this.modalCtrl.openModal(ModalPage, {...this.fields.transferFields});
  }
  //
  // transferMoney(transfer: any[]) {
  //   console.log(transfer, 'info-page');
  // }

  private reduceTransactions(transactions: Transaction[]): IReducedTransactions[] {
    return transactions.reduce((acc: IReducedTransactions[], cur) => {
      if (acc.length === 0) {
        return [{date: cur.date, transactions: [{...cur}]}];
      }
      if (compareDate(acc[acc.length - 1].date, cur.date)) {
        acc[acc.length - 1].transactions = [...acc[acc.length - 1].transactions, {...cur}];
        return acc;
      }
      return [...acc, {date: cur.date, transactions: [{...cur}]}];
    }, []);
  }
}

interface IReducedTransactions {
  date: number;
  transactions: Transaction[];
}
