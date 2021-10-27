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
  ) {
    modalCtrl.modalData.subscribe((res) => {
      if (!res) {
        return;
      }
      if (res.transactions) {
        this.addTransaction(res.transactions);
      }
      if (res.transfer) {
        CardInfoPage.transferMoney(res.transfer);
      }
    });
  }

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
      this.fields.transactionFields
    );
  }

  addTransaction(transaction: Transaction) {
    const _transaction = new Transaction({...transaction, cardId: this.cardId});
    this.transactionService.add(_transaction)
      .then(async (doc: Transaction) => {
        const {sum, income, cardId} = doc;
        this.cardService.patchCard(cardId, {balance: this.card.balance + (income ? 1 : -1) * sum});
      })
      .catch(err => console.log(err));
  }

  async onTransferClick() {
    await this.modalCtrl.openModal(ModalPage, this.fields.transferFields);
  }

  transferMoney(transfer: any[]) {
    console.log(transfer);
  }

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
