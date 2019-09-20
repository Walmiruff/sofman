import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  // comando que vai determinar se os dados vao ser inseridos, atualizados ou deletados no banco
  crudFirebase(data: any, comand: string) {
    const authRef = this.firestore.collection('users').doc(localStorage.getItem('uid'));
    return authRef.collection(comand).add(data);
  }
  userLocation(geoPoint: any) {
    // Guarda dados de localizacao do usuario
    const iduser = localStorage.getItem('uid');
    if (iduser) {
      const authRef = this.firestore.collection('users').doc(iduser);
      return authRef.set({ geoPoint });
    }

  }

}
