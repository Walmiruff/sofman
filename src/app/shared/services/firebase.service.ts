import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public imgRef: any;
  public img: any;
  public imgUrl: any;
  public fileName: any;

  constructor(
    private firestore: AngularFirestore,
    private api: ApiService,
  ) {

  }


  // comando que vai determinar se os dados vao ser inseridos, atualizados ou deletados no banco
  crudFirebase(data: any, comand: string) {
    const loginuser = this.api.getCredentials().login;
    const authRef = this.firestore.collection('users').doc(loginuser);
    return authRef.collection(comand).add(data);
  }
  userLocation(geoPoint: any) {
    // Guarda dados de localizacao do usuario ( Falta colocar para enviar localizacao a cada 5 minutos..)
    const loginuser = this.api.getCredentials().login;
    if (loginuser) {
      const authRef = this.firestore.collection('users').doc(loginuser);
      return authRef.set({ geoPoint });
    }
  }
}
