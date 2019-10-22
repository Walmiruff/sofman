import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlLogin = environment.api + 'users/autentication';

  public url: string = environment.api;
  public header;
  constructor(public http: HttpClient) {  }
 
  postLogin(body: any, reqOpts?: any) {
    this.header = new HttpHeaders();
    this.header.append('Access-Control-Allow-Origin', '*');
    this.header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    this.header.append('Accept', 'application/json');
    this.header.append('Content-Type', 'application/json');
    return this.http.post(this.urlLogin, body, {
      headers: this.header
    });
  }

  getJson(url) {
    return this.http.get(url);
  }

  setCredentials(id, login: string, nome: string, email: string, blocked: string, tipoacesso) {
    localStorage.setItem('id', id);
    localStorage.setItem('login', login);
    localStorage.setItem('nome', nome);
    localStorage.setItem('email', email);
    localStorage.setItem('blocked', blocked);
    localStorage.setItem('tipoacesso', tipoacesso);

  }

  public getCredentials() {
    return {
      iduser: localStorage.getItem('id'),
      login: localStorage.getItem('login'),
      name: localStorage.getItem('nome'),
      email: localStorage.getItem('email'),
      pass: localStorage.getItem('pass'),
      blocked: localStorage.getItem('blocked'),
      tipoacesso: localStorage.getItem('tipoacesso'),
    };
  }
  // https://newsapi.org/v2/top-headlines?sources=google-news-br&apiKey=527661c783af4453a88acbceeddb0c56

  // Exemples
  getAllComunicados() {
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=google-news-br&apiKey=527661c783af4453a88acbceeddb0c56');
  }
}
