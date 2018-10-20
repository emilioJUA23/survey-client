import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './home/configuration/sign-up/sign-up.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes : Routes =[
    { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },

    /*{
        path: 'signup', component : HomeComponent,
        children: [{path: '', component : SignUpComponent}]
    },*/
    {
        path: 'login', component : UserComponent,
        children: [{path: '', component : SignInComponent}]
    },
    {path:"", redirectTo: '/login', pathMatch:"full"}
];