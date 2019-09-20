import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ITarefa } from '../models/tarefa.model';

export enum TarefaActionTypes {
    ALLTAREFAREQUESTED = '[TAREFA TAB2] All Tarefas Requested',
    ALLTAREFALOADED = '[TAREFA API] All Tarefas Loaded',
    ADDTAREFA = '[TAREFA ADD] Add Tarefa',
    UPDATETAREFA = '[TAREFA UPDATE] Update Tarefa',
    REMOVETAREFA = '[TAREFA REMOVE] Remove Tarefa'
}



export class ALLTAREFAREQUESTED implements Action {
    readonly type = TarefaActionTypes.ALLTAREFAREQUESTED;
}

export class ALLTAREFALOADED implements Action {
    readonly type = TarefaActionTypes.ALLTAREFALOADED;
    constructor(public payload: { tarefas: ITarefa[] }) { console.log(payload.tarefas) }
}

export class ADDTAREFA implements Action {
    readonly type = TarefaActionTypes.ADDTAREFA;
    constructor(public payload: { tarefa: ITarefa }) { }
}


export class UPDATETAREFA implements Action {
    readonly type = TarefaActionTypes.UPDATETAREFA;
    constructor(public payload: { tarefa: Update<ITarefa> }) { }
}

export class REMOVETAREFA implements Action {
    readonly type = TarefaActionTypes.REMOVETAREFA;
    constructor(public payload: { id: number }) { }
}





export type TarefaAction = ADDTAREFA | REMOVETAREFA | UPDATETAREFA | ALLTAREFAREQUESTED | ALLTAREFALOADED;
