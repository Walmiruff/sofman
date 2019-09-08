import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tab2AptMatPage } from './tab2-apt-mat.page';
import { SharedPipesModule } from '../shared/pipes/shared-pipes.module';


const routes: Routes = [
  {
    path: '',
    component: Tab2AptMatPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedPipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Tab2AptMatPage]
})
export class Tab2AptMatPageModule {}
