import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../store/models/app-state.model';
import { selectAllOrdens } from '../store/selectors/ordem.selectors';
import { REMOVEORDEM } from '../store/actions/ordem.action';

import { FirebaseService } from '../shared/services/firebase.service';
import { Tab2FormPage } from '../tab2-form/tab2-form.page';






@Component({
  selector: 'app-tab2-details',
  templateUrl: './tab2-details.page.html',
  styleUrls: ['./tab2-details.page.scss'],
})
export class Tab2DetailsPage implements OnInit {

  ordens$: Observable<any>;
  ordemId: number

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private firebaseService: FirebaseService,
    private modalController: ModalController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.ordemId = this.route.snapshot.params['ordemid'];
    console.log(this.ordemId);

    this.ordens$ = this.store
      .pipe(
        select(selectAllOrdens)
      );
  }

  async openModalUpdate() {
    const modal = await this.modalController.create({
      component: Tab2FormPage,
      componentProps: {
        passedId: this.ordemId
      }
    });
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
            this.firebaseService.crudFirebase({ id: this.ordemId }, 'ordem-remove');
            this.store.dispatch(new REMOVEORDEM({ id: Number(this.ordemId) }));
            this.router.navigate(['/tabs/tab2']);
          }
        }
      ]
    })
    alert.present();
  }


}
