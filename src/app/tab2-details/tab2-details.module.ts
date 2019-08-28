import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tab2DetailsPage } from './tab2-details.page';
import { FilterOrdemPipe } from '../shared/pipes/filter-ordem.pipe';

const routes: Routes = [
  {
    path: '',
    component: Tab2DetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Tab2DetailsPage, FilterOrdemPipe]
})
export class Tab2DetailsPageModule {}
