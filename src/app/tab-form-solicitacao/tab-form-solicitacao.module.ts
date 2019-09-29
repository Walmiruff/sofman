import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabFormSolicitacaoPage } from './tab-form-solicitacao.page';

const routes: Routes = [
  {
    path: '',
    component: TabFormSolicitacaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabFormSolicitacaoPage]
})
export class TabFormSolicitacaoPageModule { }
