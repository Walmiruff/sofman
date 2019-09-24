import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ISolicitation } from '../models/solicitation.model';

export enum SolicitationActionTypes {
  ALLSOLICITATIONREQUESTED = '[SOLICITATION TAB2] All Solicitações Requested',
  ALLSOLICITATIONLOADED = '[SOLICITATION API] All Solicitações Loaded',
  ADDSOLICITATION = '[SOLICITATION ADD] Add Solicitacão',
  UPDATESOLICITATION = '[SOLICITATION UPDATE] Update Solicitação',
  REMOVESOLICITATION = '[SOLICITATION REMOVE] Remove Solicitação'
}

export class ALLSOLICITATIONREQUESTED implements Action {
  readonly type = SolicitationActionTypes.ALLSOLICITATIONREQUESTED;
}

export class ALLSOLICITATIONLOADED implements Action {
  readonly type = SolicitationActionTypes.ALLSOLICITATIONLOADED;
  constructor(public payload: { solicitations: ISolicitation[] }) {
    console.log(payload.solicitations);
  }
}

export class ADDSOLICITATION implements Action {
  readonly type = SolicitationActionTypes.ADDSOLICITATION;
  constructor(public payload: { solicitation: ISolicitation }) {}
}

export class UPDATESOLICITATION implements Action {
  readonly type = SolicitationActionTypes.UPDATESOLICITATION;
  constructor(public payload: { solicitation: Update<ISolicitation> }) {}
}

export class REMOVESOLICITATION implements Action {
  readonly type = SolicitationActionTypes.REMOVESOLICITATION;
  constructor(public payload: { id: number }) {}
}

export type SolicitationAction =
  | ADDSOLICITATION
  | REMOVESOLICITATION
  | UPDATESOLICITATION
  | ALLSOLICITATIONREQUESTED
  | ALLSOLICITATIONLOADED;
