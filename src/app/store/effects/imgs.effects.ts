import { Injectable } from '@angular/core';
import { mergeMap, map } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ALLIMGREQUESTED, ImgActionTypes , ALLIMGLOADED } from '../actions/imgs.action';
import { ImgService } from 'src/app/shared/services/img.service';


@Injectable()

export class TarefaEffects {

    @Effect()
    loadImg$ = this.actions$
    .pipe(
        ofType<ALLIMGREQUESTED>( ImgActionTypes.ALLIMGREQUESTED ),
        mergeMap( action => this.imgsService.getImg()

        ), //action.payload.ordemId
        map( imgs => new ALLIMGLOADED({imgs}))
    );

    constructor(private actions$: Actions, private imgsService: ImgService) {

    }
}