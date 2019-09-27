import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterPipe } from './filter.pipe';
import { FilterSolicitationPipe } from './filter-solicitation.pipe';

@NgModule({
  declarations: [FilterPipe, FilterSolicitationPipe],
  imports: [CommonModule],
  exports: [FilterPipe]
})
export class SharedPipesModule {}
