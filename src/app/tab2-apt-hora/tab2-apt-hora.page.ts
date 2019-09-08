import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AppState } from '../store/models/app-state.model';
import { selectAllHoras } from '../store/selectors/apontamento_de_horas.selectors';
import { REMOVEHORA } from '../store/actions/apontamento_de_horas.action';

import { FirebaseService } from '../shared/services/firebase.service';
import { Tab2FormAptHoraPage } from '../tab2-form-apt-hora/tab2-form-apt-hora.page';

@Component({
  selector: 'app-tab2-apt-hora',
  templateUrl: './tab2-apt-hora.page.html',
  styleUrls: ['./tab2-apt-hora.page.scss'],
})
export class Tab2AptHoraPage implements OnInit {

  horas$: Observable<any>;
  ordemId: number;
  aptHoraId: number;

  constructor(
    private store: Store<AppState>,
    private modalController: ModalController,
    private alertController: AlertController,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ordemId = this.route.snapshot.params['ordemid'];

    this.horas$ = this.store
      .pipe(
        select(selectAllHoras)
      );
  }



  async openModalUpdate(id: string | number) {
    const modal = await this.modalController.create({
      component: Tab2FormAptHoraPage,
      componentProps: {
        passedId: this.ordemId,
        passedIdAptHora: id
      }
    });
    return modal.present()
  }

  async openModalCreate() {
    const modal = await this.modalController.create({
      component: Tab2FormAptHoraPage,
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
            this.firebaseService.crudFirebase({ id: id }, 'apt-hora-remove');
            this.store.dispatch(new REMOVEHORA({ id: Number(id) }));
          }
        }
      ]
    })
    alert.present();
  }



}
