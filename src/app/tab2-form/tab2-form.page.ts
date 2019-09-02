import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';

import { IOrdem } from '../store/models/ordem.model';
import { AppState } from '../store/models/app-state.model';
import { UPDATEORDEM } from '../store/actions/ordem.action';


@Component({
  selector: 'app-tab2-form',
  templateUrl: './tab2-form.page.html',
  styleUrls: ['./tab2-form.page.scss'],
})
export class Tab2FormPage implements OnInit {

  passedId = null ;
  formulario: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    ) { }

  ngOnInit() {
   this.configurarFormulario();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      observacao: [null]
    });
  }

  sendOrdem(){
 // serviço do firestore com acão de atualização no banco de dados
    const changes = this.formulario.value;

    const ordem: Update<IOrdem> = {
      id: this.passedId,
      changes
    }

    this.store.dispatch( new UPDATEORDEM({ ordem: ordem}))

    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
