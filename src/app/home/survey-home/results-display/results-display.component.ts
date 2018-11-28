import { AfterViewInit, Component, OnInit, Renderer, ViewChild,ElementRef } from '@angular/core';
import {AppConstants} from '../../../app.constants';
import { LanguageDatatable} from '../../../language/language.datatable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AppUtils} from '../../../app.utils';

@Component({
  selector: 'app-results-display',
  templateUrl: './results-display.component.html',
  styleUrls: ['./results-display.component.css']
})
export class ResultsDisplayComponent implements AfterViewInit, OnInit {
  dtOptions: DataTables.Settings = {};
  dataDelete = {
    name: "",
    id: ""
  }  
_baseURL : string;
_pageLength : number;
instruments: any[] = [];
  constructor(private renderer: Renderer, private http: HttpClient,) { 
    this._baseURL = AppConstants.baseURL;
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
      searching: false,
      info: false,
      language: LanguageDatatable.getSpanish,
      ajax: (dataTablesParameters: any, callback) => {
        this.instruments = this.consult_surveys(dataTablesParameters.start, dataTablesParameters.length);
        callback({
          recordsTotal: this.instruments.length,
          recordsFiltered:  this.instruments.length,
          data: this.instruments
        });
      },
      columns: [
       { data: 'title', 
       render:( data, type, row ) =>{
        return data || "Encuesta sin nombre";
       }
      },
       { data: '_id', 
        render:( data, type, row ) =>{
         return `<button type="button" class="btn btn-primary"  data-id="${data}">Descargar</button>`;
        }
       }]
    }
  }
  ngAfterViewInit(): void {
    this.renderer.listenGlobal('document', 'click', (event) => {
      if (event.target.hasAttribute("data-id")) {
        let id = event.target.getAttribute("data-id");
        this.descargar(id);
      }
    });
  }

  
  consult_surveys(start, length){
    var req = new XMLHttpRequest();
    let  userToken =AppUtils.getLocal('userToken');
    req.open('GET', `${this._baseURL}/survey/instrument?desde=${start}&limite=${length}`, false);
    req.setRequestHeader("Authorization", userToken);
    req.send(null);
    if (req.status == 200)
    {
      var jsonArray = JSON.parse(req.responseText);
      return jsonArray;
    }
    else
    {
      console.log("no response");
      return [];
    }
  }

  
  descargar(id){
    const url = `${this._baseURL}/survey/results/${id}`;
    let  userToken =AppUtils.getLocal('userToken');
    var headers = new HttpHeaders({'Authorization': userToken });
    const options =  { headers: headers, responseType: 'blob' as 'json' }
    console.log(url);
    this.http.get(url, options).subscribe(res  => {
          AppUtils.saveFile(res, "ResultadosDeEncuesta.csv");
      });
    }
}
