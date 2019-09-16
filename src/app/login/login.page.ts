import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Platform, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MessageService } from '../shared/services/message.service';
import { ApiService } from './../shared/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  private url = environment.api + 'login.php'; //
  public lat;
  public long;

  public type = 'password';
  public showPass = false;
  public loading;
  public headers;
  form: FormGroup;
  constructor(
    private http: HttpClient,

    private formBuilder: FormBuilder,
    private geolocation: Geolocation,
    private platform: Platform,
    private navctrl: NavController,
    private api: ApiService,
    public message: MessageService
  ) {
    if (platform.is('cordova')) {
      this.initLocation(this.lat, this.long);
    }
    this.form = this.formBuilder.group({
      login: [''],
      senha: ['']
    });
  }

  ngOnInit() {
    if (this.api.getCredentials().login) {
      this.navctrl.navigateForward('tabs/tab1');
    } else {
      return;
    }
  }
  async login() {
    const headers = new HttpHeaders();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    try {
      const data = {
        login: this.form.value.login,
        senha: this.form.value.senha
      };
      await this.message.showLoading('Verificando dados...', 'loading-login');
      this.http.post(this.url, data, { headers }).subscribe(
        (resp: any) => {
          if (resp.login) {
            const user = resp;
            this.api.setCredentials(user.id, user.login, user.nome, user.email);
            this.message.hideLoading('loading-login');
            setTimeout(() => {
              this.navctrl.navigateForward('tabs/tab1');
            }, 100);
          }
        },
        err => {
          this.message.hideLoading('loading-login');
          this.message.alert('Atenção', 'Ocorreu um erro ao efetuar login', 'OK');
          return;
        }
      );
    } catch (error) {}
  }

  async logar() {
    const headers = new HttpHeaders();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');

    const data = {
      login: this.form.value.login,
      senha: this.form.value.senha
    };

    await this.message.showLoading('Verificando dados...', 'loading-login');

    this.http.post(this.url, data, { headers }).subscribe(
      (res: any) => {
        console.log(res);
        if (res.id !== 0) {
          setTimeout(() => {
            this.navctrl.navigateForward('tabs/tab1');
          }, 100);
        } else {
          this.message.hideLoading('loading-login');
          this.message.alert('Atenção', 'Ocorreu um erro ao efetuar login', 'OK');
          return;
        }
        this.message.hideLoading('loading-login');
      },
      erro => {
        console.log(erro);
        this.message.alert('Atenção', 'Ocorreu um erro ao efetuar login', 'OK');
        this.message.hideLoading('loading-login');
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
  async initLocation(lat, long) {
    try {
      await this.geolocation
        .getCurrentPosition()
        .then(resp => {
          this.lat = resp.coords.latitude;
          this.long = resp.coords.longitude;
          const geoLocationUser = {
            lat: this.lat,
            long: this.long
          };
          alert('Localizacao JSON' + JSON.stringify(geoLocationUser));
        })
        .catch(e => console.log('Erro ao pegar localizacao ' + e));
    } catch (error) {
      console.log(error);
    }
  }
}
