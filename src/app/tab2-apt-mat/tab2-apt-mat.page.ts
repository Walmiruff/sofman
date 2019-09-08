import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AppState } from '../store/models/app-state.model';
import { selectAllMateriais } from '../store/selectors/apontamento_de_materiais.selectors';
import { REMOVE } from '../store/actions/apontamento_de_materiais.action';

import { FirebaseService } from '../shared/services/firebase.service';
import { Tab2FormAptMatPage } from '../tab2-form-apt-mat/tab2-form-apt-mat.page';

@Component({
  selector: 'app-tab2-apt-mat',
  templateUrl: './tab2-apt-mat.page.html',
  styleUrls: ['./tab2-apt-mat.page.scss'],
})
export class Tab2AptMatPage implements OnInit {

  materiais$: Observable<any>;
  ordemId: number;
  aptMatId: number;

  constructor(
    private store: Store<AppState>,
    private modalController: ModalController,
    private alertController: AlertController,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ordemId = this.route.snapshot.params['ordemid'];

    this.materiais$ = this.store
      .pipe(
        select(selectAllMateriais)
      );
  }



  async openModalUpdate(id: string | number) {
    const modal = await this.modalController.create({
      component: Tab2FormAptMatPage,
      componentProps: {
        passedId: this.ordemId,
        passedIdAptMat: id
      }
    });
    return modal.present()
  }

  async openModalCreate() {
    const modal = await this.modalController.create({
      component: Tab2FormAptMatPage,
      componentProps: {
        passedId: this.ordemId,
      }
    });
    return modal.present()
  }




  async  openConfirmRemove(id: string | number) {
    const alert = await this.alertController.create({
      header: 'Sofman',
      message: '<strong>Deseja remover Apontamento?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Remover',
          handler: () => {
            this.firebaseService.crudFirebase({ id: id }, 'apt-mat-remove');
            this.store.dispatch(new REMOVE({ id: Number(id) }));
          }
        }
      ]
    })
    alert.present();
  }



}
