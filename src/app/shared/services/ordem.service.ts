import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { IOrdem } from 'src/app/store/models/ordem.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrdemService {
  private url = environment.api + '?ordensservico&'; // api mySql ordensservico

  constructor(private http: HttpClient, private api: ApiService) {}
  getOrdem() {
    const idcliente = this.api.getCredentials().iduser;
    const logincliente = this.api.getCredentials().login;

    if (idcliente && logincliente) {
      return this.http.get<IOrdem[]>(
        `${this.url}idcliente=${idcliente}&logincliente=${logincliente}`
      );
    } else {
      return;
    }
  }
}
