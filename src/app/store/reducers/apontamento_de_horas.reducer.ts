import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { IAptHora } from '../models/apt_hora.model';
import { HoraAction, HoraActionTypes } from '../actions/apontamento_de_horas.action';


export interface HorasState extends EntityState<IAptHora> {}

export const adapter: EntityAdapter<IAptHora> = createEntityAdapter<IAptHora>();

export const initialMaterialState: HorasState = adapter.getInitialState();


export function HoraReducer( state = initialMaterialState, action: HoraAction): HorasState {
    switch (action.type) {
        case HoraActionTypes.ALLHORALOADED:
            return adapter.addAll(action.payload.horas, state);
        case HoraActionTypes.ADDHORA:
            return adapter.addOne(action.payload.hora, state);
        case HoraActionTypes.UPDATEHORA:
            return adapter.updateOne(action.payload.hora, state);
        case HoraActionTypes.REMOVEHORA:
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


