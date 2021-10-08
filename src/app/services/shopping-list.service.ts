import { Injectable }                                   from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ShoppingListItem }                             from '../models/shopping-list';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  shoppingListItemRef: AngularFirestoreCollection<ShoppingListItem> = null;

  private dbPath = '/shoppingList';

  constructor(
    private db: AngularFirestore,
  ) {
    this.shoppingListItemRef = db.collection(this.dbPath);
    console.log(this.shoppingListItemRef);
  }

  getAll(): AngularFirestoreCollection<ShoppingListItem> {
    return this.shoppingListItemRef;
  }

  create(listItem: ShoppingListItem): any {
    return this.shoppingListItemRef.add({...listItem});
  }

  update(id: string, data: any): Promise<void> {
    return this.shoppingListItemRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.shoppingListItemRef.doc(id).delete();
  }
}
