import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOrdem'
})
export class FilterOrdemPipe implements PipeTransform {
  transform(value: any, ordemId: number): any {
    return value.filter(ordens => ordens.id == ordemId);
  }
}
