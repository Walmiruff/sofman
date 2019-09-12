import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AppState } from '../store/models/app-state.model';
import { selectAllTarefas } from '../store/selectors/tarefas.selectors';
import { REMOVETAREFA } from '../store/actions/tarefas.action';

import { FirebaseService } from '../shared/services/firebase.service';
import { Tab2FormTarefaPage } from '../tab2-form-tarefa/tab2-form-tarefa.page';

@Component({
  selector: 'app-tab2-tarefa',
  templateUrl: './tab2-tarefa.page.html',
  styleUrls: ['./tab2-tarefa.page.scss'],
})
export class Tab2TarefaPage implements OnInit {

  tarefas$: Observable<any>;
  ordemId: number;
  tarefaId: number;

  constructor(
    private store: Store<AppState>,
    private modalController: ModalController,
    private alertController: AlertController,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ordemId = this.route.snapshot.params['ordemid'];

    this.tarefas$ = this.store
      .pipe(
        select(selectAllTarefas)
      );
  }



  async openModalUpdate(id: string | number) {
    const modal = await this.modalController.create({
      component: Tab2FormTarefaPage,
      componentProps: {
        passedId: this.ordemId,
        tarefaId: id
      }
    });
    return modal.present()
  }

  async openModalCreate() {
    const modal = await this.modalController.create({
      component: Tab2FormTarefaPage,
      componentProps: {
        passedId: this.ordemId,
      }
    });
    return modal.present()
  }




  async  openConfirmRemove(id: string | number) {
    const alert = await this.alertController.create({
      header: 'Sofman',
      message: '<strong>Deseja remover a Tarefa?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Remover',
          handler: () => {
            this.firebaseService.crudFirebase({ id: id }, 'tarefa-remove');
            this.store.dispatch(new REMOVETAREFA({ id: Number(id) }));
          }
        }
      ]
    })
    alert.present();
  }



}
