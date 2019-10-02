import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-asscliente',
  templateUrl: './asscliente.page.html',
  styleUrls: ['./asscliente.page.scss'],
})
export class AssclientePage implements OnInit {
  @ViewChild('Assfuncionario', { static: true }) public assfunc: SignaturePad;
  @ViewChild('Assinaturacliente', { static: true }) public assclient: SignaturePad;

  public assinaturafuncbase64: string;
  public assinaturaclientebase64: string;
  public showAssinatura = true;

  public signaturefuncionario = '';
  public signaturecliente = '';

  public isDrawing = false;
  public title = 'Adicionar nova Ordem';



  public signaturePadOptions: Object = {

    minWidth: 2,
   // canvasWidth: 'auto',
    canvasHeight: 100,
    backgroundColor: '#f6fbff',
    penColor: '#000000'
  };



  constructor() { }

  ngOnInit() {
  }
  drawCompleteClient() {
    this.isDrawing = false;
  }

  drawStartClient() {
    this.isDrawing = true;
  }
  async savePadClient() {
    const ac = await this.assclient.toDataURL();
    this.signaturecliente = ac;


    this.assclient.clear();
    // let toast = this.toastCtrl.create({
    //   message: 'New Signature saved.',
    //   duration: 3000
    // });
    // toast.present();
  }
  async clearPadClient() {
    this.assclient.clear();
  }
}
