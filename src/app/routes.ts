import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { ConfigurationComponent } from './home/configuration/configuration.component';
import { UserIndexComponent } from './home/configuration/user/user-index/user-index.component';

export const AppRoutes : Routes =[
    { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
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