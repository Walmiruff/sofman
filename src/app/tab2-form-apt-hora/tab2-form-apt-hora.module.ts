import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { Tab2FormAptHoraPage } from './tab2-form-apt-hora.page';


const routes: Routes = [
  {
    path: '',
    component: Tab2FormAptHoraPage
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
  declarations: [Tab2FormAptHoraPage]
})
export class Tab2FormAptHoraPageModule {}
