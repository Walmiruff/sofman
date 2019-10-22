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

  /*
  Qr code, leitura
  start atraves do qr code .
  0  nao gera ordem de servico.  / Pode solicatacaoi
  1  pode gera ordem de servico e gera solicitacoa ( toltal)
  2  nao pode fazer solicitacao / Pode gera ordem de serco
   */
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
    private navctrl: NavController,
    public api: ApiService,
    public message: MessageService
  ) {
    this.form = this.formBuilder.group({
      usuario: [''],
      senha: ['']
    });
  }

  async ngOnInit() {
    /** Fixar login usuario para envio de post... */
    const user = localStorage.getItem('login');
    if (user) {
          this.navctrl.navigateRoot(['/tabs/tab1']);
    }
  }

  async login(value: any) {
    if (this.form.valid) {
      const body = value;
      console.log(body);

      const loading = await this.message.loading({
        message: 'Verificando dados...',
        spinner: 'lines-small'
      });
      try {
          this.api.postLogin(body).subscribe((data: any ) => {
            console.log(`Apos login Retorno `+ JSON.stringify(data));
            if (data.status == false) {
              console.log(data.error);
              loading.dismiss();
              const alerta = this.message.alert({
                        header: 'Atenção!',
                        message: 'Ocorreu um erro ao efeturar login.',
                        buttons: [{ text: 'OK' }]
                      });

            } else {
          const user = data.response;
          this.api.setCredentials(
            user.id,
            user.login,
            user.nome,
            user.email,
            user.block,
            user.tipo_acesso
          );
          setTimeout(() => {
            this.navctrl.navigateRoot('tabs/tab1');
            loading.dismiss();
          }, 2500);

        }}, err => console.log('Erro ao logar', err));
      } catch (error) {
        console.log(error);
      }  
    }

    // this.http.post(this.url, data, { headers }).subscribe(
    //   (resp: any) => {
    //     console.log(data)
    //     console.log('retorno apos login', resp);
    //     if (resp.login) {
    //       const user = resp;
    //       this.api.setCredentials(
    //         user.id,
    //         user.login,
    //         user.nome,
    //         user.email,
    //         this.form.value.senha,
    //         user.tipo_acesso
    //       );
    //       setTimeout(() => {
    //         this.navctrl.navigateRoot('tabs/tab1');
    //         loading.dismiss();
    //       }, 2500);
    //     } else if (resp.message !== 'sucesso') {
    //       loading.dismiss();
    //       const alerta = this.message.alert({
    //         header: 'Atenção!',
    //         message: 'Ocorreu um erro ao efeturar login.',
    //         buttons: [{ text: 'OK' }]
    //       });
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //     const alerta = this.message.alert({
    //       header: 'Atenção!',
    //       message: 'Ocorreu um erro ao efeturar login.',
    //       buttons: [{ text: 'OK' }]
    //     });
    //     loading.dismiss();
    //     return;
    //   }
    // );
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
