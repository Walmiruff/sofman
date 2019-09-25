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

  public prioridadearray = ['Alta', 'Media', 'Baixa']
  public statusarray = ['ABERTO', 'EM EXECUÇÃO', 'FINALIZADO', 'RECUSADO' ]
  public clientes = ['Andre', 'Jão', 'Ingrd', 'Matheus' ]
  public tipomanutencaoarray = [ 'DEMANDA',
  'DOCUMENTAÇÃO LEGAL',
 'EMERGENCIAL',
  'INSPEÇÃO',
 'INSTALAÇÃO',
  'JARDINAGEM',
  'LUBRIFICAÇÃO',
 'MANUTENÇÃO CORRETIVA',
 'MANUTENÇÃO PREDITIVA',
 'MANUTENÇÃO PREVENTIVA',
  'MEDIÇÃO',
  'MEMORANDO',
  'MEMORANDO (MKT)',
  'PLANEJADA']

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    console.log(this.passedId, this.solicitationId);
    console.log(this.clientes.values)
    this.configurarFormulario();
    if (this.solicitationId !== null) {

      this.title = 'Editando...';
      this.store.pipe(select(selectAllSolicitations)).subscribe(solicitations => {
        this.solicitations = solicitations.filter(
          solicitations => solicitations.id === this.solicitationId
        );
        this.formulario.patchValue({

          tag_id: this.solicitations[0].tag_id,
          id_cliente: this.solicitations[0].id_cliente, //
          id_filial: this.solicitations[0].id_filial,
          id_subgrupo: this.solicitations[0].id_subgrupo, // Lista suspensa
          id_equipamento: this.solicitations[0].id_equipamento, // lista suspensa
          localizacao: this.solicitations[0].localizacao,
          ordem_servico: this.solicitations[0].ordem_servico,
          id_setor_executante: this.solicitations[0].id_setor_executante, // lista suspensa
          id_contato_filial: this.solicitations[0].id_contato_filial,
          codigo_solicitacao: this.solicitations[0].codigo_solicitacao,
          categoria: this.solicitations[0].categoria,
          assunto: this.solicitations[0].assunto,
          mensagem: this.solicitations[0].mensagem,
          prioridade: this.prioridadearray,
          status: this.statusarray,
          imagem: this.solicitations[0].imagem,
          imagem_nome: this.solicitations[0],
          imagem_tamanho: this.solicitations[0],
          data_inicio: this.solicitations[0].data_inicio,
          data_termino: this.solicitations[0].data_termino,
          id_problema: this.solicitations[0].id_problema, // lista suspensa
          maquina_parada: this.solicitations[0].maquina_parada,
          notificar: this.solicitations[0].notificar,

        });
      });
    }
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [null],
      tag_id: [null],
      id_cliente: [null], //
      id_filial: [null],
      id_subgrupo: [null], // Lista suspensa
      id_equipamento: [null], // lista suspensa
      localizacao: [null],
      ordem_servico: [null],
      id_setor_executante: [null], // lista suspensa
      id_contato_filial: [null],
      codigo_solicitacao: [null],
      categoria: [null],
      assunto: [null],
      mensagem: [null],
      prioridade: [null],
      status: [null],
      imagem: [null],
      imagem_nome: [null],
      imagem_tamanho: [null],
      data_inicio: [null],
      data_termino: [null],

      id_problema: [null], // lista suspensa
      maquina_parada: [null],
      notificar: [null],
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
  async closeModal() {
    const modalclose = await this.modalController.dismiss();
    return modalclose;
  }
}
