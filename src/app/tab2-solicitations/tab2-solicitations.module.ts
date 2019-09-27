import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { Tab2SolicitationsPage } from '../tab2-solicitations/tab2-solicitations.page';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FilterPipeModule,
    RouterModule.forChild([{ path: '', component: Tab2SolicitationsPage }])
  ],
  declarations: [Tab2SolicitationsPage]
})
export class Tab2SolicitationsPageModule {}
