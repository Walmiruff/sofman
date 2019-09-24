import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tab2SolicitationsPage } from './tab2-solicitations.page';
import { SharedPipesModule } from '../shared/pipes/shared-pipes.module';

const routes: Routes = [
  {
    path: '',
    component: Tab2SolicitationsPage
  }
];

@NgModule({
  imports: [CommonModule, IonicModule, SharedPipesModule, RouterModule.forChild(routes)],
  declarations: [Tab2SolicitationsPage]
})
export class Tab2SolicitationsPageModule {}
