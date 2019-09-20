import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { IAptMaterial } from './../models/apt_material.model';

export enum MaterialActionTypes {
    ALLMATREQUESTED = '[MAT TAB2] All Materiais Requested',
    ALLMATLOADED = '[MAT API] All Materiais Loaded',
    ADDMAT = '[MAT ADD] Add Material',
    UPDATEMAT = '[MAT UPDATE] Update Material',
    REMOVE = '[MAT REMOVE] Remove Material'
}



export class ALLMATREQUESTED implements Action {
    readonly type = MaterialActionTypes.ALLMATREQUESTED;
}

export class ALLMATLOADED implements Action {
    readonly type = MaterialActionTypes.ALLMATLOADED;
    constructor(public payload: { materiais: IAptMaterial[] }) { console.log(payload.materiais) }
}

export class ADDMAT implements Action {
    readonly type = MaterialActionTypes.ADDMAT;
    constructor(public payload: { material: IAptMaterial }) { }
}


export class UPDATEMAT implements Action {
    readonly type = MaterialActionTypes.UPDATEMAT;
    constructor(public payload: { material: Update<IAptMaterial> }) { }
}

export class REMOVE implements Action {
    readonly type = MaterialActionTypes.REMOVE;
    constructor(public payload: { id: number }) { }
}





export type MaterialAction = ADDMAT | REMOVE | UPDATEMAT | ALLMATREQUESTED | ALLMATLOADED;
