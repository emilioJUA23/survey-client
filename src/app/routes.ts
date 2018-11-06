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

export const AppRoutes : Routes =[
    { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
    {
        path: 'welcome', component : HomeComponent,
        children: [
            {path: '', component : WelcomeComponent}]
    },
    {
        path: 'configuration', component : HomeComponent,
        children: [
            {path: '', component : ConfigurationComponent}]
    },
    {
        path: 'userindex', component : HomeComponent,
        children: [
            {path: '', component : ConfigurationComponent,
            children: [
                {path: '', component : UserIndexComponent}
            ]}]
    },
    {
        path: 'usersignup', component : HomeComponent,
        children: [
            {path: '', component : ConfigurationComponent,
            children: [
                {path: '', component : SignUpComponent}
            ]}]
    },
    /*{
        path: 'signup', component : HomeComponent,
        children: [{path: '', component : SignUpComponent}]
    },*/
    {
        path: 'login', component : UserComponent,
        children: [{path: '', component : SignInComponent}]
    },
    {
        path: 'forgotpassword', component : UserComponent,
        children: [{path: '', component : ForgotPasswordComponent}]
    },
    {path:"", redirectTo: '/login', pathMatch:"full"}
];