import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController, ActionSheetController, Platform } from '@ionic/angular';
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { selectAllImgs } from '../store/selectors/imgs.selectors';
import { UPDATEIMG, ADDIMG } from '../store/actions/imgs.action';
import { IImg } from '../store/models/img.model';
import { FirebaseService } from '../shared/services/firebase.service';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { MessageService } from '../shared/services/message.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2-form-img',
  templateUrl: './tab2-form-img.page.html',
  styleUrls: ['./tab2-form-img.page.scss'],
  providers: [Camera]
})
export class Tab2FormImgPage implements OnInit {
  public myPhoto: any;
  public myPhotoURL: any;
  public myPorcents: Observable<number>;

  passedId = null;
  imgId = null;
  public foto = '';
  formulario: FormGroup;
  imgs: IImg[];

  public title: string = 'Nova Foto';

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private firebaseService: FirebaseService,
    private camera: Camera,
    private platform: Platform,
    public afstore: AngularFireStorage
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    if (this.imgId !== null) {
      console.log(this.imgId);
      this.title = 'Editando foto';

      this.store.pipe(select(selectAllImgs)).subscribe(imgs => {
        this.imgs = imgs.filter(imgs => imgs.id == this.imgId);

        this.formulario.patchValue({
          fk: this.imgs[0].fk,
          obs: this.imgs[0].obs,
          url: this.imgs[0].url
        });
      });
    }
  }
  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [null],
      fk: [null],
      url: [null],
      obs: [null]
    });
  }

  send() {
    this.formulario.patchValue({
      fk: this.passedId
    });

    if (this.imgId !== null) {
      this.formulario.patchValue({
        id: this.imgId
      });

      const changes = this.formulario.value;
      const img: Update<IImg> = {
        id: this.imgId,
        changes
      };
      this.firebaseService.crudFirebase(this.formulario.value, 'img-update');
      this.store.dispatch(new UPDATEIMG({ img: img }));
    } else {
      this.formulario.patchValue({
        id: new Date().getUTCMilliseconds().toString()
      });
      this.firebaseService.crudFirebase(this.formulario.value, 'img-add');
      this.store.dispatch(new ADDIMG({ img: this.formulario.value }));
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
            this.myPhoto = imageData;
            const base64data = 'data:image/jpeg;base64,' + imageData;
            this.foto = base64data;
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
      .ref('/SofmanOrdensImg/')
      .child(this.generateUUID())
      .child('Sofman.png');

    const task = ref.putString(this.myPhoto, 'base64', { contentType: 'image/png' });
    this.myPorcents = task.percentageChanges();

    task
      .snapshotChanges()
      .pipe(finalize(() => (this.myPhotoURL = ref.getDownloadURL())))
      .subscribe();
    // alert(JSON.stringify(this.myPhotoURL));
  }
  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
}
