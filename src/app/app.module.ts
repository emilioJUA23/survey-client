import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SignUpComponent } from './home/configuration/user/sign-up/sign-up.component';
import { DataTablesResponseService } from './shared/data-tables-response/data-tables-response.service';
import { WelcomeComponent } from './home/welcome/welcome.component';

import { ToastrModule } from 'ngx-toastr';
import {RolService} from './shared/rol/rol.service';
import {ViewService} from './shared/view/view.service';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import {TreeviewModule } from 'ngx-treeview';
import { ViewIndexComponent } from './home/configuration/view/view-index/view-index.component';
import { RolIndexComponent } from './home/configuration/rol/rol-index/rol-index.component';
import { InsertRolComponent } from './home/configuration/rol/insert-rol/insert-rol.component';
import { RolEditComponent } from './home/configuration/rol/rol-edit/rol-edit.component';
import { UserEditComponent } from './home/configuration/user/user-edit/user-edit.component'

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
    UserIndexComponent,
    WelcomeComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ViewIndexComponent,
    RolIndexComponent,
    InsertRolComponent,
    RolEditComponent,
    UserEditComponent
  ],
  imports: [
    TreeviewModule.forRoot(),
    ReactiveFormsModule,
    ToastrModule,
    BrowserModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [UserService,
    DataTablesResponseService,
    ViewService,
    RolService,
    AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
