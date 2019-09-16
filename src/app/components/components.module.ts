import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AssinaturaComponent } from './assinatura/assinatura.component';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SignaturePadModule],
  declarations: [AssinaturaComponent],

  exports: [AssinaturaComponent]
})
export class ComponentsModule {}
