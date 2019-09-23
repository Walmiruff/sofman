import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IImg } from 'src/app/store/models/img.model';

@Injectable({
  providedIn: 'root'
})
export class ImgService {
  private url = environment.api + 'img/';

  constructor(private http: HttpClient) { }

  getImg() {
    const form = new FormData();
    form.append('gerenciarimagens', 'gerenciarimagens');
    form.append('idordem', '439652');

    const headers = new HttpHeaders();
    headers.set('Accept', 'application/json, text/plain, */*');
    headers.set('Content-Type', 'text/plain');

    //return  this.http.post<IImg[]>(this.url, form, {headers});

    return this.http.get<IImg[]>(this.url);
  }
}
