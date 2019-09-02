import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  constructor(private firestore: AngularFirestore) { }

   // comando que vai determinar se os dados vao ser inseridos, atualizados ou deletados no banco
   crudFirebase(data: any, id: string, comand: string) {
   const authRef = this.firestore.collection('users').doc(localStorage.getItem('uid'));
   return  authRef.collection('ordem' + comand).add(data);
  }
 
}
