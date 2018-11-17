import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user/user.service';
import { AppUtils } from '../../app.utils';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  isForgetPasswordError : boolean = false;
  constructor(private userService : UserService,private router : Router) { }

  ngOnInit() {
  }

  OnSubmit(userName){
    console.log("Entro a autentificar");
    this.userService.recoverpassword(userName).subscribe((data : any)=>{
      this.router.navigate(['/login']);
    },
    (err : HttpErrorResponse)=>{
      this.isForgetPasswordError = true;
    });
  }
}
