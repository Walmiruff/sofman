import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../shared/services/message.service';
import { ApiService } from './../shared/services/api.service';
import { FirebaseService } from '../shared/services/firebase.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  private url = 'https://posts.vix.br/apisoftman/login.php'; //
  // private apilogin = 'https://posts.vix.br/apisoftman/login.php'; //

  public lat;
  public long;
  user: any;
  authorization: any;

  public type = 'password';
  public showPass = false;
  public loading;
  public headers;
  form: FormGroup;
  constructor(
    private http: HttpClient,

    private formBuilder: FormBuilder,
    private navctrl: NavController,
    public api: ApiService,
    public message: MessageService,
    // private platform: Platform,
    // private geolocation: Geolocation,
    // private firebaseservice: FirebaseService
  ) {
    /** Fixar login usuario para envio de post... */
   this.user = this.api.getCredentials().login;
   this.authorization = this.api.getCredentials().authorization;

    this.form = this.formBuilder.group({
      login: [''],
      senha: ['']
    });
  }

  ngOnInit() {

  }

  login() {
    const headers = new HttpHeaders();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');

    const data = {
      login: this.form.value.login,
      senha: this.form.value.senha
    };
    this.message.showLoading('Verificando dados...', 'loading-login');
    this.http.post(this.url, data, { headers }).subscribe(
      (resp: any) => {
        console.log(resp);
        if (resp.login) {
          const user = resp;

          this.api.setCredentials(user.id, user.login, user.nome, user.email, this.form.value.senha);
          setTimeout(() => {
            this.navctrl.navigateForward('tabs/tab1');
            this.message.hideLoading('loading-login');
          }, 2500);
        } else if (resp.message !== 'sucesso') {
          this.message.hideLoading('loading-login');
          this.message.alerts('Atenção', 'Ocorreu um erro ao efetuar login', 'OK');
        }
      },
      err => {
        console.log(err);
        this.message.alerts('Atenção', 'Ocorreu um erro ao efetuar login', 'OK');
        this.message.hideLoading('loading-login');
        return;
      }
    );

  }

  showPassword() {
    this.showPass = !this.showPass;

    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  /** Funcao geolocation */
  // async initLocation() {
  //   try {
  //     await this.geolocation
  //       .getCurrentPosition()
  //       .then(resp => {

  //         this.lat = resp.coords.latitude;
  //         this.long = resp.coords.longitude;
  //         const geoLocationUser = {
  //           lat: this.lat,
  //           long: this.long
  //         };

  //         this.firebaseservice.userLocation(resp.coords).then(res => {
  //           alert('Gravando dados firebase' + res);
  //         }).catch(e => alert('Erro ao gravar dados.. Location firebase' + e));

  //         alert('Localizacao JSON' + JSON.stringify(geoLocationUser));
  //       })
  //       .catch(e => console.log('Erro ao pegar localizacao ' + e));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
