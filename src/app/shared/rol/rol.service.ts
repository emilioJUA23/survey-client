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
      vistas: rol.vistas,
      _id: ""
    }
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'true' });
    return this.http.post(this._baseURL + '/security/rol', body,{headers : reqHeader});
  }

    updateRol(rol: Rol) {
    const body: Rol = {
      nombre: rol.nombre,
      descripcion: rol.descripcion,
      fechaDeIngreso: rol.fechaDeIngreso,
      usuarioDeIngreso: rol.usuarioDeIngreso,
      fechaDeActualizacion: new Date(),
      usuarioDeActualizacion: AppUtils.getLocal("userData")._id,
      vistas: rol.vistas,
      _id: rol._id
    }
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'true' });
    return this.http.put(this._baseURL +  `/security/rol/${rol._id}`, body,{headers : reqHeader});
  }

    deleteRol(idRol:string) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'true' });
    return this.http.delete(this._baseURL +  `/security/rol/${idRol}`,{headers : reqHeader});
  }

  getRol(userRol){
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'true' });
    return  this.http.get(this._baseURL+ `/security/rol/${userRol}`,{headers : reqHeader});
  }
  
  getAll(){
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'true' });
    return  this.http.get(this._baseURL+ `/security/rol/all`,{headers : reqHeader});
  }
}