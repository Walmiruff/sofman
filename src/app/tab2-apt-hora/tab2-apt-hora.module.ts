import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tab2AptHoraPage } from './tab2-apt-hora.page';
import { SharedPipesModule } from '../shared/pipes/shared-pipes.module';



const routes: Routes = [
  {
    path: '',
    component: Tab2AptHoraPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedPipesModule,
    RouterModule.forChild(routes),
  ],
  declarations: [Tab2AptHoraPage]
})
export class Tab2AptHoraPageModule {}
