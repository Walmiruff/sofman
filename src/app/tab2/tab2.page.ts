import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../store/models/app-state.model';
import { selectAllOrdens } from '../store/selectors/ordem.selectors';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  ordens$: Observable<any>;

  constructor(
    private store: Store<AppState>,
  ) { }


  ngOnInit() {
    this.ordens$ = this.store
    .pipe(
      select(selectAllOrdens)
    );

  }

}
