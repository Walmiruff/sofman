import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { Tab2FormTarefaPage } from './tab2-form-tarefa.page';


const routes: Routes = [
  {
    path: '',
    component: Tab2FormTarefaPage
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
  declarations: [Tab2FormTarefaPage]
})
export class Tab2FormTarefaPageModule {}
