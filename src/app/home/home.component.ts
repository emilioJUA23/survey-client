import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user/user.service';
import { AppUtils } from '../app.utils';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isUpdatePassword : boolean = false;
  
  showUsuario:boolean;
  showRoles:boolean;
  showVista:boolean;
  showSurveyResult:boolean;
  showSurveyEditor:boolean;
  showSurveyWrapper:boolean;

  @ViewChild('btnClose') btnClose : ElementRef;
  constructor(private router: Router, private userService: UserService) { 
    this.showUsuario = AppUtils.matchView("USER-INDEX");
    this.showRoles = AppUtils.matchView("ROL-INDEX");
    this.showVista = AppUtils.matchView("VIEW-INDEX");
    this.showSurveyResult = AppUtils.matchView("SURVEY-ANSWERS");
    this.showSurveyEditor = AppUtils.matchView("SURVEY-BUILD");
    this.showSurveyWrapper = AppUtils.matchView("SURVEY-VIEW");
  }

  ngOnInit() {
  }

  Logout() {
    AppUtils.deleteLocal('userToken');
    AppUtils.deleteLocal('userData');
    this.router.navigate(['/login']);
  }

  changePassword(password){
    console.log("change password");
   let user = AppUtils.getLocal('userData');

   this.userService.resetPassword(user._id, password).subscribe((data : any)=>{
    AppUtils.deleteLocal('userToken');
    AppUtils.deleteLocal('userData');
    this.btnClose.nativeElement.click();
    
    this.router.navigate(['/login']);
  },
  (err : HttpErrorResponse)=>{

    this.isUpdatePassword = true;
  });
}
}
