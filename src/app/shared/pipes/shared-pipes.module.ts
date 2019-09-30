import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterPipe } from './filter.pipe';
import { FilterSolicitationPipe } from './filter-solicitation.pipe';
import { FiltroOrdemPipe } from './filtro-ordem.pipe';

@NgModule({
  declarations: [FilterPipe],
  imports: [CommonModule],
  exports: [FilterPipe, FiltroOrdemPipe]
})
export class SharedPipesModule { }
