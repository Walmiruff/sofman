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


import { environment } from '../environments/environment';

import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { OrdemReducer } from './store/reducers/ordem.reducer';
import { MaterialReducer } from './store/reducers/apontamento_de_materiais.reducer';
import { HoraReducer } from './store/reducers/apontamento_de_horas.reducer';
import { TarefaReducer } from './store/reducers/tarefas.reducer';

import { OrdemEffects } from './store/effects/ordem.effects';
import { MaterialEffects } from './store/effects/apontamento_de_materiais.effects';
import { HoraEffects } from './store/effects/apontamento_de_horas.effects';
import { TarefaEffects } from './store/effects/tarefas.effects';

import { Tab2FormPageModule } from './tab2-form/tab2-form.module';
import { Tab2FormAptMatPageModule } from './tab2-form-apt-mat/tab2-form-apt-mat.module';
import { Tab2FormAptHoraPageModule } from './tab2-form-apt-hora/tab2-form-apt-hora.module';
import { Tab2FormTarefaPageModule } from './tab2-form-tarefa/tab2-form-tarefa.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Tab2FormPageModule,
    Tab2FormAptMatPageModule,
    Tab2FormAptHoraPageModule,
    Tab2FormTarefaPageModule,
    IonicModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    StoreModule.forRoot({
      ordem: OrdemReducer,
      material: MaterialReducer,
      hora: HoraReducer,
      tarefa: TarefaReducer
    }),
    EffectsModule.forRoot([
      OrdemEffects,
      MaterialEffects,
      HoraEffects,
      TarefaEffects
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
