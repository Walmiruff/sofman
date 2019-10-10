import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { ITarefa } from '../store/models/tarefa.model';
import { AppState } from '../store/models/app-state.model';
import { UPDATETAREFA, ADDTAREFA } from '../store/actions/tarefas.action';
import { selectAllTarefas } from '../store/selectors/tarefas.selectors';

import { FirebaseService } from '../shared/services/firebase.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tab2-form-tarefa',
  templateUrl: './tab2-form-tarefa.page.html',
  styleUrls: ['./tab2-form-tarefa.page.scss'],
  providers: [Camera]
})
export class Tab2FormTarefaPage implements OnInit {
  passedId = null;
  tarefaId = null;

  formulario: FormGroup;
  tarefas: ITarefa[];
  public imagembase64: string;
  public imagem: any;
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private firebaseService: FirebaseService,
    private platform: Platform,
    private camera: Camera,
    private dms: DomSanitizer
  ) {}

  ngOnInit() {
    console.log(this.passedId, this.tarefaId);
    this.configurarFormulario();
    if (this.tarefaId !== null) {
      this.store.pipe(select(selectAllTarefas)).subscribe(tarefas => {
        this.tarefas = tarefas.filter(tarefas => tarefas.id == this.tarefaId);

        this.imagem = this.tarefas[0].imagem;

        this.formulario.patchValue({
          fk: this.tarefas[0].fk,
          tarefa: this.tarefas[0].tarefa,
          retorno: this.tarefas[0].retorno,
          status: this.tarefas[0].status,
          imagem: this.tarefas[0].imagem
        });
      });
    }
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [null],
      fk: [null],
      tarefa: [null],
      retorno: [null],
      status: [null],
      imagem: [null]
    });
  }

  send() {
    this.formulario.patchValue({
      fk: this.passedId
    });

    if (this.tarefaId !== null) {
      this.formulario.patchValue({
        id: this.tarefaId
      });

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
  async selectImageInCamera() {
    if (this.platform.is('cordova')) {
      
      const options: CameraOptions = {
        quality: 70,
        //allowEdit: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        encodingType: this.camera.EncodingType.JPEG,
        saveToPhotoAlbum: true,

        // destinationType: this.camera.DestinationType.DATA_URL,
        // sourceType: this.camera.PictureSourceType.CAMERA,
        // encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        targetWidth: 600,
        targetHeight: 600
      };
      this.camera
        .getPicture(options)
        .then(imageData => {
          // this.imagem = imageData;
          const base64data = 'data:image/jpeg;base64,' + imageData;
          this.imagem = base64data;
        })
        .catch(err => console.log(err));
    }
  }
  display(b64: string) {
    return this.dms.bypassSecurityTrustUrl('data:image/jpeg;base64,' + b64);
  }
  // dataURItoBlob(dataURI) {
  //   const byteString = window.atob(dataURI);
  //   const arrayBuffer = new ArrayBuffer(byteString.length);
  //   const int8Array = new Uint8Array(arrayBuffer);
  //   for (let i = 0; i < byteString.length; i++) {
  //     int8Array[i] = byteString.charCodeAt(i);
  //   }
  //   const blob = new Blob([int8Array], { type: 'image/jpeg' });
  //   return blob;
  // }
}
/*
// Base64 url of image trimmed one without data:image/png;base64
string base64="/9j/4AAQSkZJRgABAQE...";
// Naming the image
const date = new Date().valueOf();
let text = '';
const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
for (let i = 0; i < 5; i++) {
   text += possibleText.charAt(Math.floor(Math.random() *    possibleText.length));
}
// Replace extension according to your media type
const imageName = date + '.' + text + '.jpeg';
// call method that creates a blob from dataUri
const imageBlob = this.dataURItoBlob(base64);
const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
*/
