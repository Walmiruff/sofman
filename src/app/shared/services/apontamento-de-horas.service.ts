import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { IAptHora } from 'src/app/store/models/apt_hora.model';

@Injectable({
  providedIn: 'root'
})
export class ApontamentoDeHorasService {
  // private url = environment.api + '?apontamento_de_horas';
  public ordemId = null;
  private url = environment.api;

  constructor(private http: HttpClient) {}

  getAptHora() {
    const form = new FormData();
    form.append('apontamento_de_horas', 'apontamento_de_horas');
    form.append('id_ordem', this.ordemId);

    const headers = {
      headers: { Accept: 'application/json, text/plain, */*' },
      processData: false,
      contentType: false,
      mimeType: 'multipart/form-data',
      data: form
    };

    return this.http.get<IAptHora[]>(this.url);
  }
}
