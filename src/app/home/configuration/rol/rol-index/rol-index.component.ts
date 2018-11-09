import { Component, OnInit } from '@angular/core';
import { DataTablesResponseService } from '../../../../shared/data-tables-response/data-tables-response.service';
import { Rol } from '../../../../shared/rol/rol.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AppConstants } from '../../../../app.constants';

@Component({
  selector: 'app-rol-index',
  templateUrl: './rol-index.component.html',
  styleUrls: ['./rol-index.component.css']
})
export class RolIndexComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  isIndexError : boolean = false;
  roles: Rol[];
  _pageLength : number;
  
  constructor(private dataTablesResponseService : DataTablesResponseService) { 
    this._pageLength = AppConstants.pageLength;
  }

  selectOptions( id: any ) : string {
    return `<select class='form-control'>
      <a class="nav-link active" routerLink='#' routerLinkActive='active'>Ver/Editar</a>
    </select>`
  }

  ngOnInit() {
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
        this.dataTablesResponseService.getTable(dataTablesParameters, "/security/rol/all")
          .subscribe((resp : any)=>{
            if (resp.ok) {
              that.roles = resp.dataTablesResponse.data;
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
       { data: 'nombre' },
       { data: 'descripcion' },
       { data: '_id', 
        render:( data, type, row ) =>{
          return this.selectOptions(data);
        }
       }]
    }
  }

}
