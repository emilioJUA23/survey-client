import { Component, OnInit } from '@angular/core';
import { AppUtils } from '../../app.utils';

@Component({
  selector: 'app-survey-home',
  templateUrl: './survey-home.component.html',
  styleUrls: ['./survey-home.component.css']
})
export class SurveyHomeComponent implements OnInit {
  showSurveyResult:boolean;
  showSurveyEditor:boolean;
  showSurveyWrapper:boolean;
  constructor() {
    this.showSurveyResult = AppUtils.matchView("SURVEY-ANSWERS");
    this.showSurveyEditor = AppUtils.matchView("SURVEY-BUILD");
    this.showSurveyWrapper = AppUtils.matchView("SURVEY-VIEW");
   }

  ngOnInit() {
  }

}
