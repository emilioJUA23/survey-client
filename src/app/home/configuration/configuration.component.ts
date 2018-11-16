import { Component, OnInit } from '@angular/core';
import { AppUtils } from '../../app.utils';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  showUsuario:boolean;
  showRoles:boolean;
  showVista:boolean;

  constructor() { 
    this.showUsuario = AppUtils.matchView("USER-INDEX");
    this.showRoles = AppUtils.matchView("ROL-INDEX");
    this.showVista = AppUtils.matchView("VIEW-INDEX");
  }

  ngOnInit() {
  }

}
