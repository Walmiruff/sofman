import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { IAptMaterial } from 'src/app/store/models/apt_material.model';

@Injectable({
  providedIn: 'root'
})
export class ApontamentoDeMateriaisService {
  //private url = environment.api + '?apontamento_de_materiais';
  private url = environment.api;

  public ordemId = null;
  constructor(private http: HttpClient) {}

  getAptMaterial() {
    const form = new FormData();
    form.append('apontamento_de_materiais', 'apontamento_de_materiais');
    form.append('id_ordem', this.ordemId);

    const headers = {
      headers: { Accept: 'application/json, text/plain, */*' },
      processData: false,
      contentType: false,
      mimeType: 'multipart/form-data',
      data: form
    };

    return this.http.post<IAptMaterial[]>(this.url, form, headers);
  }
}
