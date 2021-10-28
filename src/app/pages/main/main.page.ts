import { Component, OnInit } from '@angular/core';
import SwiperCore, { Pagination } from 'swiper';
import { CardService } from '../../services/card.service';
import { ModalPage } from '../modal/modal.page';
import { ModalService } from '../../services/modal.service';
import { map } from 'rxjs/internal/operators';
import { FieldsService } from '../../services/fields.service';
import { Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Card } from '../../models/card';
import { Transaction } from '../../models/transaction';
import { NavController } from '@ionic/angular';
import { getOptionsList } from '../../shared/handlers';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  cards: Card[];
  card: Card;
  transactions: Transaction[];
  balance: number;
  transactionsInSum: number;
  transactionsOutSum: number;

  constructor(
    private cardService: CardService,
    private transactionService: TransactionService,
    private modalCtrl: ModalService,
    private fields: FieldsService,
    private navCtrl: NavController,
  ) {
    modalCtrl.modalData.subscribe(async (res) => {
      if (!res) {
        return;
      }
      if (res.card) {
        this.addCard(res.card);
      }
      if (res.transactions) {
        await this.addTransaction(res.transactions);
      }
      if (res.transfer) {
        this.transferMoney(res.transfer);
      }
      modalCtrl.modalData.next(null);
    });
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.cardService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(getListFromChanges())
      )
    ).subscribe(data => {
      this.cards = data;
      this.balance = this.getSum(this.cards, 'balance');
    });
    this.transactionService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(getListFromChanges())
      )
    ).subscribe(data => {
      let _in = 0;
      let _out = 0;
      data.forEach(({income, sum, transfer}) => {
        if (transfer) {
          return;
        }
        if (income) {
          _in += sum;
        } else {
          _out += sum;
        }
      });
      this.transactionsInSum = _in;
      this.transactionsOutSum = _out;
      this.transactions = data;
    });
  }

  addCard(card: Card) {
    this.card = new Card();
    this.card = {...card, balance: +card.balance, date: +new Date()};
    this.cardService.addCard({...this.card});
  }

  async addTransaction(transaction: Transaction) {
    const _transaction = new Transaction(transaction);
    await this.transactionService.add(_transaction);
    const card: Card = this.cards.find(({id}) => _transaction.cardId === id);
    this.cardService.patchCard(_transaction.cardId, {balance: card.balance + (_transaction.income ? 1 : -1) * _transaction.sum});
  }

  async addCardClick() {
    await this.modalCtrl.openModal(ModalPage, {...this.fields.cardFields});
  }

  async addTransactionClick() {
    const options = getOptionsList(this.cards);
    const field = {
      name: 'cardId',
      type: 'select',
      title: 'Счет',
      options: [...options],
      validators: [Validators.required]
    };
    await this.modalCtrl.openModal(
      ModalPage,
      {fields: [field, ...this.fields.transactionFields.fields], type: this.fields.transactionFields.type}
    );
  }

  getSum(array, key) {
    return array.reduce((acc, cur) => acc + cur[key], 0);
  }

  onCardDetailsClick(id: string) {
    this.navCtrl.navigateForward(`/card/${id}`);
  }

  async onTransferClick() {
    await this.modalCtrl.openModal(ModalPage, {...this.fields.transferFields, page: 'main'});
  }

  transferMoney(transfer) {
    this.cardService.transfer(transfer);
  }
}

const getListFromChanges = () => c => ({id: c.payload.doc.id, ...c.payload.doc.data()});
