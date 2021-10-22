import { Injectable }                                   from '@angular/core';
import { BehaviorSubject }                              from 'rxjs';
import { map }                                          from 'rxjs/internal/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthenticationService }                        from './authentication.service';
import { Card }                                         from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  cards: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);
  cardsListRef: AngularFirestoreCollection<Card> = null;
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

  addCard(data: Card) {
    this.cardsListRef.add({...data, userId: this.auth.userId});
  }

  patchCard(id: string, data: any) {
    this.cardsListRef.doc(id).update(data);
  }

  getCard(id) {
    return this.cards.pipe(
      map((cards) => cards.find((card) => card.id === id)));
  }
}
