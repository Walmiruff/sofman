import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/models/app-state.model';

import { ALLORDEMREQUESTED } from '../store/actions/ordem.action';




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
    this.store.dispatch(new ALLORDEMREQUESTED());
  }



}



