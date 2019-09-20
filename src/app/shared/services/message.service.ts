import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public loading;
  constructor(private loadingController: LoadingController, private alertCtrl: AlertController) {}

  async showLoading(message: string, loadingId: string) {
    this.loading = await this.loadingController.create({
      message: message,
      id: loadingId
    });
    return await this.loading.present();
  }

  async hideLoading(loadingId: string) {
    return await this.loadingController.dismiss(null, null, loadingId);
  }

  async alerts(title, message, button) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: [button]
    });
    return await alert.present();
  }
}
