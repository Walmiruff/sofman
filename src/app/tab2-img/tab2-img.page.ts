import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { REMOVEIMG } from './../store/actions/imgs.action';
import { Store, select } from '@ngrx/store';

import { AppState } from '../store/models/app-state.model';

import { FirebaseService } from '../shared/services/firebase.service';
import { Tab2FormImgPage } from '../tab2-form-img/tab2-form-img.page';
import { selectAllImgs } from '../store/selectors/imgs.selectors';

@Component({
  selector: 'app-tab2-img',
  templateUrl: './tab2-img.page.html',
  styleUrls: ['./tab2-img.page.scss']
})
export class Tab2ImgPage implements OnInit {
  imgs$: Observable<any>;
  ordemId: number;
  imgId: number;

  constructor(
    private store: Store<AppState>,
    private modalController: ModalController,
    private alertController: AlertController,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ordemId = this.route.snapshot.params['ordemid'];
    this.imgs$ = this.store.pipe(select(selectAllImgs));
    console.log('Id ordem', this.ordemId);
  }

  async openModalUpdate(id: string | number) {
    const modal = await this.modalController.create({
      component: Tab2FormImgPage,
      componentProps: {
        passedId: this.ordemId,
        imgId: id
      }
    });
    return modal.present();
  }

  async openModalCreate() {
    const modal = await this.modalController.create({
      component: Tab2FormImgPage,
      componentProps: {
        passedId: this.ordemId
      }
    });
    return modal.present();
  }

  async openConfirmRemove(id: string | number) {
    const alert = await this.alertController.create({
      header: 'Sofman',
      message: '<strong>Deseja remover a Imagem?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Remover',
          handler: () => {
            this.firebaseService.crudFirebase({ id: id }, 'img-remove');
            this.store.dispatch(new REMOVEIMG({ id: Number(id) }));
          }
        }
      ]
    });
    alert.present();
  }
}
