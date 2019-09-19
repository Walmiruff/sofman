import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

import { ITarefa } from 'src/app/store/models/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  // private url = environment.api + 'retornotarefas.php' ?ordensservico=ordensservico&;
  // private url = environment.api + '?tarefas';

  private url = environment.api;
  ordemId = null
  constructor(private http: HttpClient, private api: ApiService) {
   // this.ordemId = this.route.snapshot.params['ordemid'];
  }

  getTarefa() {
    const idcliente = this.api.getCredentials().iduser;
    const logincliente = this.api.getCredentials().login;
    const form = new FormData();
    form.append('retornotarefas', 'retornotarefas');
    form.append('id_ordem',  this.ordemId);

    const headers = {
        headers: { Accept: 'application/json, text/plain, */*'},
        processData: false,
        contentType: false,
        mimeType: 'multipart/form-data',
        data: form
      };

    return this.http.post<ITarefa[]>(this.url, form, headers);
  }
}
