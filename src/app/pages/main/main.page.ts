import { Component, OnInit }      from '@angular/core';
import SwiperCore, { Pagination } from 'swiper';
import { CardService, ICard }     from '../../services/card.service';
import { ModalPage }              from '../modal/modal.page';
import { ModalService }           from '../../services/modal.service';
import { Validators }             from '@angular/forms';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  cards: ICard[];

  constructor(
    private cardService: CardService,
    private modalCtrl: ModalService
  ) {
    modalCtrl.modalData.subscribe((res) => {
      if (!res) {
        return;
      }
      this.addCard(res);
    });
  }

  ngOnInit() {
    this.cardService.getAll().subscribe(data => this.cards = data);
  }

  addCard(card: ICard) {
    this.cardService.addCard(card);
  }

  async addCardClick() {
    // TODO Собирать данные из ввода
    const params = {
      fields
    };
    await this.modalCtrl.openModal(ModalPage, params);
  }

}

const fields = [
  {
    type: 'text',
    name: 'title',
    title: 'Наименование',
    validators: [Validators.required]
  },
  {
    type: 'number',
    name: 'balance',
    title: 'Баланс',
    validators: [Validators.required]
  },
  {
    type: 'select',
    name: 'icons',
    title: 'Значек',
    options: [
      'card-outline',
      'cash-outline',
      'wallet-outline',
      'briefcase-outline'
    ],
    validators: [Validators.required]
  }
];
