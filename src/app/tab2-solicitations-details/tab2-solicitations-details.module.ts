import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tab2SolicitationsDetailsPage } from './tab2-solicitations-details.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2SolicitationsDetailsPage
  }
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [Tab2SolicitationsDetailsPage]
})
export class Tab2SolicitationsDetailsPageModule {}
