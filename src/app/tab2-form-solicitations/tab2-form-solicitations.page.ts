import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';

import { AppState } from '../store/models/app-state.model';
import { UPDATESOLICITATION, ADDSOLICITATION } from '../store/actions/solicitations.action';
import { selectAllSolicitations } from '../store/selectors/solicitations.selectors';

import { ISolicitation } from '../store/models/solicitation.model';
import { FirebaseService } from '../shared/services/firebase.service';

@Component({
  selector: 'app-tab2-form-solicitations',
  templateUrl: './tab2-form-solicitations.page.html',
  styleUrls: ['./tab2-form-solicitations.page.scss']
})
export class Tab2FormSolicitationsPage implements OnInit {
  passedId = null;
  solicitationId = null;
  formulario: FormGroup;
  solicitations: ISolicitation[];
  public title = 'Nova Solicitação';
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    console.log(this.passedId, this.solicitationId);
    this.configurarFormulario();
    if (this.solicitationId !== null) {
      this.title = 'Editando...';
      this.store.pipe(select(selectAllSolicitations)).subscribe(solicitations => {
        this.solicitations = solicitations.filter(
          solicitations => solicitations.id === this.solicitationId
        );
        this.formulario.patchValue({
          fk: this.solicitations[0].fk,
          solicitacao: this.solicitations[0].solicitacao,
          retorno: this.solicitations[0].retorno,
          status: this.solicitations[0].status
        });
      });
    }
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [null],
      fk: [null],
      solicitacao: [null],
      retorno: [null],
      status: [null]
    });
  }

  send() {
    this.formulario.patchValue({
      fk: this.passedId
    });

    if (this.solicitationId !== null) {
      this.formulario.patchValue({
        id: this.solicitationId
      });

      const changes = this.formulario.value;
      const solicitation: Update<ISolicitation> = {
        id: this.solicitationId,
        changes
      };
      this.firebaseService.crudFirebase(this.formulario.value, 'solicitation-update');
      this.store.dispatch(new UPDATESOLICITATION({ solicitation: solicitation }));
    } else {
      this.formulario.patchValue({
        id: new Date().getUTCMilliseconds().toString()
      });
      this.firebaseService.crudFirebase(this.formulario.value, 'solicitation-add');
      this.store.dispatch(new ADDSOLICITATION({ solicitation: this.formulario.value }));
    }

    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
