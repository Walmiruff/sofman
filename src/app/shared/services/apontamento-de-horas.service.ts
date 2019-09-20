import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IAptHora } from 'src/app/store/models/apt_hora.model';

@Injectable({
  providedIn: 'root'
})
export class ApontamentoDeHorasService {

 // private url = environment.api; Localhost Mocado
 private url = environment.api + 'apontamento_de_horas/';

  constructor(private http: HttpClient) { }

  getAptHora() {

    const form = new FormData();
    form.append('apontamento_de_horas', 'apontamento_de_horas');
    form.append('idordem', '439652');

    const headers =  new HttpHeaders();
    headers.set('Accept', 'application/json, text/plain, */*')
    headers.set('Content-Type', 'text/plain')

    return this.http.get<IAptHora[]>(this.url); //mocado

  //  return this.http.post<IAptHora[]>(this.url, form, { headers });
  }
}
