import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { ITarefa } from 'src/app/store/models/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  private url = environment.api + 'tarefas/' ;

  constructor(private http: HttpClient) { }

  getTarefa() {
    return  this.http.get<ITarefa[]>(this.url);
   }
 
}
