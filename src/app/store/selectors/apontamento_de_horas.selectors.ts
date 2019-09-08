import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HorasState } from '../reducers/apontamento_de_horas.reducer';

import * as fromHora from '../reducers/apontamento_de_horas.reducer';


export const selectHorasState = createFeatureSelector<HorasState>('hora');


export const selectAllHoras = createSelector(
    selectHorasState,
    fromHora.selectAll
)