import { Pipe, PipeTransform } from '@angular/core';
import { IOrdem } from '../../store/models/ordem.model';

@Pipe({
  name: 'filtroOrdem'
})
export class FiltroOrdemPipe implements PipeTransform {
  transform(ordems: IOrdem[], texto: string): IOrdem[] {
    if (texto.length === 0) { return ordems; }
    texto = texto.toLocaleLowerCase();

    return ordems.filter( ordem => {
    return ordem.equipamento.toLocaleLowerCase().includes(texto) ||
     ordem.ordem.toString().includes(texto) ||
     ordem.equipamento.toString().includes(texto) ||
     ordem.solicitante.toString().includes(texto) ||
     ordem.data.toString().includes(texto)


});

  }
}