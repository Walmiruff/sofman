import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { FilterPipe } from 'ngx-filter-pipe';

import { AppState } from '../store/models/app-state.model';
import { selectAllOrdens } from '../store/selectors/ordem.selectors';
import { Tab2FormPage } from '../tab2-form/tab2-form.page';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  ordens$: Observable<any>;

  userFilter: any = { ordem: '' };

  constructor(
    private store: Store<AppState>,
    private modalController: ModalController
  ) { }


  ngOnInit() {
    this.ordens$ = this.store
    .pipe(
      select(selectAllOrdens)
    );

  }

  async openModalCreate() {
    const modal = await this.modalController.create({
      component: Tab2FormPage,
    });
    return modal.present()
  }

}
