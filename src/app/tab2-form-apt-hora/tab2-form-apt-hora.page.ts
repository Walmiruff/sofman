import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';


import { IAptHora } from '../store/models/apt_hora.model';
import { AppState } from '../store/models/app-state.model';
import { UPDATEHORA, ADDHORA } from '../store/actions/apontamento_de_horas.action';
import { selectAllHoras } from '../store/selectors/apontamento_de_horas.selectors';

import { FirebaseService } from '../shared/services/firebase.service';


@Component({
  selector: 'app-tab2-form-apt-hora',
  templateUrl: './tab2-form-apt-hora.page.html',
  styleUrls: ['./tab2-form-apt-hora.page.scss'],
})
export class Tab2FormAptHoraPage implements OnInit {
  
  passedId = null;
  passedIdAptHora = null;
  formulario: FormGroup;
  horas: IAptHora[];

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private firebaseService: FirebaseService,
 ) { }

  ngOnInit() {
    this.configurarFormulario();
    if (this.passedIdAptHora !== null) {
      this.store.pipe(select(selectAllHoras)).subscribe(horas => {
        this.horas = horas.filter(horas => horas.id == this.passedIdAptHora);
        this.formulario.patchValue({
          fk: this.horas[0].fk,
          colaborador: this.horas[0].colaborador,
          descricao: this.horas[0].descricao,
          data_inicial: this.horas[0].data_inicial,
          data_final: this.horas[0].data_final,
          status: this.horas[0].status
        });
      }
      )
    }

  }


  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id:[null],
      fk: [null],
      colaborador: [null],
      descricao: [null],
      data_inicial: [null],
      data_final: [null],
      status: [null]
    });
  }


  send() {

    this.formulario.patchValue({
      fk: this.passedId
   })

    if (this.passedIdAptHora !== null) {

      this.formulario.patchValue({
        id: this.passedIdAptHora
      })
    

      const changes = this.formulario.value;
      const hora: Update<IAptHora> = {
        id: this.passedIdAptHora,
        changes
      };
      this.firebaseService.crudFirebase( this.formulario.value, 'apt-hora-update');
      this.store.dispatch(new UPDATEHORA({ hora: hora }));

    } else {
      this.formulario.patchValue({
        id: new Date().getUTCMilliseconds().toString()
      });
      this.firebaseService.crudFirebase( this.formulario.value, 'apt-hora-add');
      this.store.dispatch(new ADDHORA({ hora: this.formulario.value }));
    }


    this.dismiss();
  }


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


}
