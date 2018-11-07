import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/user/user.service';
import { RolService } from '../../../../shared/rol/rol.service';
import { User } from '../../../../shared/user/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, NgForm } from '@angular/forms';
import {AppUtils} from '../../../../app.utils';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  error = false;
  userForm: FormGroup;
  rolIsService = false;

  constructor(private userService : UserService,private router : Router, private rolService : RolService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      primerNombre: [''],
      segundoNombre: [''],
      primerApellido: [''],
      segundoApellido: [''],
      email: [''],
      password: [''],
      _id : [0],
      roles: this.fb.array([this.fb.control("")])
    });
  }

  public async waitConstructor(){
    await this.configurateRoles();
  }

  public configurateRoles(){
    this.buildUser();
    this.getRoles();
  }

  buildUser(){
    this.user = new User();
      this.user.primerNombre = "";
      this.user.segundoNombre = "",
      this.user.primerApellido = "",
      this.user.segundoApellido = "",
      this.user.email = "",
      this.user.password = "",
      this.user._id = "",
      this.user.roles = []
  }

  get roles() {
    return this.userForm.get('roles') as FormArray;
  }

  
  buildRoles() {
    const arr = this.user.roles.map(skill => {
      return this.fb.control(skill.selected);
    });
    return this.fb.array(arr);
  }

  buildForm()
  {
    this.userForm = this.fb.group({
      primerNombre: [''],
      segundoNombre: [''],
      primerApellido: [''],
      segundoApellido: [''],
      email: [''],
      password: [''],
      _id : [0],
      roles: this.buildRoles()
    });
    this.rolIsService = true;
  }

  ngOnInit() {
        this.buildUser();
        this.getRoles();
   }

  getRoles(){
    this.rolService.getAll()
    .subscribe((data: any) => {
      if (data.ok == true) {
        let _roles = data.data.map(rol => {
          rol.selected = false;
          return rol;
        });
        this.user.roles = _roles;
        this.buildForm();
      }
      else{
        this.error = true;
      }
    },
    (err : HttpErrorResponse)=>{
      this.error = true;
    });
  }

  OnSubmit(form) {
   form.roles = AppUtils.getArrayIds(form.roles, this.user.roles);
   this.userService.registerUser(form)
      .subscribe((data: any) => {
        if (data.ok == true) {
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