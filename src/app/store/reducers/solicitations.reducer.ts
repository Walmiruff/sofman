import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ISolicitation } from '../models/solicitation.model';
import { SolicitationAction, SolicitationActionTypes } from '../actions/solicitations.action';

export interface SolicitationsState extends EntityState<ISolicitation> {}

export const adapter: EntityAdapter<ISolicitation> = createEntityAdapter<ISolicitation>();

export const initialSolicitationState: SolicitationsState = adapter.getInitialState();

export function SolicitationReducer(
  state = initialSolicitationState,
  action: SolicitationAction
): SolicitationsState {
  switch (action.type) {
    case SolicitationActionTypes.ALLSOLICITATIONLOADED:
      return adapter.addAll(action.payload.solicitations, state);
    case SolicitationActionTypes.ADDSOLICITATION:
      return adapter.addOne(action.payload.solicitation, state);
    case SolicitationActionTypes.UPDATESOLICITATION:
      return adapter.updateOne(action.payload.solicitation, state);
    case SolicitationActionTypes.REMOVESOLICITATION:
      return adapter.removeOne(action.payload.id, state);
    default:
      return state;
  }
}

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
