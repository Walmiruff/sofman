import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TarefasState } from '../reducers/tarefas.reducer';

import * as fromTarefa from '../reducers/tarefas.reducer';

export const selectTarefasState = createFeatureSelector<TarefasState>('tarefa');

export const selectAllTarefas = createSelector(
    selectTarefasState,
    fromTarefa.selectAll
)