import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IOrdem } from 'src/app/store/models/ordem.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrdemService {
  private url = environment.api + '?ordensservico'; // api mySql ordensservico

  constructor(private http: HttpClient, private api: ApiService) {}
  getOrdem() {
    const headers = new HttpHeaders();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    // agora nao sei se e append. ou set kkkkk

    const idcliente = this.api.getCredentials().iduser;
    const logincliente = this.api.getCredentials().login;

    if (idcliente && logincliente) {
      const data = {
        idcliente: this.api.getCredentials().iduser,
        logincliente: this.api.getCredentials().login
      };
      return this.http.post(this.url, data);
      // return this.http.get<IOrdem[]>(
      //   `${this.url}idcliente=${idcliente}&logincliente=${logincliente}`
      // );
    } else {
      return;
    }
  }
}
