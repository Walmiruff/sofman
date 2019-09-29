import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from './../shared/services/api.service';
import { Tab2SolicitationsPage } from './../tab2-solicitations/tab2-solicitations.page';
import { Tab2FormSolicitationsPage } from './../tab2-form-solicitations/tab2-form-solicitations.page';
import { TabFormSolicitacaoPage } from '../tab-form-solicitacao/tab-form-solicitacao.page';
import { TabSolicitacaoPage } from '../tab-solicitacao/tab-solicitacao.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    loop: true
  };

  public nome = '';
  public logincliente = '';
  public cominicados = [];
  public tipoacesso;

  constructor(
    public api: ApiService,
    public modalController: ModalController,
    private router: Router
  ) {
    this.nome = api.getCredentials().name;
    this.logincliente = api.getCredentials().login;
    this.tipoacesso = api.getCredentials().tipoacesso;

    this.api.getAllComunicados().subscribe((data: any) => {
      this.cominicados = data.articles;
    });
  }

  openSolicitations() {
    this.router.navigate(['/tab-solicitacao']);
  }

  async openModalSolicitation() {
    const modal = await this.modalController.create({
      component: TabSolicitacaoPage
    });
    return modal.present();
  }
  async openModalSolicitationCreat() {
    const modal = await this.modalController.create({
      component: TabFormSolicitacaoPage
    });
    return modal.present();
  }
}
