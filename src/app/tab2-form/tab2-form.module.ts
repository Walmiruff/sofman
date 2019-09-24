import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab2FormPage } from './tab2-form.page';
import { SignaturePadModule } from 'angular2-signaturepad';
import { Tab2FormSolicitationsPageModule } from './../tab2-form-solicitations/tab2-form-solicitations.module';

const routes: Routes = [
  {
    path: '',
    component: Tab2FormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SignaturePadModule,
    Tab2FormSolicitationsPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Tab2FormPage]
})
export class Tab2FormPageModule {}
