import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { IOrdem } from '../models/ordem.model';
import { OrdemAction, OrdemActionTypes } from '../actions/ordem.action';



export interface OrdensState extends EntityState<IOrdem> { }


export const adapter: EntityAdapter<IOrdem> = createEntityAdapter<IOrdem>();


export const initialOrdemState: OrdensState = adapter.getInitialState();


export function OrdemReducer(state = initialOrdemState, action: OrdemAction): OrdensState {
    switch (action.type) {
        case OrdemActionTypes.ALLORDEMLOADED:
            return adapter.addAll(action.payload.ordens, state);
        case OrdemActionTypes.ADDORDEM:
            return adapter.addOne(action.payload.ordem, state);
        case OrdemActionTypes.UPDATEORDEM:
            return adapter.updateOne(action.payload.ordem, state);
        case OrdemActionTypes.REMOVEORDEM:
            return adapter.removeOne(action.payload.id, state);
        default:
            return state;
    }

}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
