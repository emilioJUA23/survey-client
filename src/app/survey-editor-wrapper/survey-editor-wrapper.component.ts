import { Component, OnInit } from '@angular/core';
import { SurveyEditorComponent} from '../survey.editor.component';

@Component({
  selector: 'app-survey-editor-wrapper',
  templateUrl: './survey-editor-wrapper.component.html',
  styleUrls: ['./survey-editor-wrapper.component.css']
})
export class SurveyEditorWrapperComponent implements OnInit {

  consult_surveys(){
    var req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:3000/survey/instrument', false);
    req.send(null);
    if (req.status == 200)
    {
      var jsonArray = JSON.parse(req.responseText);
      return jsonArray[jsonArray.length-1];
    }
    else
    {
      console.log("no response");
      return {};
    }
  }
  json = this.consult_surveys();

  onSurveySaved(survey) {
    this.json = survey;
    var xhr = new XMLHttpRequest();
    xhr.open('POST',"http://localhost:3000/survey/instrument",false);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(survey));
    this.json = this.consult_surveys();
  }

  constructor() { }

  ngOnInit() {
  }

}
