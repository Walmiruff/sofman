import { Injectable } from '@angular/core';
import { mergeMap, map } from 'rxjs/operators';
import { Actions ,Effect, ofType } from '@ngrx/effects';

import { ALLHORAREQUESTED, HoraActionTypes, ALLHORALOADED } from '../actions/apontamento_de_horas.action';
import { ApontamentoDeHorasService } from 'src/app/shared/services/apontamento-de-horas.service';


@Injectable()

export class HoraEffects {
    @Effect()
    loadHora$ = this.actions$
    .pipe(
        ofType<ALLHORAREQUESTED>( HoraActionTypes.ALLHORAREQUESTED ),
        mergeMap( action => this.apontamentoDeHorasService.getAptHora()),//action.payload.ordemId
        map( horas => new ALLHORALOADED({horas}))
    );
    
    constructor(private actions$: Actions, private apontamentoDeHorasService: ApontamentoDeHorasService) {
   
    }
}