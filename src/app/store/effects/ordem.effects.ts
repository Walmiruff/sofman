import { Injectable } from '@angular/core';
import { mergeMap, map } from 'rxjs/operators';
import { Actions ,Effect, ofType } from '@ngrx/effects';

import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { OrdemActionTypes, ALLORDEMREQUESTED, ADDORDEM, UPDATEORDEM, REMOVEORDEM , ALLORDEMLOADED } from '../actions/ordem.action';
import { OrdemService } from 'src/app/shared/services/ordem.service';


@Injectable()

export class OrdemEffects {
 @Effect()
 loadOrdem$ = this.actions$
 .pipe(
     ofType<ALLORDEMREQUESTED>( OrdemActionTypes.ALLORDEMREQUESTED ),
     mergeMap( action => this.ordemService.getOrdem()),
     map( ordens => new ALLORDEMLOADED({ordens}))
 );

//  @Effect()
//  addOrdem$ = this.actions$
//  .pipe(
//      ofType<ADDORDEM>( OrdemActionTypes.ADDORDEM ),
//      mergeMap( action => this.firebaseService.crudFirebase( action.payload.ordem, 'add' )),
//  );

//  @Effect()
//  removeOrdem$ = this.actions$
//  .pipe(
//      ofType<REMOVEORDEM>( OrdemActionTypes.REMOVEORDEM ),
//      mergeMap( action => this.firebaseService.crudFirebase( action.payload.id, 'remove' )),
//  );

//  @Effect()
//  updateOrdem$ = this.actions$
//  .pipe(
//      ofType<UPDATEORDEM>( OrdemActionTypes.UPDATEORDEM ),
//      mergeMap( action => this.firebaseService.crudFirebase( action.payload.ordem, 'update' )),
//  );

 
 constructor(
     private actions$: Actions,
     private ordemService: OrdemService,
     private firebaseService: FirebaseService 
     ) {

 }

}