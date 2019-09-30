import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { ISolicitation } from '../store/models/solicitation.model';
import { AppState } from '../store/models/app-state.model';
import { UPDATESOLICITATION, ADDSOLICITATION } from '../store/actions/solicitations.action';
import { selectAllSolicitations } from '../store/selectors/solicitations.selectors';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirebaseService } from '../shared/services/firebase.service';
import { MessageService } from '../shared/services/message.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-tab-form-solicitacao',
  templateUrl: './tab-form-solicitacao.page.html',
  styleUrls: ['./tab-form-solicitacao.page.scss'],
  providers: [Camera]
})
export class TabFormSolicitacaoPage implements OnInit {

  passedId = null;
  formulario: FormGroup;
  solicitacoes: ISolicitation[];
  public result: any = {};
  /** Imagem */

  public myPhoto: any;
  public myPhotoURL: any;
  public foto: any;
  public myPorcents: Observable<number>;
  public imagem: any;
  /** Fim imagem */

  public title = 'Adicionar nova Solicitação';
  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private firebaseService: FirebaseService,
    private messageservice: MessageService,
    private afstore: AngularFireStorage,
    private platform: Platform,
    private camera: Camera
  ) { }

  ngOnInit() {

    this.store.pipe(
      select(selectAllSolicitations)
    ).subscribe(resSolicitacoes => {
      this.result = resSolicitacoes;
      console.log('Resultodao' + this.result)
    });

    this.configurarFormulario();
    if (this.passedId !== null) {
      this.title = `Editando Solicitação Id - ${this.passedId}`;
      this.store.pipe(
        select(selectAllSolicitations)
      ).subscribe(resSolicitacoes => {
        console.log('Solicitacoes retorno id', JSON.stringify(resSolicitacoes))
        this.solicitacoes = resSolicitacoes.filter(solicitacoes => solicitacoes.id == this.passedId);

        this.formulario.patchValue({
          id_cliente: this.solicitacoes[0].id_cliente,
          // tag_id?: string | number;
          id_filial: this.solicitacoes[0].id_filial,
          id_subgrupo: this.solicitacoes[0].id_subgrupo, // Lista suspensa
          id_equipamento: this.solicitacoes[0].id_equipamento, // lista suspensa
          localizacao: this.solicitacoes[0].localizacao,// localizacao?: string;
          ordem_servico: this.solicitacoes[0].ordem_servico, // lista supensa
          id_setor_executante: this.solicitacoes[0].id_cliente,// lista suspensa
          id_contato_filial: this.solicitacoes[0].id_contato_filial,
          codigo_solicitacao: this.solicitacoes[0].codigo_solicitacao,
          categoria: this.solicitacoes[0].categoria,
          assunto: this.solicitacoes[0].assunto,
          mensagem: this.solicitacoes[0].mensagem,
          prioridade: this.solicitacoes[0].prioridade, // Lista suspensa
          status: this.solicitacoes[0].status, // lista suspensa
          imagem: this.solicitacoes[0].imagem,
          data_inicio: this.solicitacoes[0].data_inicio,
          data_termino: this.solicitacoes[0].data_termino,
          // log_date?: Date | number;
          id_problema: this.solicitacoes[0].id_problema, // lista suspensa
          maquina_parada: this.solicitacoes[0].maquina_parada,
          //  notificar?: string;
        });
      });
    }
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [null],
      //tag_id: [null], // Lista suspensa
      id_cliente: [null], // Lista suspensa
      id_filial: [null],
      id_subgrupo: [null], // Lista suspensa
      id_equipamento: [null], // lista suspensa
      localizacao: [null],
      ordem_servico: [null], // Lista suspensa
      id_setor_executante: [null], // lista suspensa
      id_contato_filial: [null],
      codigo_solicitacao: [null],
      categoria: [null],
      assunto: [null],
      mensagem: [null],
      prioridade: [null],
      status: [null], // Lista suspensa
      imagem: [null],
      data_inicio: [null],
      data_termino: [null],
     // log_date: [null],
      id_problema: [null], // lista suspensa
      maquina_parada: [null],
    //  notificar: [null],
    });
  }

  async sendSolicitacao() {
    const loading = await this.messageservice.loading({ message: 'Aguarde...' });
    if (this.passedId !== null) {

      this.formulario.patchValue({
        id: this.passedId
      });
      loading.dismiss();

      const changes = this.formulario.value;

      const solicitacao: Update<ISolicitation> = {
        id: this.passedId,
        changes
      };

      this.firebaseService.crudFirebase(this.formulario.value, 'solicitacao-update');
      this.store.dispatch(new UPDATESOLICITATION({ solicitation: solicitacao }));
    } else {
      this.formulario.patchValue({
        id: new Date().getUTCMilliseconds().toString()
      });
      this.firebaseService.crudFirebase(this.formulario.value, 'solicitacao-add');
      this.store.dispatch(new ADDSOLICITATION({ solicitation: this.formulario.value }));
    }
    this.dismiss();
    loading.dismiss();
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
  /** Imagem Manipulacao */
  async selectImageInCamera() {
    if (this.platform.is('cordova')) {

      const aler = await this.messageservice.loading();

      this.camera
        .getPicture({
          quality: 40,
          allowEdit: true,

          destinationType: this.camera.DestinationType.DATA_URL,
          sourceType: this.camera.PictureSourceType.CAMERA,
          encodingType: this.camera.EncodingType.PNG,
          saveToPhotoAlbum: true,

          // destinationType: this.camera.DestinationType.DATA_URL,
          // sourceType: this.camera.PictureSourceType.CAMERA,
          // encodingType: this.camera.EncodingType.PNG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true,
          targetWidth: 600,
          targetHeight: 600

        })
        .then(
          imageData => {
            const base64data = 'data:image/jpeg;base64,' + imageData;
            this.foto = base64data;

            this.myPhoto = imageData;

            aler.dismiss();

            this.uploadPhoto();
          },
          error => {
            alert('ERROR -> ' + JSON.stringify(error));
          }
        );

    }
  }

  private uploadPhoto(): void {
    const ref = this.afstore
      .ref('/SofmanSolicitacoes/')
      .child(this.generateUUID())
      .child('Sofman.png');

    const task = ref.putString(this.myPhoto, 'base64', { contentType: 'image/png' });
    this.myPorcents = task.percentageChanges();

    task
      .snapshotChanges()
      .pipe(finalize(() => (this.myPhotoURL = ref.getDownloadURL())))
      .subscribe();
  }


  private generateUUID(): any {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
}