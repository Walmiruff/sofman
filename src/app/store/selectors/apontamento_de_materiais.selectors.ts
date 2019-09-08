import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MateriaisState } from '../reducers/apontamento_de_materiais.reducer';

import * as fromMaterial from '../reducers/apontamento_de_materiais.reducer';


export const selectMateriaisState = createFeatureSelector<MateriaisState>('material');


export const selectAllMateriais = createSelector(
    selectMateriaisState,
    fromMaterial.selectAll
)