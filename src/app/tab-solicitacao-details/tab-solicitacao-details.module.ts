import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabSolicitacaoDetailsPage } from './tab-solicitacao-details.page';
import { FilterSolicitationPipe } from '../shared/pipes/filter-solicitation.pipe';

const routes: Routes = [
  {
    path: '',
    component: TabSolicitacaoDetailsPage
  }
];

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabSolicitacaoDetailsPage, FilterSolicitationPipe]
})
export class TabSolicitacaoDetailsPageModule { }
