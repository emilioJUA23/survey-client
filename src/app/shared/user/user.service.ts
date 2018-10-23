import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
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
      password: AppConstants.hash(user.password),
      _id: ""
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True', 
      'Content-Type': 'application/json'});
    return this.http.post(this._baseURL + '/security/usuario', body,{headers : reqHeader});
  }

  userAuthentication(email, password) {
    password = AppConstants.hash(password);
    var data = {email, password};
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this._baseURL + '/security/login', data, { headers: reqHeader });
  }

  updateUserRoles(userID, push, pull){
    var data = {push, pull};
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this._baseURL + `/security/usuario/${userID}`, data, { headers: reqHeader });
  }

deleteUser(userID){
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    data = {};
    return this.http.delete(this._baseURL + `/security/usuario/${userID}`, data, { headers: reqHeader });
  }

deleteUser(userID){
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    data = {};
    return this.http.delete(this._baseURL + `/security/usuario/${userID}`, data, { headers: reqHeader });
  }

  getUserClaims(){
   return  this.http.get(this._baseURL+'/api/GetUserClaims');
  }

}