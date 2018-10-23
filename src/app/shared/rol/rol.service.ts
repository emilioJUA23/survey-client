import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rol } from './rol.model';
import { AppUtils } from '../../app.utils';
import{ AppConstants} from '../../app.constants';

@Injectable()
export class RolService {
  _baseURL : string;

  constructor(private http: HttpClient) {
    this._baseURL = AppConstants.baseURL;
   }
  createRol(rol: Rol) {
    const body: Rol = {
      nombre: rol.nombre,
      descripcion: rol.descripcion,
      fechaDeIngreso: new Date(),
      usuarioDeIngreso: localStorage.getItem('userData'),
      fechaDeActualizacion: null,
      usuarioDeActualizacion: null,
      vistas: [],
      _id: ""
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True', 
      'Content-Type': 'application/json'});
    return this.http.post(this._baseURL + '/api/v1/security/rol', body,{headers : reqHeader});
  }

    updateRol(rol: Rol) {
    const body: Rol = {
      nombre: rol.nombre,
      descripcion: rol.descripcion,
      fechaDeIngreso: rol.fechaDeIngreso,
      usuarioDeIngreso: rol.usuarioDeIngreso,
      fechaDeActualizacion: new Date(),
      usuarioDeActualizacion: AppUtils.getLocal("userData")._id,
      vistas: [],
      _id: rol._id
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True', 
      'Content-Type': 'application/json'});
    return this.http.put(this._baseURL +  `/api/v1/security/rol/${rol._id}`, body,{headers : reqHeader});
  }

    deleteRol(idRol:number) {
    var reqHeader = new HttpHeaders({'No-Auth':'True', 
      'Content-Type': 'application/json'});
    const body ={};
    return this.http.delete(this._baseURL +  `/api/v1/security/rol/${idRol}`, body,{headers : reqHeader});
  }

  getRol(){
    
  }
}