import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import {AppUtils} from '../../../../app.utils';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { RolService } from '../../../../shared/rol/rol.service';
import { User } from '../../../../shared/user/user.model';
import { UserService } from '../../../../shared/user/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  error = false;
  userForm: FormGroup;
  rolIsService = false;
  id;

  constructor(private userService : UserService,private router : Router, private rolService : RolService, private fb: FormBuilder, private activatedroute:ActivatedRoute) {
    this.userForm = this.fb.group({
      primerNombre: [''],
      segundoNombre: [''],
      primerApellido: [''],
      segundoApellido: [''],
      email: [''],
      roles: this.fb.array([this.fb.control("")])
    });
    this.id=this.activatedroute.snapshot.params['id'];
   }

  ngOnInit() {
    this.userService.getUser(this.id)
    .subscribe((resp: any)=>{
      if(resp.ok){
        this.user = new User();
        this.user.primerNombre = resp.usuario.primerNombre;
        this.user.segundoNombre = resp.usuario.segundoNombre;
        this.user.primerApellido = resp.usuario.primerApellido;
        this.user.segundoApellido = resp.usuario.segundoApellido;
        this.user.email = resp.usuario.email;
        resp.usuario.roles = resp.usuario.roles.map((rol)=>{return rol._id});
        this.rolService.getAll().subscribe((resp2: any)=>{
          if(resp2.ok){
            this.user.roles = resp2.data.map((rol) => {
              rol.selected = resp.usuario.roles.includes(rol._id);
              return rol});
              let _roles =this.user.roles.map(skill => {
                return this.fb.control(skill.selected);
              });

              this.userForm = this.fb.group({
                primerNombre: [this.user.primerNombre],
                segundoNombre: [this.user.segundoNombre],
                primerApellido: [this.user.primerApellido],
                segundoApellido: [this.user.segundoApellido ],
                email: [this.user.email],
                password: [''],
                _id : [this.id],
                roles: this.fb.array(_roles)
              });
              this.rolIsService = true;
          }else{
            this.error = true;
            console.log("error");
          }
        }, (err: HttpErrorResponse) =>{
          this.error = true;
          console.log("error");
        })
      }else{
        this.error = true;
        console.log("error");
      }
    },(err : HttpErrorResponse) => {
        this.error = true;
        console.log("error");
    })
  }

  OnSubmit(form) {
    form.roles = AppUtils.getArrayIds(form.roles, this.user.roles);
    this.userService.updateUserRoles(form)
       .subscribe((data: any) => {
         if (data.ok === true) {
           this.router.navigate(['/userindex']);
         }
         else{
         this.error = true;
        }
       },
       (err : HttpErrorResponse)=>{
         this.error = true;
       });
   }
}