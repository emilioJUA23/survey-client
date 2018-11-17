import { AfterViewInit, Component, OnInit, Renderer, ViewChild,ElementRef } from '@angular/core';
import { DataTablesResponseService } from '../../../../shared/data-tables-response/data-tables-response.service';
import { Rol } from '../../../../shared/rol/rol.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AppConstants } from '../../../../app.constants';
import { Router } from '@angular/router';
import { RolService } from '../../../../shared/rol/rol.service';

@Component({
  selector: 'app-rol-index',
  templateUrl: './rol-index.component.html',
  styleUrls: ['./rol-index.component.css']
})
export class RolIndexComponent implements  AfterViewInit, OnInit {
  @ViewChild('btnClose') btnClose : ElementRef;
  dtOptions: DataTables.Settings = {};
  isIndexError : boolean = false;
  roles: Rol[];
  _pageLength : number;
  dataDelete={
    name : "",
    id: ""
  }
  
  constructor(private rolService:RolService,private dataTablesResponseService : DataTablesResponseService,private renderer: Renderer, private router: Router) { 
    this._pageLength = AppConstants.pageLength;
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
         return `<button type="button" class="btn btn-primary"  data-id="${data}" data-action="ver">Ver/Actualizar</button>`;
        }
       },{ 
       render:( data, type, row ) =>{
        return `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-id="${row._id}" data-action="eliminar" data-delete-name="${row.nombre}">Eliminar</button>`;
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
          this.router.navigate(["/rol/" + event.target.getAttribute("data-id")]);
        }
        else
        {
          this.dataDelete.id = event.target.getAttribute("data-id");
          this.dataDelete.name = event.target.getAttribute("data-delete-name");
        }
      }
    });
  }

  deleteRol(): void{
    this.rolService.deleteRol(this.dataDelete.id)
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
