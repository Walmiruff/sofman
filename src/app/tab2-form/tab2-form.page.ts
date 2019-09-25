import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';

import { IOrdem } from '../store/models/ordem.model';
import { AppState } from '../store/models/app-state.model';
import { UPDATEORDEM, ADDORDEM } from '../store/actions/ordem.action';
import { selectAllOrdens } from '../store/selectors/ordem.selectors';

import { FirebaseService } from '../shared/services/firebase.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-tab2-form',
  templateUrl: './tab2-form.page.html',
  styleUrls: ['./tab2-form.page.scss']
})
export class Tab2FormPage implements OnInit {
  @ViewChild('Assfuncionario', { static: true }) public assfunc: SignaturePad;
  @ViewChild('Assinaturacliente', { static: true }) public assclient: SignaturePad;
  public assinaturafuncbase64: string;
  public assinaturaclientebase64: string;
  public showAssinatura = true;

  public signaturefuncionario = '';
  public signaturecliente = '';

  public isDrawing = false;
  public title = 'Adicionar nova Ordem';



  public signaturePadOptions: Object = {

    minWidth: 2,
    canvasWidth: 400,
    canvasHeight: 100,
    backgroundColor: '#f6fbff',
    penColor: '#000000'
  };

  passedId = null;
  formulario: FormGroup;
  ordens: IOrdem[];

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.configurarFormulario();
    if (this.passedId !== null) {
      this.title = 'Editando...';
      this.store.pipe(select(selectAllOrdens)).subscribe(ordens => {
        console.log('Rernono tab2 f' + JSON.stringify(ordens));
        this.assinaturafuncbase64 = ordens[0].signaturefuncionario;
        this.assinaturaclientebase64 = ordens[0].signaturecliente;
        // tslint:disable-next-line: no-shadowed-variable
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
          message: this.ordens[0].message,
          signaturefuncionario: this.ordens[0].signaturefuncionario,
          signaturecliente: this.ordens[0].signaturecliente
        });
      });
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
      message: [null],
      signaturefuncionario: [null],
      signaturecliente: [null]
    });
  }

  sendOrdem() {
    if (this.passedId !== null) {
      this.formulario.patchValue({
        id: this.passedId
      });

      const changes = this.formulario.value;
      const ordem: Update<IOrdem> = {
        id: this.passedId,
        changes
      };
      this.firebaseService.crudFirebase(this.formulario.value, 'ordem-update');
      this.store.dispatch(new UPDATEORDEM({ ordem: ordem }));
    } else {
      this.formulario.patchValue({
        id: new Date().getUTCMilliseconds().toString()
      });
      this.firebaseService.crudFirebase(this.formulario.value, 'ordem-add');
      this.store.dispatch(new ADDORDEM({ ordem: this.formulario.value }));
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

  drawCompleteFunc() {
    this.isDrawing = false;
  }

  drawStartFunc() {
    this.isDrawing = true;
  }
  async savePadFunc() {
    this.signaturefuncionario = await this.assfunc.toDataURL();
    localStorage.setItem('savedSignaturefunc', this.signaturefuncionario);
    this.assinaturafuncbase64 = this.signaturefuncionario;
    this.assfunc.clear();
    // let toast = this.toastCtrl.create({
    //   message: 'New Signature saved.',
    //   duration: 3000
    // });
    // toast.present();
  }
  clearPadFunc() {
    this.assfunc.clear();
  }

  drawCompleteClient() {
    this.isDrawing = false;
  }

  drawStartClient() {
    this.isDrawing = true;
  }
  async savePadClient() {
    this.signaturecliente = await this.assclient.toDataURL();
    localStorage.setItem('savedSignaturecliente', this.signaturecliente);
    this.assclient.clear();
    // let toast = this.toastCtrl.create({
    //   message: 'New Signature saved.',
    //   duration: 3000
    // });
    // toast.present();
  }
  async clearPadClient() {
    this.assclient.clear();
  }
  checkValue(e) {
    if (e.detail.checked) {
      this.showAssinatura = false;
    } else {
      this.showAssinatura = true;
    }
  }
}
