import { Injectable }      from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  cards: BehaviorSubject<ICard[]> = new BehaviorSubject<ICard[]>([]);
  constructor() { }

  getAll() {
    return this.cards;
  }

  addCard(data: ICard) {
    const _cards = this.cards.getValue();
    _cards.push(data);
    this.cards.next(_cards);
  }
}

export interface ICard {
  title: string;
  balance: number;
  operation: any[];
  icon: string;
}
