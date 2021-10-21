import { Component, OnInit }      from '@angular/core';
import SwiperCore, { Pagination } from 'swiper';
import { CardService, ICard }     from '../../services/card.service';
import { ModalPage }              from '../modal/modal.page';
import { ModalService }           from '../../services/modal.service';
import { map }                    from 'rxjs/internal/operators';
import { FieldsService }          from '../../services/fields.service';
import { Validators }             from '@angular/forms';
import { TransactionService }     from '../../services/transaction.service';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  cards: ICard[];
  balance: number;

  constructor(
    private cardService: CardService,
    private transactionService: TransactionService,
    private modalCtrl: ModalService,
    private fields: FieldsService,
  ) {
    modalCtrl.modalData.subscribe((res) => {
      if (!res) {
        return;
      }
      if (res.card) {
        this.addCard(res.card);
      }
      if (res.transactions) {
        this.transactionService.add(res.transactions);
      }
    });
  }

  ngOnInit() {
    this.getList();
    // this.cardService.getCard('as').subscribe(data => console.log(data));
  }

  getList() {
    this.cardService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.cards = data;
      this.balance = this.getSum(this.cards, 'balance');
    });
  }

  addCard(card: ICard) {
    this.cardService.addCard({...card, date: +new Date()});
  }

  async addCardClick() {
    await this.modalCtrl.openModal(ModalPage, this.fields.cardFields);
  }

  async addTransaction() {
    const field = {name: 'itemFrom', type: 'select', title: 'Счет', options: [...this.cards], validators: [Validators.required]};
    // console.log({fields: [field, ...this.fields.transactionFields.fields], type: this.fields.transactionFields.type });
    await this.modalCtrl.openModal(
      ModalPage,
      {fields: [field, ...this.fields.transactionFields.fields], type: this.fields.transactionFields.type }
    );
  }

  getSum(array, key) {
    return array.reduce((acc, cur) => acc + cur[key], 0);
  }

}
