import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoppingListItem }                               from '../../models/shopping-list';
import { ModalPage }                                      from '../../pages/modal/modal.page';
import { ModalController }                                from '@ionic/angular';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() item: ShoppingListItem;
  @Output() doneItem = new EventEmitter();

  selectedItemId: string;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onSwipe(id) {
    this.doneItem.emit({id, done: !this.item.done});
  }

  async onClickItem(event) {
    await this.presentModal({item: this.item});
    // this.markItem(event);
  }

  markItem(event) {
    const el = event.target;
    if (!el || !el?.id) {return;}
    if (this.selectedItemId === el.id) {
      el.classList.remove('selected');
      this.selectedItemId = null;
      return;
    }
    Array.from(document.getElementsByClassName('selected')).forEach(item => item.classList.remove('selected'));
    this.selectedItemId = el.id;
    el.classList.add('selected');
  }

  async presentModal(data) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: 'balance-modal',
      componentProps: {...data},
      swipeToClose: true,
      presentingElement: await this.modalCtrl.getTop() // Get the top-most ion-modal
    });
    return await modal.present();
  }
}
