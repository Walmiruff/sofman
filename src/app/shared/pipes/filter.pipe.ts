import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, ordemId: number): any {
    return value.filter( data =>  data.fk == ordemId);
}

}
