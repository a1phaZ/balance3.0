import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShoppingListService }                from '../../services/shopping-list.service';
import { map }                                from 'rxjs/internal/operators';
import { ShoppingListItem }                   from '../../models/shopping-list';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {
  form: FormGroup = new FormBuilder().group({
    name: [null, Validators.required]
  });
  list: ShoppingListItem[];
  doneList: ShoppingListItem[];
  unDoneList: ShoppingListItem[];
  shoppingListItem = new ShoppingListItem();

  constructor(
    private sl: ShoppingListService,
  ) { }

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
      console.log(data);
      this.list = data;
      this.fillLists();
    });
  }

  fillLists() {
    this.doneList = this.list.filter(({done}) => done);
    this.unDoneList = this.list.filter(({done}) => !done);
  }

  doneItem($event: { id: string; done: boolean }) {
    const {id, done} = $event;
    this.sl.update(id, {done});
  }
}
