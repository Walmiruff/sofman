import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { UPDATESOLICITATION, ADDSOLICITATION } from '../store/actions/solicitations.action';
import { selectAllSolicitations } from '../store/selectors/solicitations.selectors';

import { ISolicitation } from '../store/models/solicitation.model';
import { MessageService } from './../shared/services/message.service';
import { FirebaseService } from '../shared/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tab2-form-solicitations',
  templateUrl: './tab2-form-solicitations.page.html',
  styleUrls: ['./tab2-form-solicitations.page.scss'],
  providers: [Camera]
})
export class Tab2FormSolicitationsPage implements OnInit {
  passedId = null;
  solicitationId = null;
  formulario: FormGroup;
  solicitations: ISolicitation[];
  public title = 'Nova Solicitação';
  /** Imagem */

  public myPhoto: any;
  public myPhotoURL: any;
  public foto: any;
  public myPorcents: Observable<number>;
  public imagem: any;
  /** Fim imagem */

  public prioridadearray = ['Alta', 'Media', 'Baixa'];
  public statusarray = ['ABERTO', 'EM EXECUÇÃO', 'FINALIZADO', 'RECUSADO'];
  public clientes = ['Andre', 'Jão', 'Ingrd', 'Matheus'];
  public tipomanutencaoarray = [
    'DEMANDA',
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
    'PLANEJADA'
  ];

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private firebaseService: FirebaseService,
    private messageservice: MessageService,
    private afstore: AngularFireStorage,
    private platform: Platform,
    private camera: Camera
  ) { }

  ngOnInit() {
    console.log('PassID' + this.passedId);
    console.log('Solcit' + this.solicitationId);

    this.configurarFormulario();
    if (this.solicitationId !== null) {
      this.title = 'Editando...';
      console.log('ID Solicitacao...' + this.solicitationId);
      this.store.pipe(select(selectAllSolicitations)).subscribe(solicitations => {
        console.log('Rernono solicitations' + JSON.stringify(solicitations));

        this.solicitations = solicitations.filter(
          solicitations => solicitations.id == this.solicitationId
        );
        this.formulario.patchValue({
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
          prioridade: this.solicitations[0].prioridade,
          status: this.solicitations[0].status,
          imagem: this.solicitations[0].imagem,

          data_inicio: this.solicitations[0].data_inicio,
          data_termino: this.solicitations[0].data_termino,
          id_problema: this.solicitations[0].id_problema, // lista suspensa
          maquina_parada: this.solicitations[0].maquina_parada
        });
      });
    }
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [null],

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
      data_inicio: [null],
      data_termino: [null],
      id_problema: [null], // lista suspensa
      maquina_parada: [null]
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
      .pipe(finalize(() => (this.imagem = ref.getDownloadURL())))
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
