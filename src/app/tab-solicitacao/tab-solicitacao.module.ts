import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabSolicitacaoPage } from './tab-solicitacao.page';
import { FilterPipeModule } from 'ngx-filter-pipe';

const routes: Routes = [
  {
    path: '',
    component: TabSolicitacaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterPipeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabSolicitacaoPage]
})
export class TabSolicitacaoPageModule { }
