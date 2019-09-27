import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { AlertOptions, LoadingOptions, ToastOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  async alert(options?: AlertOptions): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create(options);
    await alert.present();
    return alert;
  }
  async loading(options?: LoadingOptions): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      ...options
    });
    await loading.present();
    return loading;
  }
  async toast(options?: ToastOptions): Promise<HTMLIonToastElement> {
    const toast = await this.toastCtrl.create({
      position: 'bottom',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Ok',
      ...options
    });
    await toast.present();
    return toast;
  }
}
