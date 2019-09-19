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
  userLocation( data: any) {
    const id = this.firestore.createId();
    const authRef = this.firestore.collection('users')
    .doc(localStorage.getItem('uid')).collection('locationUser')
    return authRef.doc(localStorage.getItem('uid')).update({data});
  }

}
