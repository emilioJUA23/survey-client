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
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True', 
      'Content-Type': 'application/json'});
    return this.http.post(this._baseURL + '/security/usuario', body,{headers : reqHeader});
  }

  userAuthentication(email, password) {
    var data = {email, password}
    console.log(data);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this._baseURL + '/security/login', data, { headers: reqHeader });
  }

  getUserClaims(){
   return  this.http.get(this._baseURL+'/api/GetUserClaims');
  }

}