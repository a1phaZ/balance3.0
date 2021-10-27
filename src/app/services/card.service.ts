import { Injectable }                                   from '@angular/core';
import { BehaviorSubject }                              from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthenticationService }                        from './authentication.service';
import { Card }                                         from '../models/card';
import { TransactionService }                           from './transaction.service';
import { Transaction }                                  from '../models/transaction';

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
    private transaction: TransactionService,
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
    return this.cardsListRef.doc(id);
  }

  async transfer(transferData) {
    const fromCard: Card =
      await this.getCard(transferData.from).ref.get()
        .then((doc) => new Promise((resolve) => {
          resolve({id: doc.id, ...doc.data()});
        }));
    const toCard: Card =
      await this.getCard(transferData.to).ref.get()
        .then((doc) => new Promise((resolve) => {
          resolve({id: doc.id, ...doc.data()});
        }));

    this.patchCard(transferData.from, {balance: fromCard.balance - +transferData.balance});
    this.patchCard(transferData.to, {balance: toCard.balance + +transferData.balance});
    const fromTransaction: Transaction = new Transaction(
      {
        title: `Перевод на ${toCard.title}`,
        price: +transferData.balance,
        count: 1,
        income: 'false',
        tags: null,
        cardId: fromCard.id,
        transfer: true,
      }
    );
    const toTransaction: Transaction = new Transaction(
      {
        title: `Перевод с ${fromCard.title}`,
        price: +transferData.balance,
        count: 1,
        income: 'true',
        tags: null,
        cardId: toCard.id,
        transfer: true,
      }
    );

    await this.transaction.add(fromTransaction);
    await this.transaction.add(toTransaction);
  }
}
