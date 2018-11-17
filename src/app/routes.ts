import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { ConfigurationComponent } from './home/configuration/configuration.component';
import { UserIndexComponent } from './home/configuration/user/user-index/user-index.component';
import { SignUpComponent } from './home/configuration/user/sign-up/sign-up.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { ViewIndexComponent } from './home/configuration/view/view-index/view-index.component';
import { RolIndexComponent } from './home/configuration/rol/rol-index/rol-index.component'
import { InsertRolComponent } from './home/configuration/rol/insert-rol/insert-rol.component'
import { RolEditComponent } from './home/configuration/rol/rol-edit/rol-edit.component';
import { UserEditComponent } from './home/configuration/user/user-edit/user-edit.component'
import { SurveyHomeComponent } from './home/survey-home/survey-home.component'
import { ResultsDisplayComponent } from './home/survey-home/results-display/results-display.component';
import { SurveyEditorWrapperComponent } from './home/survey-home/survey-editor-wrapper/survey-editor-wrapper.component';
import { SurveyWrapperComponent } from './home/survey-home/survey-wrapper/survey-wrapper.component';
import { NotFoundComponent } from './helpers-components/not-found/not-found.component';
import { UnauthorizedComponent } from './helpers-components/unauthorized/unauthorized.component';

export const AppRoutes : Routes =[
    {path:"", redirectTo: '/login', pathMatch:"full"},
    
    { path: 'home', component: HomeComponent, canActivate:[AuthGuard], data:{menuID:'HOME'}},
    
    {
        path: 'welcome', component : HomeComponent,
        children: [
            {path: '', component : WelcomeComponent,canActivate:[AuthGuard], data:{menuID:'WELCOME'}}]
    },

    {
        path: 'survey-home', component : HomeComponent,
        children: [
            {path: '', component : SurveyHomeComponent, canActivate:[AuthGuard], data:{menuID:'SURVEY-INDEX'}}]
    },
    {
        path: 'survey-results', component : HomeComponent,
        children: [
            {path: '', component : SurveyHomeComponent,
            children: [
                {path: '', component : ResultsDisplayComponent, canActivate:[AuthGuard], data:{menuID:'SURVEY-ANSWERS'} }
            ]}]
    },
    {
        path: 'survey-editor', component : HomeComponent,
        children: [
            {path: '', component : SurveyHomeComponent,
            children: [
                {path: '', component : SurveyEditorWrapperComponent, canActivate:[AuthGuard], data:{menuID:'SURVEY-BUILD'}  }
            ]}]
    },
    {
        path: 'survey-wrapper', component : HomeComponent,
        children: [
            {path: '', component : SurveyHomeComponent,
            children: [
                {path: '', component : SurveyWrapperComponent, canActivate:[AuthGuard], data:{menuID:'SURVEY-VIEW'}  }
            ]}]
    },

    {
        path: 'configuration', component : HomeComponent,
        children: [
            {path: '', component : ConfigurationComponent, canActivate:[AuthGuard], data:{menuID:'CONFIGURATION'} }]
    },
    {
        path: 'userindex', component : HomeComponent,
        children: [
            {path: '', component : ConfigurationComponent,
            children: [
                {path: '', component : UserIndexComponent, canActivate:[AuthGuard], data:{menuID:'USER-INDEX'}}
            ]}]
    },
    {
        path: 'user/:id', component : HomeComponent,
        children: [
            {path: '', component : ConfigurationComponent,
            children: [
                {path: '', component : UserEditComponent, canActivate:[AuthGuard], data:{menuID:'USER-UPDATE'}}
            ]}]
    },
    {
        path: 'usersignup', component : HomeComponent,
        children: [
            {path: '', component : ConfigurationComponent,
            children: [
                {path: '', component : SignUpComponent, canActivate:[AuthGuard], data:{menuID:'USER-SIGN-UP'}}
            ]}]
    },

    {
        path: 'rol/:id', component : HomeComponent,
        children: [
            {path: '', component : ConfigurationComponent,
            children: [
                {path: '', component : RolEditComponent, canActivate:[AuthGuard], data:{menuID:'ROL-UPDATE'}}
            ]}]
    },
    {
        path: 'rolindex', component : HomeComponent,
        children: [
            {path: '', component : ConfigurationComponent,
            children: [
                {path: '', component : RolIndexComponent, canActivate:[AuthGuard], data:{menuID:'ROL-INDEX'}}
            ]}]
    },
    {
        path: 'insert-rol', component : HomeComponent,
        children: [
            {path: '', component : ConfigurationComponent,
            children: [
                {path: '', component : InsertRolComponent, canActivate:[AuthGuard], data:{menuID:'ROL-CREATE'}}
            ]}]
    },
    {
        path: 'treeview', component : HomeComponent,
        children: [
            {path: '', component : ConfigurationComponent,
            children: [
                {path: '', component : ViewIndexComponent, canActivate:[AuthGuard], data:{menuID:'VIEW-INDEX'}}
            ]}]
    },
    {
        path: 'login', component : UserComponent,
        children: [{path: '', component : SignInComponent}]
    },
    {
        path: 'forgotpassword', component : UserComponent,
        children: [{path: '', component : ForgotPasswordComponent}]
    },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: '**', component: NotFoundComponent }
];