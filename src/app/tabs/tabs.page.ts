import { Component, OnInit, Sanitizer, ErrorHandler } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/models/app-state.model';

import { ALLORDEMREQUESTED } from '../store/actions/ordem.action';
import { ALLMATREQUESTED } from '../store/actions/apontamento_de_materiais.action';
import { ALLHORAREQUESTED } from '../store/actions/apontamento_de_horas.action';
import { ALLTAREFAREQUESTED } from '../store/actions/tarefas.action';
import { MessageService } from '../shared/services/message.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(
    private store: Store<AppState>,
    private messageservice: MessageService,
    private navctrl: NavController
  ) { }


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

}



