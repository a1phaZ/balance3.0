import { Injectable }                       from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  alert;
  toast;

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) { }

  async showAlert(header, message, buttons) {
    this.alert = await this.alertCtrl.create({
      header, message, buttons
    });

    await this.alert.present();
  }

  async showToast(message: string, color: string) {
    this.toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color
    });
    await this.toast.present();
  }

  async showErrorToast(message: string) {
     await this.showToast(message, 'danger');
  }

  async showSuccessToast(message: string) {
    await this.showToast(message, 'success');
  }

  async dismissToast() {
    return this.toast.dismiss();
  }
}
