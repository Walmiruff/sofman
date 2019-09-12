import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/models/app-state.model';

import { ALLORDEMREQUESTED } from '../store/actions/ordem.action';
import { ALLMATREQUESTED } from '../store/actions/apontamento_de_materiais.action';
import { ALLHORAREQUESTED } from '../store/actions/apontamento_de_horas.action';
import { ALLTAREFAREQUESTED } from '../store/actions/tarefas.action';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(
     private store: Store<AppState>,
  ) { }


  ngOnInit(): void {
    // carrega dados no store da api mySql
    this.store.dispatch(new ALLORDEMREQUESTED());
    this.store.dispatch(new ALLMATREQUESTED());
    this.store.dispatch(new ALLHORAREQUESTED());
    this.store.dispatch(new ALLTAREFAREQUESTED());
  }



}



