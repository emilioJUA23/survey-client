import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results-display',
  templateUrl: './results-display.component.html',
  styleUrls: ['./results-display.component.css']
})
export class ResultsDisplayComponent implements OnInit {
instruments: any[] = [];
  constructor() { }

  ngOnInit() {
    this.instruments = this.consult_surveys();
  }

  consult_surveys(){
    var req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:3000/survey/instrument', false);
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

}
