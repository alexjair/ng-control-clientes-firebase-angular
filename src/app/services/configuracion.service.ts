import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';
import { Configuracion } from '../interfaces/configuracion';
import { Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  constructor(
    private db: AngularFirestore
  ) { }

  configuracionDoc!: AngularFirestoreDocument<Configuracion>; // Para recivir el elemento Obj de la BD
  configuracion!: Observable<Configuracion | undefined>;

  id = '3Bzl8kv9Uhjr1Cze67OV';

  sfunGetConfiguracion(): Observable<Configuracion | undefined>{
    this.configuracionDoc = this.db.doc<Configuracion>('configuracion/'+this.id);
    this.configuracion = this.configuracionDoc.valueChanges();
    console.log(this.configuracion);

    return this.configuracion;
  }

  sfunModificarconfiguracion(configuracion: Configuracion){
    console.log(configuracion);
    this.configuracionDoc = this.db.doc<Configuracion>('configuracion/'+this.id);

    this.configuracionDoc.update(configuracion);
  }

}
