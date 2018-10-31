import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{ AppConstants} from '../../app.constants';

@Injectable()
export class DataTablesResponseService {
  _baseURL : string;

  constructor(private http: HttpClient) {
    this._baseURL = AppConstants.baseURL;
   }

  getTable(dataTablesParameters, controller){
    console.log(dataTablesParameters);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'true' });
    return this.http.post(this._baseURL + controller, dataTablesParameters,{headers : reqHeader});
  }
}