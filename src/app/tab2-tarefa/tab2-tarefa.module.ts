import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tab2TarefaPage } from './tab2-tarefa.page';
import { SharedPipesModule } from '../shared/pipes/shared-pipes.module';



const routes: Routes = [
  {
    path: '',
    component: Tab2TarefaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedPipesModule,
    RouterModule.forChild(routes),
  ],
  declarations: [Tab2TarefaPage]
})
export class Tab2TarefaPageModule {}
