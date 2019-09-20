import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IAptMaterial } from 'src/app/store/models/apt_material.model';

@Injectable({
  providedIn: 'root'
})
export class ApontamentoDeMateriaisService {
 private url = environment.api + 'apontamento_de_materiais/'; //localhost mocado
 // private url = environment.api;

  constructor(private http: HttpClient) { }

  getAptMaterial() {

    const form = new FormData();
    form.append('apontamento_de_materiais', 'apontamento_de_materiais');
    form.append('idordem', '439652');

    const headers =  new HttpHeaders();
    headers.set('Accept', 'application/json, text/plain, */*')
    headers.set('Content-Type', 'text/plain')
    return this.http.get<IAptMaterial[]>(this.url); //mocado

   // return this.http.post<IAptMaterial[]>(this.url, form, {headers});
  }
}
