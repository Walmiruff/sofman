import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../shared/services/message.service';
import { ApiService } from './../shared/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  private url = 'https://posts.vix.br/apisoftman/login.php'; //
  // private apilogin = 'https://posts.vix.br/apisoftman/login.php'; //

  /**
  Qr code, leitura
  start atraves do qr code .

  0 / nao gera ordem de servico.  / Pode solicatacaoi
  1 / pode gera ordem de servico e gera solicitacoa ( toltal)
  2 / nao pode fazer solicitacao / Pode gera ordem de serco

   */
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
    public message: MessageService
  ) {
    this.form = this.formBuilder.group({
      login: [''],
      senha: ['']
    });
  }

  async ngOnInit() {
    /** Fixar login usuario para envio de post... */
    const load = await this.message.loading();
    this.user = this.api.getCredentials().login;
    this.authorization = this.api.getCredentials().authorization;

    if (this.user) {
     // this.login();
      this.navctrl.navigateRoot(['/tabs/tab1']);
    }
    load.dismiss();
  }

  async login() {
    const headers = new HttpHeaders();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');

    const data = {
      login: this.form.value.login,
      senha: this.form.value.senha
    };
    const loading = await this.message.loading({
      message: 'Verificando dados...',
      spinner: 'lines-small'
    });
    this.http.post(this.url, data, { headers }).subscribe(
      (resp: any) => {
        console.log(resp);
        if (resp.login) {
          const user = resp;

          this.api.setCredentials(
            user.id,
            user.login,
            user.nome,
            user.email,
            this.form.value.senha,
            user.tipo_acesso
          );
          setTimeout(() => {
            this.navctrl.navigateForward('tabs/tab1');
            loading.dismiss();
          }, 2500);
        } else if (resp.message !== 'sucesso') {
          loading.dismiss();
          const alerta = this.message.alert({
            header: 'Atenção!',
            message: 'Ocorreu um erro ao efeturar login.',
            buttons: [{ text: 'OK' }]
          });
        }
      },
      err => {
        console.log(err);
        const alerta = this.message.alert({
          header: 'Atenção!',
          message: 'Ocorreu um erro ao efeturar login.',
          buttons: [{ text: 'OK' }]
        });
        loading.dismiss();
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
}
