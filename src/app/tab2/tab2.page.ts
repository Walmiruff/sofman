import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '../store/models/app-state.model';
import { selectAllOrdens } from '../store/selectors/ordem.selectors';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {


  constructor(
    private store: Store<AppState>,
  ) { }


  ngOnInit() {
    const ordens$ = this.store
    .pipe(
      select(selectAllOrdens)
    )
  }

}
