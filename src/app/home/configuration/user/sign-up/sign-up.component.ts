import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/user/user.service';
import { RolService } from '../../../../shared/rol/rol.service';
import { User } from '../../../../shared/user/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  roles = [];
  error = false;

  constructor(private userService : UserService,private router : Router, private rolService : RolService) { }

  ngOnInit() {
    this.resetForm();
    this.getRoles();
  }

  getRoles(){
    this.rolService.getAll()
    .subscribe((data: any) => {
      if (data.ok == true) {
        this.roles = data.data;
      }
      else{
        this.error = true;
      }
    },
    (err : HttpErrorResponse)=>{
      this.error = true;
    });
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      email: '',
      password: '',
      _id: '',
      roles: []
    }
    this.roles = [];
    this.error = false;
  }

  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
        if (data.ok == true) {
          this.resetForm(form);
          this.router.navigate(['/userindex']);
        }
        else
        this.error = true;
      },
      (err : HttpErrorResponse)=>{
        this.error = true;
      });
  }
}