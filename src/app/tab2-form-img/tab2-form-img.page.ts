import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';

import { AppState } from '../store/models/app-state.model';
import { UPDATEIMG, ADDIMG } from '../store/actions/imgs.action';

import { FirebaseService } from '../shared/services/firebase.service';
import { IImg } from '../store/models/img.model';
import { selectAllImgs } from '../store/selectors/imgs.selectors';


@Component({
  selector: 'app-tab2-form-img',
  templateUrl: './tab2-form-img.page.html',
  styleUrls: ['./tab2-form-img.page.scss'],
})
export class Tab2FormImgPage implements OnInit {

  passedId = null;
  imgId = null;
  formulario: FormGroup;


  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private firebaseService: FirebaseService,
 ) { }

  ngOnInit() {
    console.log(this.passedId, this.imgId)
    this.configurarFormulario();
    if (this.imgId !== null) {
      this.store.pipe(select(selectAllImgs)).subscribe(imgs => {
        this.imgId = imgs.filter( imgs => imgs.id === this.imgId);
        this.formulario.patchValue({
         // fk: this.horas[0].fk,

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
      // this.firebaseService.crudFirebase( this.formulario.value, 'tarefa-update');
      // this.store.dispatch(new UPDATETAREFA({ tarefa: hora }));

    } else {
      this.formulario.patchValue({
        id: new Date().getUTCMilliseconds().toString()
      });
      // this.firebaseService.crudFirebase( this.formulario.value, 'tarefa-add');
      // this.store.dispatch(new ADDTAREFA({ tarefa: this.formulario.value }));
    }


    this.dismiss();
  }


  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }


}
