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
    this.transactionsListRef = db.collection(
      this.dbPath,
      ref => ref.where('userId', '==', auth.userId)
    );
  }

  getAll() {
    return this.transactionsListRef;
  }

  getByCardId(id) {
    return this.transactionsListRef.ref.where('cardId', '==', id).orderBy('date', 'desc').get()
      .then(list => {
        const docList = [];
        list.forEach(doc => docList.push(doc.data()));
        return docList;
      });
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

