import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';


import { IAptMaterial } from '../store/models/apt_material.model';
import { AppState } from '../store/models/app-state.model';
import { UPDATEMAT, ADDMAT } from '../store/actions/apontamento_de_materiais.action';
import { selectAllMateriais } from '../store/selectors/apontamento_de_materiais.selectors';

import { FirebaseService } from '../shared/services/firebase.service';


@Component({
  selector: 'app-tab2-form-apt-mat',
  templateUrl: './tab2-form-apt-mat.page.html',
  styleUrls: ['./tab2-form-apt-mat.page.scss'],
})
export class Tab2FormAptMatPage implements OnInit {
  
  passedId = null;
  passedIdAptMat = null;
  formulario: FormGroup;
  materiais: IAptMaterial[];

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private firebaseService: FirebaseService,
 ) { }

  ngOnInit() {
    this.configurarFormulario();
    if (this.passedIdAptMat !== null) {
      this.store.pipe(select(selectAllMateriais)).subscribe(materiais => {
        this.materiais = materiais.filter(materiais => materiais.id == this.passedIdAptMat);
        this.formulario.patchValue({
          codigo: this.materiais[0].codigo,
          data: this.materiais[0].data,
          fk: this.materiais[0].fk,
          descricao: this.materiais[0].descricao,
          quantidade: this.materiais[0].quantidade,
          valor: this.materiais[0].valor,
          n_serie_antiga: this.materiais[0].n_serie_antiga,
          n_serie_novo: this.materiais[0].n_serie_novo
        });
      }
      )
    }

  }


  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [null],
      codigo: [null],
      data: [null],
      fk: [null],
      descricao: [null],
      quantidade: [null],
      valor: [null],
      n_serie_antiga: [null],
      n_serie_novo: [null]
    });
  }


  send() {

    this.formulario.patchValue({
      fk: this.passedId
   })

    if (this.passedIdAptMat !== null) {

      this.formulario.patchValue({
        id: this.passedIdAptMat
      })
    

      const changes = this.formulario.value;
      const material: Update<IAptMaterial> = {
        id: this.passedIdAptMat,
        changes
      };
      this.firebaseService.crudFirebase( this.formulario.value, 'apt-mat-update');
      this.store.dispatch(new UPDATEMAT({ material: material }));

    } else {
      this.formulario.patchValue({
        id: new Date().getUTCMilliseconds().toString()
      });
      this.firebaseService.crudFirebase( this.formulario.value, 'apt-mat-add');
      this.store.dispatch(new ADDMAT({ material: this.formulario.value }));
    }


    this.dismiss();
  }


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


}
