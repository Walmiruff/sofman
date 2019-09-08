import { Injectable } from '@angular/core';
import { mergeMap, map } from 'rxjs/operators';
import { Actions ,Effect, ofType } from '@ngrx/effects';

import { ALLMATREQUESTED, MaterialActionTypes, ALLMATLOADED } from '../actions/apontamento_de_materiais.action';
import { ApontamentoDeMateriaisService } from 'src/app/shared/services/apontamento-de-materiais.service';


@Injectable()

export class MaterialEffects {
    @Effect()
    loadMaterial$ = this.actions$
    .pipe(
        ofType<ALLMATREQUESTED>( MaterialActionTypes.ALLMATREQUESTED ),
        mergeMap( action => this.apontamentoDeMateriaisService.getAptMaterial()),//action.payload.ordemId
        map( materiais => new ALLMATLOADED({materiais}))
    );
    
    constructor(private actions$: Actions, private apontamentoDeMateriaisService: ApontamentoDeMateriaisService) {
   
    }
}