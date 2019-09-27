import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { FilterPipe } from 'ngx-filter-pipe';

import { AppState } from '../store/models/app-state.model';
import { selectAllSolicitations } from '../store/selectors/solicitations.selectors';
import { Tab2FormSolicitationsPage } from '../tab2-form-solicitations/tab2-form-solicitations.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab2-solicitations',
  templateUrl: './tab2-solicitations.page.html',
  styleUrls: ['./tab2-solicitations.page.scss']
})
export class Tab2SolicitationsPage implements OnInit {
  solicitations$: Observable<any>;

  userFilter: any = { id: '' };

  public barcode: string;
  constructor(
    private store: Store<AppState>,
    private modalController: ModalController,
    private barcodescanner: BarcodeScanner,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.solicitations$ = this.store.pipe(select(selectAllSolicitations));
  }

  async openModalCreate() {
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
  async closeModal() {
    const modalclose = await this.modalController.dismiss();
    return modalclose;
  }
}
