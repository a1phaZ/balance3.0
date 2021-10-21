import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  constructor() {
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
        {
          type: 'text',
          name: 'title',
          title: 'Наименование',
          validators: [Validators.required]
        },
        {name: 'price', type: 'number', title: 'Цена', validators: [Validators.required]},
        {name: 'count', type: 'number', title: 'Количество', validators: [Validators.required]},
        {name: 'income', type: 'radio', title: 'Доход/Расход', validators: [Validators.required]},
        {name: 'tags', type: 'text', title: 'Категории', validators: []}
      ]
    };
  };
}