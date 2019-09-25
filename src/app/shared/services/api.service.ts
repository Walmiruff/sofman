import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url: string = environment.api;
  public header;
  constructor(public http: HttpClient) {}

  login(endpoint: string, body: any) {
    const headers = new HttpHeaders();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');

    return this.http.post(this.url + endpoint + body, { headers });
  }

  getJson(url) {
    return this.http.get(url);
  }

  setCredentials(id, login: string, nome: string, email: string, authorization: string, tipoacesso) {
    localStorage.setItem('id', id);
    localStorage.setItem('login', login);
    localStorage.setItem('nome', nome);
    localStorage.setItem('email', email);
    localStorage.setItem('authorization', authorization);
    localStorage.setItem('tipoacesso', tipoacesso);

  }

  getCredentials() {
    return {
      iduser: localStorage.getItem('id'),
      login: localStorage.getItem('login'),
      name: localStorage.getItem('nome'),
      email: localStorage.getItem('email'),
      pass: localStorage.getItem('pass'),
      authorization: localStorage.getItem('authorization'),
      tipoacesso: localStorage.getItem('tipoacesso'),
    };
  }
  // https://newsapi.org/v2/top-headlines?sources=google-news-br&apiKey=527661c783af4453a88acbceeddb0c56

  // Exemples
  getAllComunicados(){
   return this.http.get('https://newsapi.org/v2/top-headlines?sources=google-news-br&apiKey=527661c783af4453a88acbceeddb0c56');
  }
}
