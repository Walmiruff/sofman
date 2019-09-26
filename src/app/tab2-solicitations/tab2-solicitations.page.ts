import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AppState } from '../store/models/app-state.model';
import { selectAllSolicitations } from '../store/selectors/solicitations.selectors';
import { REMOVESOLICITATION } from './../store/actions/solicitations.action';

import { FirebaseService } from '../shared/services/firebase.service';
import { Tab2FormSolicitationsPage } from './../tab2-form-solicitations/tab2-form-solicitations.page';

@Component({
  selector: 'app-tab2-solicitations',
  templateUrl: './tab2-solicitations.page.html',
  styleUrls: ['./tab2-solicitations.page.scss']
})
export class Tab2SolicitationsPage implements OnInit {
  solicitations$: Observable<any>;
  ordemId: number;
  solicitationId: number;

  constructor(
    private store: Store<AppState>,
    private modalController: ModalController,
    private alertController: AlertController,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ordemId = this.route.snapshot.params['ordemid'];
    this.solicitations$ = this.store.pipe(select(selectAllSolicitations));
  }

  async openModalUpdate(id: string | number) {
    const modal = await this.modalController.create({
      component: Tab2FormSolicitationsPage,
      componentProps: {
        passedId: this.ordemId,
        tarefaId: id
      }
    });
    return modal.present();
  }

  async openModalCreate() {
    const modal = await this.modalController.create({
      component: Tab2FormSolicitationsPage,
      componentProps: {
        passedId: this.ordemId
      }
    });
    return modal.present();
  }

  async openConfirmRemove(id: string | number) {
    const alert = await this.alertController.create({
      header: 'Sofman',
      message: '<strong>Deseja remover a Solicitação?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Remover',
          handler: () => {
            this.firebaseService.crudFirebase({ id: id }, 'solicitation-remove');
            this.store.dispatch(new REMOVESOLICITATION({ id: Number(id) }));
          }
        }
      ]
    });
    alert.present();
  }
  async closeModal() {
    const modalclose = await this.modalController.dismiss();
    return modalclose;
  }
}
