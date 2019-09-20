import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';

import { ITarefa } from 'src/app/store/models/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  ordemId = null;

  private url = environment.api + 'tarefas/'; // Localhost mocado

  // private url = environment.api;
  constructor(private http: HttpClient, private api: ApiService) {
    // this.ordemId = this.route.snapshot.params['ordemid'];
  }

  getTarefa() {
    const form = new FormData();
    form.append('retornotarefas', 'retornotarefas');
    form.append('idordem', '439652');

    const headers =  new HttpHeaders();
    headers.set('Accept', 'application/json, text/plain, */*')
    headers.set('Content-Type', 'text/plain')

    // return this.http.post<ITarefa[]>(this.url, form, {headers});
    return this.http.get<ITarefa[]>(this.url); // localhost mocado

  }
}
