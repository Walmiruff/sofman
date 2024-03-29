import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdensState } from '../reducers/ordem.reducer';

import * as fromOrdem from '../reducers/ordem.reducer';

export const selectOrdensState = createFeatureSelector<OrdensState>("ordens");


export const selectAllOrdens = createSelector(
    selectOrdensState,
    fromOrdem.selectAll
);



