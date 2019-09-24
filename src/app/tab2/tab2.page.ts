import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { FilterPipe } from 'ngx-filter-pipe';

import { AppState } from '../store/models/app-state.model';
import { selectAllOrdens } from '../store/selectors/ordem.selectors';
import { Tab2FormPage } from '../tab2-form/tab2-form.page';
import { Tab2FormSolicitationsPage } from './../tab2-form-solicitations/tab2-form-solicitations.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  ordens$: Observable<any>;
  public ordensList: {};
  userFilter: any = { ordem: '' };
  public barcode: string;
  constructor(
    private store: Store<AppState>,
    private modalController: ModalController,
    private barcodescanner: BarcodeScanner,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.ordens$ = this.store.pipe(select(selectAllOrdens));
  }

  async openModalCreate() {
    const modal = await this.modalController.create({
      component: Tab2FormPage
    });
    return modal.present();
  }

  async openModalSolicitation() {
    const modal = await this.modalController.create({
      component: Tab2FormSolicitationsPage
    });
    return modal.present();
  }

  /** ScanQrcode */
  async scanQrcode() {
    try {
      if (this.platform.is('cordova')) {
        await this.barcodescanner
          .scan()
          .then(barcodeData => {
            this.barcode = barcodeData['text'];
          })
          .catch(e => {
            this.barcode = JSON.stringify(e);
          });
      }
    } catch (error) {}
  }
}
