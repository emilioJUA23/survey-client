import { Component, OnInit } from '@angular/core';
import { SurveyEditorComponent} from '../survey.editor.component';
import {AppConstants} from '../../../app.constants';
import {AppUtils} from '../../../app.utils';

@Component({
  selector: 'app-survey-editor-wrapper',
  templateUrl: './survey-editor-wrapper.component.html',
  styleUrls: ['./survey-editor-wrapper.component.css']
})
export class SurveyEditorWrapperComponent implements OnInit {
  _baseURL : string;
    json: any;
  consult_surveys(){
    var req = new XMLHttpRequest();
    req.open('GET',  `${this._baseURL}/survey/instrument`, false);
    console.log(`${this._baseURL}/survey/instrument`);
    let  userToken =AppUtils.getLocal('userToken');
    req.setRequestHeader("Authorization", userToken);
    req.send(null);
    if (req.status == 200)
    {
      console.log("entro");
      var jsonArray = JSON.parse(req.responseText);
      return jsonArray[0];
    }
    else
    {
      console.log("no response");
      return {};
    }
  }

  onSurveySaved(survey) {
    this.json = survey;
    var xhr = new XMLHttpRequest();
    xhr.open('POST',`${this._baseURL}/survey/instrument`,false);
    let  userToken =AppUtils.getLocal('userToken');
    xhr.setRequestHeader("Authorization", userToken)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(survey));
    this.json = this.consult_surveys();
  }

  constructor() {
    this._baseURL = AppConstants.baseURL;
    this.json = this.consult_surveys();
   }

  ngOnInit() {
  }

}
