import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { FilterPipe } from 'ngx-filter-pipe';
import { AppState } from '../store/models/app-state.model';
import { selectAllSolicitations } from '../store/selectors/solicitations.selectors';
import { ALLSOLICITATIONREQUESTED } from '../store/actions/solicitations.action';
import { TabFormSolicitacaoPage } from '../tab-form-solicitacao/tab-form-solicitacao.page';

@Component({
  selector: 'app-tab-solicitacao',
  templateUrl: './tab-solicitacao.page.html',
  styleUrls: ['./tab-solicitacao.page.scss'],
})
export class TabSolicitacaoPage implements OnInit {

  solicitacoes$: Observable<any>;
  userFilter: any = { id_cliente: '' };

  constructor(
    private store: Store<AppState>,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.store.dispatch(new ALLSOLICITATIONREQUESTED());

    this.solicitacoes$ = this.store.pipe(select(selectAllSolicitations));

  }
  async openModalCreate() {
    const modal = await this.modalController.create({
      component: TabFormSolicitacaoPage // colocar pagina form aqui
    });
    return modal.present();
  }

}
