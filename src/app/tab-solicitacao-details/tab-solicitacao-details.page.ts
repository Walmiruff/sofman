import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/models/app-state.model';
import { selectAllSolicitations } from '../store/selectors/solicitations.selectors';
import { REMOVESOLICITATION } from '../store/actions/solicitations.action';

import { FirebaseService } from '../shared/services/firebase.service';
import { TabFormSolicitacaoPage } from '../tab-form-solicitacao/tab-form-solicitacao.page';

@Component({
  selector: 'app-tab-solicitacao-details',
  templateUrl: './tab-solicitacao-details.page.html',
  styleUrls: ['./tab-solicitacao-details.page.scss'],
})
export class TabSolicitacaoDetailsPage implements OnInit {

  solicitacoes$: Observable<any>;
  solicitacaoId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private firebaseService: FirebaseService,
    private modalController: ModalController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.solicitacaoId = this.route.snapshot.params['id'];
    this.solicitacoes$ = this.store
      .pipe(
        select(selectAllSolicitations)
      )
  }

  async openModalUpdate() {
    const modal = await this.modalController.create({
      component: TabFormSolicitacaoPage,
      componentProps: {
        passedId: this.solicitacaoId
      }
    })
    return modal.present()
  }

  async  openConfirmRemove() {
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
            this.firebaseService.crudFirebase({ id: this.solicitacaoId }, 'solicitacao-remove');
            this.store.dispatch(new REMOVESOLICITATION({ id: Number(this.solicitacaoId) }));
            this.router.navigate(['/tabs/tab-solicitacao/']);
          }
        }
      ]
    })
    alert.present();
  }
}
