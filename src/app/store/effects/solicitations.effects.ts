import { Injectable } from '@angular/core';
import { mergeMap, map } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
  ALLSOLICITATIONREQUESTED,
  SolicitationActionTypes,
  ALLSOLICITATIONLOADED
} from '../actions/solicitations.action';
import { SolicitationsService } from 'src/app/shared/services/solicitations.service';

@Injectable()
export class SolicitationEffects {
  @Effect()
  loadHora$ = this.actions$.pipe(
    ofType<ALLSOLICITATIONREQUESTED>(SolicitationActionTypes.ALLSOLICITATIONREQUESTED),
    mergeMap(action => this.solicitationsService.getSolicitation()), //action.payload.ordemId
    map(solicitations => new ALLSOLICITATIONLOADED({ solicitations }))
  );

  constructor(private actions$: Actions, private solicitationsService: SolicitationsService) {}
}
