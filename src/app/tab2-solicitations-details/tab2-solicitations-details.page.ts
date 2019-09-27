import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../store/models/app-state.model';
import { selectAllSolicitations } from '../store/selectors/solicitations.selectors';
import { REMOVESOLICITATION } from '../store/actions/solicitations.action';
import { Tab2FormSolicitationsPage } from '../tab2-form-solicitations/tab2-form-solicitations.page';
import { FirebaseService } from '../shared/services/firebase.service';

@Component({
  selector: 'app-tab2-solicitations-details',
  templateUrl: './tab2-solicitations-details.page.html',
  styleUrls: ['./tab2-solicitations-details.page.scss']
})
export class Tab2SolicitationsDetailsPage implements OnInit {
  solicitations$: Observable<any>;
  solicitationId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private firebaseService: FirebaseService,
    private modalController: ModalController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.solicitationId = this.route.snapshot.params['solicitationid'];
    console.log(this.solicitationId);

    this.solicitations$ = this.store.pipe(select(selectAllSolicitations));
  }

  async openModalUpdate() {
    const modal = await this.modalController.create({
      component: Tab2FormSolicitationsPage,
      componentProps: {
        passedId: this.solicitationId
      }
    });
    console.log(this.solicitationId);
    return modal.present();
  }

  async openConfirmRemove() {
    const alert = await this.alertController.create({
      header: 'Sofman',
      message: '<strong>Deseja remover Ordem?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Remover',
          handler: () => {
            this.firebaseService.crudFirebase({ id: this.solicitationId }, 'ordem-remove');
            this.store.dispatch(new REMOVESOLICITATION({ id: Number(this.solicitationId) }));
            this.router.navigate(['/tabs/tab2-solicitations']);
          }
        }
      ]
    });
    alert.present();
  }
}
