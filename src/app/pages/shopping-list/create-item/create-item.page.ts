import { Component, OnInit }   from '@angular/core';
import { ShoppingListService } from '../../../services/shopping-list.service';
import { ShoppingListItem }     from '../../../models/shopping-list';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.page.html',
  styleUrls: ['./create-item.page.scss'],
})
export class CreateItemPage implements OnInit {
  shoppingListItem = new ShoppingListItem();
  submitted = false;

  constructor(private sl: ShoppingListService) { }

  ngOnInit() {
    console.log(this.shoppingListItem);
  }

  createItemList() {
    this.sl.create({...this.shoppingListItem, date: +new Date(), done: false})
      .then(res => {
        console.log('result add', res);
        this.submitted = true;
      })
      .catch(err => console.log(err));
  }

  newItemList() {
    this.shoppingListItem = new ShoppingListItem();
    this.submitted = false;
  }

}
