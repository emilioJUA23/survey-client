import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppUtils } from '../../app.utils';
import{ AppConstants} from '../../app.constants';


@Injectable()
export class ViewService {
  _baseURL : string;

  constructor(private http: HttpClient) {
    this._baseURL = AppConstants.baseURL;
   }

   getViewTree(){
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'true' });
    return  this.http.get(this._baseURL+ `/security/vista/tree`,{ headers: reqHeader });
   }

}