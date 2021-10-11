import { Injectable }                                   from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import Purchase                                         from '../models/purchase';
import { AuthenticationService }                        from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  purchaseListRef: AngularFirestoreCollection<Purchase> = null;

  private dbPath = '/purchase';

  constructor(
    private db: AngularFirestore,
    private auth: AuthenticationService,
  ) {
    db.collection(this.dbPath, ref => ref.where('userId', '==', auth.userId).orderBy('date'));
  }

  getAll(): AngularFirestoreCollection<Purchase> {
    return this.purchaseListRef;
  }

  create(purchase: Purchase): any {
    return this.purchaseListRef.add({...purchase, userId: this.auth.userData.uid});
  }

  update(id: string, data: any): Promise<void> {
    return this.purchaseListRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.purchaseListRef.doc(id).delete();
  }
}
