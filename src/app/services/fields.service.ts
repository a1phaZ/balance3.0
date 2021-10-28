import { Injectable }     from '@angular/core';
import { Validators }     from '@angular/forms';
import { CardService }    from './card.service';
import { Card }           from '../models/card';
import { map }            from 'rxjs/internal/operators';
import { getOptionsList } from '../shared/handlers';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {
  cards: Card[];

  constructor(
    private cardService: CardService,
  ) {
    this.cardService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        ))
    ).subscribe(data => this.cards = data);
  }

  get cardFields() {
    return {
      fields: [
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
            'briefcase-outline',
            'document-lock-outline'
          ],
          validators: [Validators.required]
        }
      ],
      type: 'card'
    };
  };

  get transactionFields() {
    return {
      type: 'transactions',
      fields: [
        {name: 'title', type: 'text', title: 'Наименование', validators: [Validators.required]},
        {name: 'price', type: 'number', title: 'Цена', validators: [Validators.required]},
        {name: 'count', type: 'number', title: 'Количество', validators: [Validators.required]},
        // eslint-disable-next-line max-len
        {
          name: 'income',
          type: 'select',
          options: [{id: true, title: 'Доход'}, {id: false, title: 'Расход'}],
          title: 'Доход/Расход',
          validators: [Validators.required]
        },
        {name: 'tags', type: 'text', title: 'Категории', validators: []}
      ]
    };
  };

  get transferFields() {
    return {
      type: 'transfer',
      fields: [
        {name: 'from', type: 'select', options: getOptionsList(this.cards), title: 'Счет списания', validators: [Validators.required]},
        {name: 'to', type: 'select', options: getOptionsList(this.cards), title: 'Счет зачисления', validators: [Validators.required]},
        {name: 'balance', type: 'number', title: 'Сумма', validators: [Validators.required]}
      ]
    };
  }
}
