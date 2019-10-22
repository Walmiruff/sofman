import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';

import { Events } from '@ionic/angular';

export enum ConnectionStatus {
  Online,
  Offline
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  previousStatus;
  constructor(
    public eventsCtrl: Events,
    public network: Network,
     ) {
    this.previousStatus = ConnectionStatus.Online;
  }
  public initializeNetworkEvents(): void {
    /* OFFLINE */
    this.network.onDisconnect().subscribe(() => {
      if (this.previousStatus === ConnectionStatus.Online) {
       
        this.eventsCtrl.publish('network:offline');
      }
      this.previousStatus = ConnectionStatus.Offline;
    });

    /* ONLINE */
    this.network.onConnect().subscribe(() => {
      setTimeout(() => {
        if (this.previousStatus === ConnectionStatus.Offline) {
          this.eventsCtrl.publish('network:online');
        }
        this.previousStatus = ConnectionStatus.Online;
      }, 3000);
    });
  }
}
