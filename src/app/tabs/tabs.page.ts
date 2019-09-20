import { Component, OnInit, Sanitizer, ErrorHandler } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/models/app-state.model';

import { ALLORDEMREQUESTED } from '../store/actions/ordem.action';
import { ALLMATREQUESTED } from '../store/actions/apontamento_de_materiais.action';
import { ALLHORAREQUESTED } from '../store/actions/apontamento_de_horas.action';
import { ALLTAREFAREQUESTED } from '../store/actions/tarefas.action';
import { MessageService } from '../shared/services/message.service';
import { NavController, Platform } from '@ionic/angular';
import { FirebaseService } from '../shared/services/firebase.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { firestore } from 'firebase/app';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  public lat: any;
  public long: any;

  constructor(
    private store: Store<AppState>,
    private messageservice: MessageService,
    private navctrl: NavController,
    private platform: Platform,
    public geolocation: Geolocation,
    private firebaseservice: FirebaseService
  ) {
    if (platform.is('cordova')) {
      this.initLocation();
    }
  }


  ngOnInit(): void {
    // carrega dados no store da api mySql
    this.store.dispatch(new ALLORDEMREQUESTED());
    this.store.dispatch(new ALLMATREQUESTED());
    this.store.dispatch(new ALLHORAREQUESTED());
    this.store.dispatch(new ALLTAREFAREQUESTED());
  }

  async logout() {
    await this.messageservice.alerts('Deseja sair?', 'Blza',
      {
        text: 'Ok',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
          localStorage.clear();
          this.navctrl.navigateRoot('login');
        },

      }
    );
  }
  /** Funcao geolocation */
  async initLocation() {
    try {
      await this.geolocation
        .getCurrentPosition()
        .then(resp => {

          this.lat = resp.coords.latitude;
          this.long = resp.coords.longitude;

          const locationData = new firestore.GeoPoint(this.lat, this.long)
          this.firebaseservice.userLocation(locationData).then(res => {
            console.log('Gravando dados firebase' + locationData);
          }).catch(e => alert('Erro ao gravar dados.. Location firebase' + e));

          console.log('Localizacao JSON' + JSON.stringify(locationData));
        })
        .catch(e => console.log('Erro ao pegar localizacao ' + e));
    } catch (error) {
      console.log(error);
    }
  }
}



