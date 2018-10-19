import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SurveyComponent } from './survey.component';
import { SurveyEditorComponent } from './survey.editor.component';
import { SurveyVersioningComponent } from './survey-versioning/survey-versioning.component';
import { ResultsDisplayComponent } from './results-display/results-display.component';
import { UserComponent } from './user/user.component';
import { appRoutes } from './routes';
import { SignInComponent } from './user/sign-in/sign-in.component';


@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    SignInComponent,
    SurveyEditorComponent,
    SurveyVersioningComponent,
    ResultsDisplayComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
