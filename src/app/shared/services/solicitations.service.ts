import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { ISolicitation } from 'src/app/store/models/solicitation.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitationsService {
  ordemId = null;

  private url = environment.api + 'solicitations/'; // Localhost mocado

  // private url = environment.api;
  constructor(private http: HttpClient) {}

  getSolicitation() {
    return this.http.get<ISolicitation[]>(this.url); // localhost mocado
  }
}
