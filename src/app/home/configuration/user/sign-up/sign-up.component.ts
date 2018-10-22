import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/user/user.service';
import { User } from '../../../../shared/user/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private userService : UserService,private router : Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
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
    }
  }

  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
        if (data.ok == true) {
          this.resetForm(form);
          this.toastr.success('User registration successful');
          this.router.navigate(['/userindex']);
        }
        else
          this.toastr.error(data.err);
      },
      (err : HttpErrorResponse)=>{
        this.toastr.error(err.message);
      });
  }
}
