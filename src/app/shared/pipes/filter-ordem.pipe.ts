import { Pipe, PipeTransform } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IOrdem } from 'src/app/store/models/ordem.model';

@Pipe({
  name: 'filterOrdem'
})
export class FilterOrdemPipe implements PipeTransform {

  transform(value: any, ordemId: number): any {
     return value.filter( ordens => ordens.id == ordemId); 
 }

}
