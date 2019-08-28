import { Action } from '@ngrx/store';
import { IAptMaterial } from '../models/apt_material.model';

export enum MaterialActionTypes {
    ALLMATLOADED = '[MAT API] All Materiais Loaded'   
}


export class ALLMATLOADED implements Action {
    readonly type = MaterialActionTypes.ALLMATLOADED;

    constructor(public payload: IAptMaterial[]) {}
}


export type MaterialAction =  ALLMATLOADED;
