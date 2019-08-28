import { Injectable } from '@angular/core';
import { mergeMap, map } from 'rxjs/operators';
import { Actions ,Effect, ofType } from '@ngrx/effects';

import { ALLORDEMREQUESTED, OrdemActionTypes, ALLORDEMLOADED } from '../actions/ordem.action';
import { OrdemService } from 'src/app/shared/services/ordem.service';


@Injectable()

export class OrdemEffects {
 @Effect()
 loadOrdem$ = this.actions$
 .pipe(
     ofType<ALLORDEMREQUESTED>( OrdemActionTypes.ALLORDEMREQUESTED ),
     mergeMap( action => this.ordemService.getOrdem()),//action.payload.ordemId
     map( ordens => new ALLORDEMLOADED({ordens}))
 );
 
 constructor(private actions$: Actions, private ordemService: OrdemService) {

 }

}