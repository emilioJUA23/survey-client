import { Component, OnInit } from '@angular/core';
import { DataTablesResponseService } from '../../../../shared/data-tables-response/data-tables-response.service';
import { User } from '../../../../shared/user/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AppConstants } from '../../../../app.constants';


@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  isIndexError : boolean = false;
  users: User[];
  _pageLength : number;

  constructor(private dataTablesResponseService : DataTablesResponseService) { 
    this._pageLength = AppConstants.pageLength;
  }

  static selectOptions( id: any ) : string {
    return `<select class='form-control'>
      <a class="nav-link active" routerLink='#' routerLinkActive='active'>Ver/Editar</a>
    </select>`
  }


  ngOnInit(): void {
    const that = this;
   
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this._pageLength,
      serverSide: true,
      processing: true,
      ordering: false,
      searching: true,
      info: false,
      ajax: (dataTablesParameters: any, callback) => {
        this.dataTablesResponseService.getTable(dataTablesParameters, "/security/usuario/all")
          .subscribe((resp : any)=>{
            if (resp.ok) {
              that.users = resp.dataTablesResponse.data;
              callback({
                recordsTotal: resp.dataTablesResponse.recordsTotal,
                recordsFiltered: resp.dataTablesResponse.recordsFiltered,
                data: resp.dataTablesResponse.data
              });
            } else {
              this.isIndexError = true;
            }
        },
        (err : HttpErrorResponse)=>{
          this.isIndexError = true;
        });
      },
      columns: [
       { data: 'email' },
       { data: null, 
        render:( data, type, row ) =>{
          return `${data.primerNombre} ${data.segundoNombre} ${data.primerApellido} ${data.segundoApellido}`;
        }
       },
       { data: '_id', 
        render:( data, type, row ) =>{
          return UserIndexComponent.selectOptions(data);
        }
       }]
    }
  }
}