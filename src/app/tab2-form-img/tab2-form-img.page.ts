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

import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import { MessageService } from '../shared/services/message.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/services/api.service';




@Component({
  selector: 'app-tab2-form-img',
  templateUrl: './tab2-form-img.page.html',
  styleUrls: ['./tab2-form-img.page.scss'],
  providers: [
    Camera
  ]
})
export class Tab2FormImgPage implements OnInit {

  passedId = null;
  imgId = null;
  formulario: FormGroup;
  imgs: IImg[];
  bigImg = null;
  smallImg = null;
  public fileName: any;
  downloadURL: Observable<string>

  public title: string = 'Nova Foto';

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private firebaseService: FirebaseService,
    private api: ApiService,
    private camera: Camera,
    private platform: Platform,
    public afstore: AngularFireStorage,
  ) { }

  ngOnInit() {
    console.log(this.passedId, this.imgId)
    this.configurarFormulario();
    if (this.imgId !== null) {
      this.title = 'Editando foto';
      this.store.pipe(select(selectAllImgs)).subscribe(imgs => {
        this.imgId = imgs.filter(imgs => imgs.id === this.imgId);
        this.formulario.patchValue({
          fk: this.imgs[0].fk,
          obs: this.imgs[0].obs,
          url: this.imgs[0].url
        });
      }
      )
    }

  }


  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [null],
      url: [null],
      obs: [null],
    });
  }


  send() {

    this.formulario.patchValue({
      fk: this.passedId
    })

    if (this.imgId !== null) {

      this.formulario.patchValue({
        id: this.imgId
      })


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
      try {
        const CAMERA_OPTIONS: CameraOptions = {
          allowEdit: true,
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          sourceType: this.camera.PictureSourceType.CAMERA,
          encodingType: this.camera.EncodingType.PNG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true,
          targetWidth: 900,
          targetHeight: 900
        };
        this.camera.getPicture(CAMERA_OPTIONS).then(
          imageData => {
            const base64data = 'data:image/jpeg;base64,' + imageData;
            this.bigImg = base64data;
            // Get image size
            this.createThumbnail();

          },
          error => {
            console.log('', error);

          }
        );
      } catch (error) {
      } finally {
      }
    }
  }


  async createThumbnail() {
    this.generateFromImage(this.bigImg, 1000, 1000, 100, data => {
      this.smallImg = data;
      const imgToUp = this.smallImg.split(',')[1];
      this.fileName = Date.now();
      this.upload(imgToUp, this.fileName);
    });

  }
  generateFromImage(img, MAX_WIDTH, MAX_HEIGHT, quality, callback) {
    const canvas: any = document.createElement('canvas');
    const image = new Image();
    image.onload = () => {
      let width = image.width;
      let height = image.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, width, height);
      // IMPORTANT: 'jpeg' NOT 'jpg'
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      callback(dataUrl);
    };
    image.src = img;
  }
  async upload(img, fileName) {
    const storageRef = this.afstore.ref('Ordens_img/');
    const task = storageRef.putString(img + '_' + fileName)

    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = storageRef.getDownloadURL();
      })
    ).subscribe();
  }

}
