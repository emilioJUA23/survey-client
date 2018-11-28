import { Component, OnInit } from '@angular/core';
import { SurveyComponent} from '../survey.component';
import {AppConstants} from '../../../app.constants';
import {AppUtils} from '../../../app.utils';

@Component({
  selector: 'app-survey-wrapper',
  templateUrl: './survey-wrapper.component.html',
  styleUrls: ['./survey-wrapper.component.css']
})
export class SurveyWrapperComponent implements OnInit {
  _baseURL : string;
  json : any;
  consult_surveys(){
    var req = new XMLHttpRequest();
    req.open('GET', `${this._baseURL}/survey/instrument`, false);
    let  userToken =AppUtils.getLocal('userToken');
    req.setRequestHeader("Authorization", userToken);
    req.send(null);
    if (req.status == 200)
    {
      var jsonArray = JSON.parse(req.responseText);
      return jsonArray[0];
    }
    else
    {
      console.log("no response");
      return {};
    }
  }

  constructor() { 
    this._baseURL = AppConstants.baseURL;
    this.json = this.consult_surveys();
  }

  ngOnInit() {
  }

}
