import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ITarefa } from '../models/tarefa.model';
import { TarefaAction, TarefaActionTypes } from '../actions/tarefas.action';

export interface TarefasState extends EntityState<ITarefa> {}

export const adapter: EntityAdapter<ITarefa> = createEntityAdapter<ITarefa>();

export const initialTarefaState: TarefasState = adapter.getInitialState();

export function TarefaReducer(state = initialTarefaState, action: TarefaAction): TarefasState {
  switch (action.type) {
    case TarefaActionTypes.ALLTAREFALOADED:
      return adapter.addAll(action.payload.tarefas, state);
    case TarefaActionTypes.ADDTAREFA:
      return adapter.addOne(action.payload.tarefa, state);
    case TarefaActionTypes.UPDATETAREFA:
      return adapter.updateOne(action.payload.tarefa, state);
    case TarefaActionTypes.REMOVETAREFA:
      return adapter.removeOne(action.payload.id, state);
    default:
      return state;
  }
}

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
