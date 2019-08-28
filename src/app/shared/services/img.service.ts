import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { IImg } from 'src/app/store/models/img.model';

@Injectable({
  providedIn: 'root'
})
export class ImgService {

  private url = environment.api + 'img/' ;

  constructor(private http: HttpClient) { }

  getImg() {
    return  this.http.get<IImg[]>(this.url);
   }
}
