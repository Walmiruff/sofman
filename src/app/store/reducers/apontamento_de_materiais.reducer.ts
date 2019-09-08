import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { IAptMaterial } from '../models/apt_material.model';
import { MaterialAction, MaterialActionTypes } from '../actions/apontamento_de_materiais.action';


export interface MateriaisState extends EntityState<IAptMaterial> {}

export const adapter: EntityAdapter<IAptMaterial> = createEntityAdapter<IAptMaterial>();

export const initialMaterialState: MateriaisState = adapter.getInitialState();


export function MaterialReducer( state = initialMaterialState, action: MaterialAction): MateriaisState {
    switch (action.type) {
        case MaterialActionTypes.ALLMATLOADED:
            return adapter.addAll(action.payload.materiais, state);
        case MaterialActionTypes.ADDMAT:
            return adapter.addOne(action.payload.material, state);
        case MaterialActionTypes.UPDATEMAT:
            return adapter.updateOne(action.payload.material, state);
        case MaterialActionTypes.REMOVE:
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


