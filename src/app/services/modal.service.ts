import { Injectable }      from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage }       from '../pages/modal/modal.page';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private modalCtrl: ModalController) { }

  async openModal(modalPage: typeof ModalPage, params) {
    const modal = await this.modalCtrl.create({
      component: modalPage,
      componentProps: {...params}
    });
    modal.onDidDismiss()
      .then((modalData) => {
        this.modalData.next(modalData.data);
      });

    await modal.present();
  }

  async dismissModal(data) {
    await this.modalCtrl.dismiss(data);
  }
}
