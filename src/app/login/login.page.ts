import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  login;
  senha;
  form: FormGroup;
  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private fb: FormBuilder
  ) {}

  private url = environment.api + 'login.php'; //
  ngOnInit() {
    this.form = this.fb.group({
      login: [],
      senha: []
    });
  }

  postLogin(login, senha) {
    const data = {
      login,
      senha
    };
    const headers = new HttpHeaders();
    headers.set('Contetn-Type', 'application/json');
    const islogin = this.http.post(this.url, data, { headers });
    return islogin;
  }
  async doLogin() {
    // localStorage.setItem('login', this.form.value.login);
    // localStorage.setItem('senha', this.form.value.senha);

    let loading = await this.loadingCtrl.create({
      message: 'Aguarde estamos verificando suas credenciais...'
    });
    loading.present();
    this.postLogin(this.login, this.senha).subscribe(
      resp => {
        console.log('Resposta apos login -->', JSON.stringify(resp));
        localStorage.setItem('dadosUser', JSON.stringify(resp));
        loading.dismiss();
      },
      error => {
        console.log(error);
      }
    );
  }
}
