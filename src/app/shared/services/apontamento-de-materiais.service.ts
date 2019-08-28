import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { IAptMaterial } from 'src/app/store/models/apt_material.model';

@Injectable({
  providedIn: 'root'
})
export class ApontamentoDeMateriaisService {

  private url = environment.api + 'apontamento_de_materiais/' ;

  constructor(private http: HttpClient) { }

  getAptMaterial() {
    return  this.http.get<IAptMaterial[]>(this.url);
   }
}
