import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { Tab2Page } from './tab2.page';
import { FiltroOrdemPipe } from './../shared/pipes/filtro-ordem.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FilterPipeModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page, FiltroOrdemPipe]
})
export class Tab2PageModule {}
