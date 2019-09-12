import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoadingController, Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  public lat;
  public long;

  login;
  senha;
  form: FormGroup;
  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private geolocation: Geolocation,
    private platform: Platform
  ) {
    if (platform.is('cordova')) {
      this.initLocation(this.lat, this.long);
    }
  }

  private url = environment.api + 'login.php'; //
  ngOnInit() {
    if (this.lat !== null && this.long !== null) {
      this.form = this.fb.group({
        login: [],
        senha: [],
        lat: this.lat,
        long: this.long
      });
    }
  }

  async postLogin(login, senha) {
    const data = {
      login,
      senha,
      lat: this.lat,
      long: this.long
    };
    const headers = new HttpHeaders();
    headers.set('Contetn-Type', 'application/json');
    const islogin = this.http.post(this.url, data, { headers });
    return islogin;
  }
  async doLogin() {
    this.postLogin(this.login, this.senha).then(res => {
      alert(JSON.stringify(res));
    });
    // localStorage.setItem('login', this.form.value.login);
    // localStorage.setItem('senha', this.form.value.senha);
    // let loading = await this.loadingCtrl.create({
    //   message: 'Aguarde estamos verificando suas credenciais...'
    // });
    // loading.present();
    // this.postLogin(this.login, this.senha).subscribe(
    //   resp => {
    //     console.log('Resposta apos login -->', JSON.stringify(resp));
    //     localStorage.setItem('dadosUser', JSON.stringify(resp));
    //     loading.dismiss();
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
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
