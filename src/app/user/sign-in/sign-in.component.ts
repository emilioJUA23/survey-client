import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user/user.service';
import { AppUtils } from '../../app.utils';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError : boolean = false;
  
  constructor(private userService : UserService,private router : Router) { }

  ngOnInit() {
  }
    OnSubmit(userName,password){
     this.userService.userAuthentication(userName,password).subscribe((data : any)=>{
      AppUtils.setLocal('userToken',data.token);
      AppUtils.setLocal('userData', data.usuario);
      this.router.navigate(['/welcome']);
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
    });
  }
}
