import { Action } from '@ngrx/store';
import { IOrdem } from './../models/ordem.model';
import { Update } from '@ngrx/entity';

export enum OrdemActionTypes {
    ALLORDEMREQUESTED = '[ORDEM TAB2] All Ordem Requested',
    ALLORDEMLOADED = '[ORDEM API] All Ordem Loaded',
    UPDATEORDEM = '[ORDEM UPDATE] Update Ordem'   
}

export class ALLORDEMREQUESTED implements Action {
    readonly type = OrdemActionTypes.ALLORDEMREQUESTED;
}


export class ALLORDEMLOADED implements Action {
    readonly type = OrdemActionTypes.ALLORDEMLOADED;

    constructor(public payload: { ordens:IOrdem[]}) {}
}


export class UPDATEORDEM implements Action {
    readonly type = OrdemActionTypes.UPDATEORDEM;
    constructor ( public payload: { ordem: Update<IOrdem>}){}
}


export type OrdemAction = ALLORDEMREQUESTED | ALLORDEMLOADED | UPDATEORDEM;
