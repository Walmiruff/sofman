import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { IAptHora } from './../models/apt_hora.model';

export enum HoraActionTypes {
    ALLHORAREQUESTED = '[HORA TAB2] All Horas Requested',
    ALLHORALOADED = '[HORA API] All Horas Loaded',
    ADDHORA = '[HORA ADD] Add Hora',
    UPDATEHORA = '[HORA UPDATE] Update Hora',
    REMOVEHORA =  '[HORA REMOVE] Remove Hora'   
}



export class ALLHORAREQUESTED implements Action {
    readonly type = HoraActionTypes.ALLHORAREQUESTED;
}

export class ALLHORALOADED implements Action {
    readonly type = HoraActionTypes.ALLHORALOADED;
    constructor(public payload: { horas: IAptHora[] }) {}
}

export class ADDHORA implements Action {
    readonly type = HoraActionTypes.ADDHORA;
    constructor( public payload: { hora: IAptHora }) {}
}


export class UPDATEHORA implements Action {
    readonly type = HoraActionTypes.UPDATEHORA;
    constructor ( public payload: { hora: Update<IAptHora>}){}
}

export class REMOVEHORA implements Action {
    readonly type = HoraActionTypes.REMOVEHORA;
    constructor ( public payload: { id: number}){}
}





export type HoraAction = ADDHORA | REMOVEHORA | UPDATEHORA | ALLHORAREQUESTED | ALLHORALOADED;
