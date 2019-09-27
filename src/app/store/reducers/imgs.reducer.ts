import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { IImg } from '../models/img.model';
import { ImgAction, ImgActionTypes } from '../actions/imgs.action';

export interface ImgsState extends EntityState<IImg> {}

export const adapter: EntityAdapter<IImg> = createEntityAdapter<IImg>();

export const initialImgState: ImgsState = adapter.getInitialState();

export function ImgReducer(state = initialImgState, action: ImgAction): ImgsState {
  switch (action.type) {
    case ImgActionTypes.ALLIMGLOADED:
      return adapter.addAll(action.payload.imgs, state);
    case ImgActionTypes.ADDIMG:
      return adapter.addOne(action.payload.img, state);
    case ImgActionTypes.UPDATEIMG:
      return adapter.updateOne(action.payload.img, state);
    case ImgActionTypes.REMOVEIMG:
      return adapter.removeOne(action.payload.id, state);
    default:
      return state;
  }
}

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
