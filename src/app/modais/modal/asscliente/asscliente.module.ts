import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SignaturePadModule } from 'angular2-signaturepad';

import { AssclientePage } from './asscliente.page';

const routes: Routes = [
  {
    path: '',
    component: AssclientePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignaturePadModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AssclientePage]
})
export class AssclientePageModule {}
