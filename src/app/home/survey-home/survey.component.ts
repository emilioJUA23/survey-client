import { Component, Input } from "@angular/core";
import * as Survey from "survey-angular";
import * as widgets from "surveyjs-widgets";
import { Http } from '@angular/http';
import {AppConstants} from '../../app.constants';
import {AppUtils} from '../../app.utils';

import "inputmask/dist/inputmask/phone-codes/phone.js";

widgets.icheck(Survey);
widgets.select2(Survey);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey);
widgets.jqueryuidatepicker(Survey);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey);
widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey);
widgets.bootstrapslider(Survey);
widgets.prettycheckbox(Survey);

Survey.JsonObject.metaData.addProperty("questionbase", "popupdescription:text");
Survey.JsonObject.metaData.addProperty("page", "popupdescription:text");

@Component({
  selector: "survey",
  template: `<div class="survey-container contentcontainer codecontainer"><div id="surveyElement"></div></div>`
})
export class SurveyComponent {
  @Input()
  set json(value: object) {
    const surveyModel = new Survey.Model(value);
    surveyModel.onComplete.add(function (result) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST',`${AppConstants.baseURL}/survey/answer`,true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            let  userToken =AppUtils.getLocal('userToken');
            xhr.setRequestHeader("Authorization", userToken);
            xhr.send(JSON.stringify(
              {"instrument_id":value["_id"], "result":result.data}
            ));
            console.log(xhr.responseText);

    });
    surveyModel.onAfterRenderQuestion.add((survey, options) => {
      if (!options.question.popupdescription) return;

      //Add a button;
      var btn = document.createElement("button");
      btn.className = "btn btn-info btn-xs";
      btn.innerHTML = "More Info";
      var question = options.question;
      btn.onclick = function() {
        //showDescription(question);
        alert(options.question.popupdescription);
      };
      var header = options.htmlElement.querySelector("h5");
      var span = document.createElement("span");
      span.innerHTML = "  ";
      header.appendChild(span);
      header.appendChild(btn);
    });
    Survey.SurveyNG.render("surveyElement", { model: surveyModel });
  }
  constructor() { }

  ngOnInit() {}
}
