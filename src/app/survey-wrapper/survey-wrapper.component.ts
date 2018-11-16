import { Component, OnInit } from '@angular/core';
import { SurveyComponent} from '../survey.component';

@Component({
  selector: 'app-survey-wrapper',
  templateUrl: './survey-wrapper.component.html',
  styleUrls: ['./survey-wrapper.component.css']
})
export class SurveyWrapperComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {
  }

}
