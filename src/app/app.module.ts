import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SurveyComponent } from './survey.component';
import { SurveyEditorComponent } from './survey.editor.component';
import { SurveyVersioningComponent } from './survey-versioning/survey-versioning.component';
import { ResultsDisplayComponent } from './results-display/results-display.component';
import { AppRoutingModule } from './/app-routing.module';
import { SurveyEditorWrapperComponent } from './survey-editor-wrapper/survey-editor-wrapper.component';
import { SurveyWrapperComponent } from './survey-wrapper/survey-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    SurveyEditorComponent,
    SurveyVersioningComponent,
    ResultsDisplayComponent,
    SurveyEditorWrapperComponent,
    SurveyWrapperComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
