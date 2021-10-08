import { Injectable }                                   from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ShoppingListItem }               from '../models/shopping-list';
import { NotificationService }                          from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  shoppingListItemRef: AngularFirestoreCollection<ShoppingListItem> = null;

  private dbPath = '/shoppingList';
  constructor(
    private db: AngularFirestore,
    private notify: NotificationService,
  ) {
    this.shoppingListItemRef = db.collection(this.dbPath);
    console.log(this.shoppingListItemRef);
  }

  getAll(): AngularFirestoreCollection<ShoppingListItem> {
    return this.shoppingListItemRef;
  }

  create(listItem: ShoppingListItem): any {
    console.log(listItem);
    const id = this.db.createId();
    return this.db.doc(`${this.dbPath}/${id}`).set({...listItem});
    return this.shoppingListItemRef.add({...listItem});
  }

  update(id: string, data: any): Promise<void> {
    return this.shoppingListItemRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.shoppingListItemRef.doc(id).delete();
  }
}
