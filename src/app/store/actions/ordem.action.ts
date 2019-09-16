import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { IOrdem } from './../models/ordem.model';

export enum OrdemActionTypes {
  ALLORDEMREQUESTED = '[ORDEM TAB2] All Ordem Requested',
  ALLORDEMLOADED = '[ORDEM API] All Ordem Loaded',
  ADDORDEM = '[ORDEM ADD] Add Material',
  UPDATEORDEM = '[ORDEM UPDATE] Update Ordem',
  REMOVEORDEM = '[ORDEM REMOVE] Remove Ordem'
}

export class ALLORDEMREQUESTED implements Action {
  readonly type = OrdemActionTypes.ALLORDEMREQUESTED;
}

export class ALLORDEMLOADED implements Action {
  readonly type = OrdemActionTypes.ALLORDEMLOADED;

  constructor(public payload: { ordens: IOrdem[] }) {
    console.log(payload.ordens);
  }
}

export class ADDORDEM implements Action {
  readonly type = OrdemActionTypes.ADDORDEM;
  constructor(public payload: { ordem: IOrdem }) {}
}

export class REMOVEORDEM implements Action {
  readonly type = OrdemActionTypes.REMOVEORDEM;
  constructor(public payload: { id: number }) {}
}

export class UPDATEORDEM implements Action {
  readonly type = OrdemActionTypes.UPDATEORDEM;
  constructor(public payload: { ordem: Update<IOrdem> }) {}
}

export type OrdemAction = ADDORDEM | REMOVEORDEM | ALLORDEMREQUESTED | ALLORDEMLOADED | UPDATEORDEM;
