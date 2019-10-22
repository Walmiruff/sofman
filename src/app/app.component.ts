import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MessageService } from './shared/services/message.service';
import { NetworkService } from './shared/services/network.service';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public lat;
  public long;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private geolocation: Geolocation,
    private messageservice: MessageService,
    private networkservice: NetworkService,
    private network: Network,
    public events: Events
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.networkCheck();
      /**  Verificando se o dispositivo é nativo */
      if (this.platform.is('cordova')) {
        this.geolocation.getCurrentPosition().then();
      }

      this.statusBar.styleBlackOpaque();
      this.splashScreen.hide();
    });
  }
  async networkCheck() {
    /* Check networkStatus */
    this.networkservice.initializeNetworkEvents();
    this.events.subscribe('network:offline', async () => {
      await this.messageservice.toast({
        mode: 'md',
        message: 'Conecte á internet...',
        duration: 5000,
        position: 'top'
      });
      localStorage.setItem('network', '0');
    });
    // Online Envets
    this.events.subscribe('network:online', async () => {
      localStorage.setItem('network', '1');
      await this.messageservice.toast({
        mode: 'md',
        position: 'top',
        message: `Sua conexão parace que voltou.. ${this.network.type}`,
        duration: 580
      });
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });
}
}
