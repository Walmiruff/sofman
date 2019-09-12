import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { IAptHora } from 'src/app/store/models/apt_hora.model';

@Injectable({
  providedIn: 'root'
})
export class ApontamentoDeHorasService {
  private url = environment.api + 'apontamentohora.php'; //
  //private url = environment.api + 'apontamento_de_horas/';

  constructor(private http: HttpClient) {}

  getAptHora() {
    return this.http.get<IAptHora[]>(this.url);
  }
}
