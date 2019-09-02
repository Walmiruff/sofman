import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Tab2FormPageModule } from './tab2-form/tab2-form.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { OrdemReducer } from './store/reducers/ordem.reducer';
import { OrdemEffects } from './store/effects/ordem.effects';
import { MaterialReducer } from './store/reducers/apontamento_de_materiais.reducer';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Tab2FormPageModule,
    IonicModule.forRoot(),
    StoreModule.forRoot({
      ordem: OrdemReducer,
      material: MaterialReducer
    }),
    EffectsModule.forRoot([
      OrdemEffects
    ]),
    StoreDevtoolsModule.instrument(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
