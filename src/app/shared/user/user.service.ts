import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { AppUtils } from '../../app.utils';
import{ AppConstants} from '../../app.constants';


@Injectable()
export class UserService {
  _baseURL : string;

  constructor(private http: HttpClient) {
    this._baseURL = AppConstants.baseURL;
   }

  registerUser(user: User) {
    const body: User = {
      primerNombre: user.primerNombre,
      segundoNombre: user.segundoNombre,
      primerApellido: user.primerApellido,
      segundoApellido: user.segundoApellido,
      email: user.email,
      password: AppUtils.hash(user.password),
      _id: "",
      roles: []
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True', 
      'Content-Type': 'application/json'});
    return this.http.post(this._baseURL + '/security/usuario', body,{headers : reqHeader});
  }

  userAuthentication(email, password) {
    password = AppUtils.hash(password);
    var data = {email, password};
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this._baseURL + '/security/login', data, { headers: reqHeader });
  }

  updateUserRoles(user: User, pull){
    const body: User = {
      primerNombre: user.primerNombre,
      segundoNombre: user.segundoNombre,
      primerApellido: user.primerApellido,
      segundoApellido: user.segundoApellido,
      email: user.email,
      password: AppUtils.hash(user.password),
      _id:user._id,
      roles: user.roles
    }
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this._baseURL + `/security/usuario/${user._id}`, body, { headers: reqHeader });
  }

deleteUser(userID){
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    let data = {};
    return this.http.delete(this._baseURL + `/security/usuario/${userID}`, data, { headers: reqHeader });
  }

resetPassword(userID, password){
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    let data = {password:  AppUtils.hash(password)};
    return this.http.delete(this._baseURL + `/security/usuario/${userID}`, data, { headers: reqHeader });
  }

recoverpassword(email)
{
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    let data = {email};
    return this.http.delete(this._baseURL + `/security/recoverpassword`, data, { headers: reqHeader });
}

viewmatch(view){
   return  this.http.get(this._baseURL+ `/security/usuario/viewmatch/${view}`);
  }

}