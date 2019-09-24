import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { Tab2FormAptMatPageModule } from '../tab2-form-apt-mat/tab2-form-apt-mat.module';
import { Tab2FormAptHoraPageModule } from '../tab2-form-apt-hora/tab2-form-apt-hora.module';
import { Tab2FormTarefaPageModule } from '../tab2-form-tarefa/tab2-form-tarefa.module';
import { Tab2FormPageModule } from '../tab2-form/tab2-form.module';
import { Tab2FormImgPageModule } from './../tab2-form-img/tab2-form-img.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    Tab2FormPageModule,
    Tab2FormAptMatPageModule,
    Tab2FormAptHoraPageModule,
    Tab2FormTarefaPageModule,
    Tab2FormImgPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
