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
   return  authRef.collection(comand).add(data);
  }
  userLocation( path: string, data: any) {
    const authRef = this.firestore.collection('users')
    .doc(localStorage.getItem('uid'))
    return authRef.collection(path).doc(`${this.firestore.createId}`).update(data)
  }

}
