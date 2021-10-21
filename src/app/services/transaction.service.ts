import { Injectable }                                   from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthenticationService }                        from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transactionsListRef: AngularFirestoreCollection<ITransaction> = null;
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

  add(data: ITransaction) {
    this.transactionsListRef.add({...data, userId: this.auth.userId});
  }
}

export interface ITransaction {
  id: string;
  userId: string;
  title: string;
  price: number;
  count: number;
  income: boolean;
  tags: string[];
}
