import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { IOrdem } from 'src/app/store/models/ordem.model';

@Injectable({
  providedIn: 'root'
})
export class OrdemService {

  private url = environment.api + 'ordens/' ;

  constructor(private http: HttpClient) { }

  getOrdem() {
   return  this.http.get<IOrdem[]>(this.url);
  }

  findOrdemById(id: number) {
    return  this.http.get<IOrdem>(this.url + id);
   }
}
