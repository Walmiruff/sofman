import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ImgsState } from '../reducers/imgs.reducer';

import * as fromImg from '../reducers/imgs.reducer';

export const selectImgsState = createFeatureSelector<ImgsState>('img');

export const selectAllImgs = createSelector(
    selectImgsState,
    fromImg.selectAll
)