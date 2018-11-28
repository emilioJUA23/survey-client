import { AfterViewInit, Component, OnInit, Renderer, ViewChild,ElementRef } from '@angular/core';
import { DataTablesResponseService } from '../../../../shared/data-tables-response/data-tables-response.service';
import { User } from '../../../../shared/user/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AppConstants } from '../../../../app.constants';
import { Router } from '@angular/router';
import { UserService } from '../../../../shared/user/user.service';
import { LanguageDatatable} from '../../../../language/language.datatable';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements  AfterViewInit, OnInit {
  dtOptions: DataTables.Settings = {};
  isIndexError : boolean = false;
  users: User[];
  _pageLength : number;
  dataDelete={
    name : "",
    id: ""
  }
  @ViewChild('btnClose') btnClose : ElementRef;

  constructor(private userService: UserService, private dataTablesResponseService : DataTablesResponseService,private renderer: Renderer, private router: Router) { 
    this._pageLength = AppConstants.pageLength;
  }

  ngOnInit(): void {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this._pageLength,
      serverSide: true,
      processing: true,
      ordering: false,
      searching: false,
      info: false,
      language: LanguageDatatable.getSpanish,
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
          return `${data.primerNombre} ${data.segundoNombre ||""} ${data.primerApellido} ${data.segundoApellido||""}`;
        }
       },       
       { data: '_id', 
       render:( data, type, row ) =>{
        return `<button type="button" class="btn btn-primary"  data-id="${data}" data-action="ver">Ver/Actualizar</button>`;
       }
      },   
      { data: null, 
        render:( data, type, row ) =>{
         return `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-id="${row._id}" data-action="eliminar" data-delete-name="${data.primerNombre} ${data.segundoNombre ||""} ${data.primerApellido} ${data.segundoApellido||""}">Eliminar</button>`;
        }
       }]
    }
  }

  ngAfterViewInit(): void {
    this.renderer.listenGlobal('document', 'click', (event) => {
      if (event.target.hasAttribute("data-action")) {
        let _action = event.target.getAttribute("data-action");
        if (_action === "ver")
        {
          this.router.navigate(["/user/" + event.target.getAttribute("data-id")]);
        }
        else
        {
          this.dataDelete.id = event.target.getAttribute("data-id");
          this.dataDelete.name = event.target.getAttribute("data-delete-name");
        }
      }
    });
  }

  deleteUser(): void{
    this.userService.deleteUser(this.dataDelete.id)
    .subscribe((resp : any)=>{
      if (resp.ok) {
        this.btnClose.nativeElement.click();
        window.location.reload(); 
      } else {
        this.isIndexError = true;
      }
  },
  (err : HttpErrorResponse)=>{
    this.isIndexError = true;
  });
  }
}