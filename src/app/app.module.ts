import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ConfigurationComponent } from './home/configuration/configuration.component';
import { DataTablesModule } from 'angular-datatables';
import { HomeComponent} from './home/home.component';
import { ResultsDisplayComponent } from './results-display/results-display.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SurveyComponent } from './survey.component';
import { SurveyEditorComponent } from './survey.editor.component';
import { SurveyVersioningComponent } from './survey-versioning/survey-versioning.component';
import { UserComponent } from './user/user.component';

import { AppRoutes } from './routes';

import { UserService } from './shared/user/user.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserIndexComponent } from './home/configuration/user/user-index/user-index.component';
import { DataTablesResponseService } from './shared/data-tables-response/data-tables-response.service';

@NgModule({
  declarations: [
    AppComponent,
    ConfigurationComponent,
    SurveyComponent,
    SignInComponent,
    SurveyEditorComponent,
    SurveyVersioningComponent,
    ResultsDisplayComponent,
    UserComponent,
    HomeComponent,
    ConfigurationComponent,
    UserIndexComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [UserService,
    DataTablesResponseService,
    AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
