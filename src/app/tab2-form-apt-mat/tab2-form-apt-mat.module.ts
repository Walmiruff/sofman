import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { Tab2FormAptMatPage } from './tab2-form-apt-mat.page';


const routes: Routes = [
  {
    path: '',
    component: Tab2FormAptMatPage
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
  declarations: [Tab2FormAptMatPage]
})
export class Tab2FormAptMatPageModule {}
