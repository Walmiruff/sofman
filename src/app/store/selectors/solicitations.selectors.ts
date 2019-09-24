import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SolicitationsState } from '../reducers/solicitations.reducer';

import * as fromSolicitation from '../reducers/solicitations.reducer';

export const selectSolicitationsState = createFeatureSelector<SolicitationsState>('solicitation');

export const selectAllSolicitations = createSelector(
  selectSolicitationsState,
  fromSolicitation.selectAll
);
