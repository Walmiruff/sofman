import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tab2ImgPage } from './tab2-img.page';



const routes: Routes = [
  {
    path: '',
    component: Tab2ImgPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [Tab2ImgPage]
})
export class Tab2ImgPageModule { }
