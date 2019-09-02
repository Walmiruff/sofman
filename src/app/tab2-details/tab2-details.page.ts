import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../store/models/app-state.model';
import { selectAllOrdens } from '../store/selectors/ordem.selectors';

import { Tab2FormPage } from '../tab2-form/tab2-form.page';




@Component({
  selector: 'app-tab2-details',
  templateUrl: './tab2-details.page.html',
  styleUrls: ['./tab2-details.page.scss'],
})
export class Tab2DetailsPage implements OnInit {

  ordens$: Observable<any>;
  ordemId: string

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.ordemId = this.route.snapshot.params['ordemid'];
    this.ordens$ = this.store
      .pipe(
        select(selectAllOrdens)
      );


  }

  async openModal() {
    const modal = await this.modalController.create({
      component: Tab2FormPage,
      componentProps:{
        passedId: this.ordemId 
      }
    });
    return modal.present()
  }

}
