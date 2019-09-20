import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IOrdem } from 'src/app/store/models/ordem.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrdemService {
   private url = environment.api + 'ordens/'; // api mySql ordensservico
 // private url = environment.api; // api mySql ordensservico

  constructor(private http: HttpClient, private api: ApiService) { }
  getOrdem() {
    const idcliente = this.api.getCredentials().iduser;
    const logincliente = this.api.getCredentials().login;
    const form = new FormData();
    form.append('ordensservico', 'ordensservico');
    form.append('idcliente', idcliente);
    form.append('logincliente', logincliente);
    const headers = {
        headers: { Accept: 'application/json, text/plain, */*'},
        processData: false,
        contentType: false,
        mimeType: 'multipart/form-data',
        data: form
      };
    return this.http.get<IOrdem[]>(this.url);
   // return this.http.post<IOrdem[]>(this.url, form, headers);

  }
}
