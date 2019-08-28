import { IOrdem } from '../models/ordem.model';
import { OrdemAction, OrdemActionTypes } from '../actions/ordem.action';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';


export interface OrdensState extends EntityState<IOrdem> {

}

export const adapter: EntityAdapter<IOrdem> = createEntityAdapter<IOrdem>();


export const initialOrdemState: OrdensState = adapter.getInitialState()


export function OrdemReducer(state = initialOrdemState, action: OrdemAction): OrdensState {
    switch (action.type) {
        case OrdemActionTypes.ALLORDEMLOADED:
            return adapter.addAll(action.payload.ordens , state);
        case OrdemActionTypes.UPDATEORDEM:
            return Object.assign({}, state, {
                id: action.payload.id,
                changes: action.payload.changes
            })
        default:
            return state;
    }
    
}

export const {
    selectAll
} = adapter.getSelectors();
