import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { IImg } from '../models/img.model';

export enum ImgActionTypes {
    ALLIMGREQUESTED = '[IMG TAB2] All IMGs Requested',
    ALLIMGLOADED = '[IMG API] All IMGs Loaded',
    ADDIMG = '[IMG ADD] Add IMG',
    UPDATEIMG = '[IMG UPDATE] Update IMG',
    REMOVEIMG = '[IMG REMOVE] Remove Img'
}



export class ALLIMGREQUESTED implements Action {
    readonly type = ImgActionTypes.ALLIMGREQUESTED;
}

export class ALLIMGLOADED implements Action {
    readonly type = ImgActionTypes.ALLIMGLOADED;
    constructor(public payload: { imgs: IImg[] }) { console.log(payload.imgs) }
}

export class ADDIMG implements Action {
    readonly type = ImgActionTypes.ADDIMG;
    constructor(public payload: { img: IImg }) { }
}


export class UPDATEIMG implements Action {
    readonly type = ImgActionTypes.UPDATEIMG;
    constructor(public payload: { img: Update<IImg> }) { }
}

export class REMOVEIMG implements Action {
    readonly type = ImgActionTypes.REMOVEIMG;
    constructor(public payload: { id: number }) { }
}





export type ImgAction = ADDIMG | REMOVEIMG | UPDATEIMG | ALLIMGREQUESTED | ALLIMGLOADED;
