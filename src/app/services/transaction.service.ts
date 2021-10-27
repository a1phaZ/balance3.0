import { Injectable }                                   from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthenticationService }                        from './authentication.service';
import { Transaction }                                  from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transactionsListRef: AngularFirestoreCollection<Transaction> = null;
  private dbPath = '/transactions';

  constructor(
    private db: AngularFirestore,
    private auth: AuthenticationService
  ) {
    this.transactionsListRef = this.db.collection(
      this.dbPath,
      ref => ref.where('userId', '==', this.auth.userId).orderBy('date', 'desc')
    );
  }

  getAll() {
    return this.transactionsListRef;
  }

  getByCardId(id) {
    this.transactionsListRef = this.db.collection(
      this.dbPath,
      ref => ref.where('userId', '==', this.auth.userId).where('cardId', '==', id).orderBy('date', 'desc')
    );
    return this.transactionsListRef;
  }

  add(data: Transaction) {
    return this.transactionsListRef.add({...data, userId: this.auth.userId})
      .then(doc => new Promise((resolve) => {
        doc.onSnapshot((d) => {
          resolve(d.data());
        });
      }));
  }
}

