import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-assinatura',
  templateUrl: './assinatura.component.html',
  styleUrls: ['./assinatura.component.css']
})
export class AssinaturaComponent implements OnInit {
  @ViewChild(SignaturePad, { static: true }) signaturePad: SignaturePad;

  signature = '';
  isDrawing = false;

  public signaturePadOptions: Object = {
    // Check out https://github.com/szimek/signature_pad
    minWidth: 2,
    canvasWidth: 400,
    canvasHeight: 200,
    backgroundColor: '#f6fbff',
    penColor: '#666a73'
  };

  constructor() {}

  ngOnInit() {}
  // drawComplete() {
  //   this.isDrawing = false;
  // }

  // drawStart() {
  //   this.isDrawing = true;
  // }

  // savePad() {
  //   this.signature = this.signaturePad.toDataURL();
  //   localStorage.setItem('savedSignature', this.signature);
  //   this.signaturePad.clear();
  //   // let toast = this.toastCtrl.create({
  //   //   message: 'New Signature saved.',
  //   //   duration: 3000
  //   // });
  //   // toast.present();
  // }

  // clearPad() {
  //   this.signaturePad.clear();
  // }
}
