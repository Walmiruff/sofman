import { Component } from '@angular/core';
import { ApiService } from './../shared/services/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    loop: true
  };

public nome = '';
public logincliente = '';
public cominicados = [];

  constructor( public api: ApiService ) {
    this.nome = api.getCredentials().name;
    this.logincliente = api.getCredentials().login;
    this.api.getAllComunicados().subscribe((data:any)=>{
      this.cominicados = data.articles;
      console.log(this.cominicados)
    })
  }


}
