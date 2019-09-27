import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSolicitation'
})
export class FilterSolicitationPipe implements PipeTransform {
  transform(value: any, solitationId: number): any {
    return value.filter(solicitations => solicitations.id == solitationId);
  }
}
