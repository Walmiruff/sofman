import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';


import { ITarefa } from '../store/models/tarefa.model';
import { AppState } from '../store/models/app-state.model';
import { UPDATETAREFA, ADDTAREFA } from '../store/actions/tarefas.action';
import { selectAllTarefas } from '../store/selectors/tarefas.selectors';

import { FirebaseService } from '../shared/services/firebase.service';


@Component({
  selector: 'app-tab2-form-tarefa',
  templateUrl: './tab2-form-tarefa.page.html',
  styleUrls: ['./tab2-form-tarefa.page.scss'],
})
export class Tab2FormTarefaPage implements OnInit {

  passedId = null;
  tarefaId = null;
  formulario: FormGroup;
  tarefas: ITarefa[];

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
    console.log(this.passedId, this.tarefaId)
    this.configurarFormulario();
    if (this.tarefaId !== null) {
      this.store.pipe(select(selectAllTarefas)).subscribe(tarefas => {
        this.tarefas = tarefas.filter(tarefas => tarefas.id == this.tarefaId);
        this.formulario.patchValue({
          fk: this.tarefas[0].fk,
          tarefa: this.tarefas[0].tarefa,
          retorno: this.tarefas[0].retorno,
          status: this.tarefas[0].status
        });
      }
      )
    }

  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [null],
      fk: [null],
      tarefa: [null],
      retorno: [null],
      status: [null]
    });
  }


  send() {

    this.formulario.patchValue({
      fk: this.passedId
    })

    if (this.tarefaId !== null) {

      this.formulario.patchValue({
        id: this.tarefaId
      })


      const changes = this.formulario.value;
      const tarefa: Update<ITarefa> = {
        id: this.tarefaId,
        changes
      };
      this.firebaseService.crudFirebase(this.formulario.value, 'tarefa-update');
      this.store.dispatch(new UPDATETAREFA({ tarefa: tarefa }));

    } else {
      this.formulario.patchValue({
        id: new Date().getUTCMilliseconds().toString()
      });
      this.firebaseService.crudFirebase(this.formulario.value, 'tarefa-add');
      this.store.dispatch(new ADDTAREFA({ tarefa: this.formulario.value }));
    }
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }


}
