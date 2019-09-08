import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';


import { IOrdem } from '../store/models/ordem.model';
import { AppState } from '../store/models/app-state.model';
import { UPDATEORDEM, ADDORDEM } from '../store/actions/ordem.action';
import { selectAllOrdens } from '../store/selectors/ordem.selectors';

import { FirebaseService } from '../shared/services/firebase.service';


@Component({
  selector: 'app-tab2-form',
  templateUrl: './tab2-form.page.html',
  styleUrls: ['./tab2-form.page.scss'],
})
export class Tab2FormPage implements OnInit {

  passedId = null;
  formulario: FormGroup;
  ordens: IOrdem[];

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    if (this.passedId !== null) {
      this.store.pipe(select(selectAllOrdens)).subscribe(ordens => {
        this.ordens = ordens.filter(ordens => ordens.id == this.passedId);
        this.formulario.patchValue({
          filial: this.ordens[0].filial,
          ordem: this.ordens[0].ordem,
          data: this.ordens[0].data,
          equipamento: this.ordens[0].equipamento,
          tipo_de_mnt: this.ordens[0].tipo_de_mnt,
          descricao: this.ordens[0].descricao,
          solicitante: this.ordens[0].solicitante,
          data_prog: this.ordens[0].data_prog,
          data_solic: this.ordens[0].data_solic,
          setor_solic: this.ordens[0].setor_solic,
          observacao: this.ordens[0].observacao,
          status_da_os: this.ordens[0].status_da_os,
        });
      }
      )
    }

  }


  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [null],
      filial: [null],
      ordem: [null],
      data: [null],
      equipamento: [null],
      tipo_de_mnt: [null],
      descricao: [null],
      solicitante: [null],
      data_prog: [null],
      data_solic: [null],
      setor_solic: [null],
      observacao: [null],
      status_da_os: [null],
    });
  }


  sendOrdem() {

    if (this.passedId !== null) {
    
      this.formulario.patchValue({
        id: this.passedId
      })

      const changes = this.formulario.value;
      const ordem: Update<IOrdem> = {
        id: this.passedId,
        changes
      };
      this.firebaseService.crudFirebase( this.formulario.value, 'ordem-update');
      this.store.dispatch(new UPDATEORDEM({ ordem: ordem }));

    } else {
      this.formulario.patchValue({
        id: new Date().getUTCMilliseconds().toString()
      });
      this.firebaseService.crudFirebase( this.formulario.value, 'ordem-add');
      this.store.dispatch(new ADDORDEM({ ordem: this.formulario.value }));
    }


    this.dismiss();
  }


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


}
