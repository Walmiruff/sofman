import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IOrdem } from '../store/models/ordem.model';
import { AppState } from '../store/models/app-state.model';




@Component({
  selector: 'app-tab2-details',
  templateUrl: './tab2-details.page.html',
  styleUrls: ['./tab2-details.page.scss'],
})
export class Tab2DetailsPage implements OnInit {

  ordem$: Observable<IOrdem>;
  ordemId: string

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
    ) { }

  ngOnInit() {
   this.ordemId = this.route.snapshot.params['ordemid'];
   this.ordem$ = this.store.select( store => store.ordem[0])     

  }

}
