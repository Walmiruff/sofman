import { IAptMaterial } from '../models/apt_material.model';
import { MaterialAction, MaterialActionTypes } from '../actions/apontamento_de_materiais.action';

export const initialState: IAptMaterial[] = [];

export function MaterialReducer( state: IAptMaterial[] = initialState, action: MaterialAction) {
    switch (action.type) {
        case MaterialActionTypes.ALLMATLOADED:
            return [...state, action.payload];
        default:
            return state;
    }
}
