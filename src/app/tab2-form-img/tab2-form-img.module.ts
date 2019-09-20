import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { Tab2FormImgPage } from './tab2-form-img.page';


const routes: Routes = [
  {
    path: '',
    component: Tab2FormImgPage
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
  declarations: [Tab2FormImgPage]
})
export class Tab2FormImgPageModule {}
