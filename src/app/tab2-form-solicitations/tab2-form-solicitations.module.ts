import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab2FormSolicitationsPage } from './tab2-form-solicitations.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2FormSolicitationsPage
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
  declarations: [Tab2FormSolicitationsPage]
})
export class Tab2FormSolicitationsPageModule {}
