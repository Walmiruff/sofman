import { Injectable } from '@angular/core';
import { mergeMap, map } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ALLTAREFAREQUESTED, TarefaActionTypes , ALLTAREFALOADED } from '../actions/tarefas.action';
import { TarefasService } from 'src/app/shared/services/tarefas.service';


@Injectable()

export class TarefaEffects {

    @Effect()
    loadHora$ = this.actions$
    .pipe(
        ofType<ALLTAREFAREQUESTED>( TarefaActionTypes.ALLTAREFAREQUESTED ),
        mergeMap( action => this.tarefasService.getTarefa()

        ), //action.payload.ordemId
        map( tarefas => new ALLTAREFALOADED({tarefas}))
    );

    constructor(private actions$: Actions, private tarefasService: TarefasService) {

    }
}