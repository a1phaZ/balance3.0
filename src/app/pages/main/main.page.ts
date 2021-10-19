import { Component, OnInit }      from '@angular/core';
import SwiperCore, { Pagination } from 'swiper';
import { CardService, ICard }     from '../../services/card.service';
import { ModalPage }              from '../modal/modal.page';
import { ModalService }           from '../../services/modal.service';

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
      console.log(res);
    });
  }

  ngOnInit() {
    this.cardService.getAll().subscribe(data => this.cards = data);
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
    name: 'title'
  },
  {
    type: 'number',
    name: 'balance',
  },
];
