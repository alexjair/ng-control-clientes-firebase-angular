import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';
import { Cliente } from '../interfaces/cliente';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(
    private db: AngularFirestore
  ) {
    this.clienteColeccion = db.collection('clientes', ref => ref.orderBy('nombre','asc'));
  }

  clienteColeccion!: AngularFirestoreCollection<Cliente>;
  clienteDoc!: AngularFirestoreDocument<Cliente>; // Para recivir el elemento Obj de la BD
  clientes!: Observable<Cliente[]>;
  cliente!: Observable<Cliente | null>;

  funEliminarCliente(id: string){
    this.clienteDoc = this.db.doc('clientes/'+id);
    this.clienteDoc.delete();
  }

  funModificarCliente(cliente: Cliente){
    this.clienteDoc = this.db.doc('clientes/'+cliente.id);
    this.clienteDoc.update(cliente);
  }

  genCliente(id: string): Observable<Cliente | null>{
    this.clienteDoc = this.db.doc<Cliente>('clientes/'+id);
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map( accion =>{
        if(accion.payload.exists == false){
          //const dt: Cliente;
          return null;
        }else{
          const datos = accion.payload.data() as Cliente;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.cliente;
  }

  funAgregarCliente(cliente: Cliente){
    this.clienteColeccion.add(cliente);
  }

  getClientes(): Observable<Cliente[]>{
    this.clientes = this.clienteColeccion.snapshotChanges().pipe(
      map( cambios => {
        return cambios.map( accion =>{
          const datos = accion.payload.doc.data() as Cliente;
          datos.id = accion.payload.doc.id;
          return datos;
        })
      })
    );
      return this.clientes;
  }
}
