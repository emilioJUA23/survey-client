import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SurveyComponent } from './survey.component';
import { SurveyEditorComponent } from './survey.editor.component';
import { SurveyVersioningComponent } from './survey-versioning/survey-versioning.component';
import { ResultsDisplayComponent } from './results-display/results-display.component';
import { UserComponent } from './user/user.component';
import { appRoutes } from './routes';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomeComponent} from './home/home.component';

import { UserService } from './shared/user/user.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    SignInComponent,
    SurveyEditorComponent,
    SurveyVersioningComponent,
    ResultsDisplayComponent,
    UserComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService, AuthGuard  ,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
