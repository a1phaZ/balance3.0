import { Component, OnInit }   from '@angular/core';
import { ShoppingListService } from '../../../services/shopping-list.service';
import { ShoppingListItem }    from '../../../models/shopping-list';
import { NotificationService } from '../../../services/notification.service';
import { map }                 from 'rxjs/internal/operators';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.page.html',
  styleUrls: ['./create-item.page.scss'],
})
export class CreateItemPage implements OnInit {
  shoppingListItem = new ShoppingListItem();
  submitted = false;
  list: any[] = [];
  doneList: any[];
  unDoneList: any[];

  constructor(
    private sl: ShoppingListService,
    private notify: NotificationService
  ) {
  }


  ngOnInit() {
    this.getList();
  }

  getList() {
    this.sl.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.list = data;
      this.fillLists();
    });
  }

  fillLists() {
    this.doneList = this.list.filter(({done}) => done);
    this.unDoneList = this.list.filter(({done}) => !done);
  }

  createItemList() {
    this.submitted = true;
    this.sl.create({...this.shoppingListItem, date: +new Date(), done: false})
      .then(() => {
        this.newItemList();
      })
      .catch(err => this.notify.showErrorToast(err.message));
  }

  newItemList() {
    this.shoppingListItem = new ShoppingListItem();
    this.submitted = false;
  }

  itemChange(id, done) {
    this.sl.update(id, {done});
  }

}
