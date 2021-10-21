import { Injectable }                                   from '@angular/core';
import { BehaviorSubject }                              from 'rxjs';
import { map }                                          from 'rxjs/internal/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthenticationService }                        from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  cards: BehaviorSubject<ICard[]> = new BehaviorSubject<ICard[]>([]);
  cardsListRef: AngularFirestoreCollection<ICard> = null;
  private dbPath = '/cards';

  constructor(
    private db: AngularFirestore,
    private auth: AuthenticationService,
  ) {
    this.cardsListRef = db.collection(this.dbPath, ref => ref.where('userId', '==', auth.userId).orderBy('date'));
  }

  getAll() {
    return this.cardsListRef;
  }

  addCard(data: ICard) {
    return this.cardsListRef.add({...data, userId: this.auth.userId});
  }

  getCard(id) {
    return this.cards.pipe(
      map((cards) => cards.find((card) => card.id === id)));
  }
}

export interface ICard {
  id: string;
  userId: string;
  title: string;
  balance: number;
  operation: any[];
  icon: string;
  date: number;
}
