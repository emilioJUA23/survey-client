import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { RolService } from '../../../../shared/rol/rol.service';
import { Rol } from '../../../../shared/rol/rol.model';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview/src';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewService } from '../../../../shared/view/view.service';

@Component({
  selector: 'app-rol-edit',
  templateUrl: './rol-edit.component.html',
  styleUrls: ['./rol-edit.component.css']
})
export class RolEditComponent implements OnInit {
  id;
  rol:Rol;
  rolForm: FormGroup;
  errorEdit = false;
  views: string[];
  items: TreeviewItem[];
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
});

  constructor(private viewService : ViewService,private activatedroute:ActivatedRoute, private fb: FormBuilder, private rolService : RolService, private router : Router) {
    this.rolForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
      fechaDeIngreso: [''],
      usuarioDeIngreso: [''],
      _id : [this.id]
    });
    this.id=this.activatedroute.snapshot.params['id'];
   }
   
  ngOnInit() {
    this.rolService.getRol(this.id).subscribe(
      (resp : any)=>{
        if(resp.ok){
          this.views = resp.rol.vistas.map((vista) => {
            return vista._id;
         })
          this.viewService.getViewTree()
          .subscribe((resp2 : any)=>{
            if(resp2.ok){
              this.checkedAllItem(resp2.tree[0], this.views);
              this.items = [new TreeviewItem(resp2.tree[0])];
              this.rolForm = this.fb.group({
                nombre: [resp.rol.nombre],
                descripcion: [resp.rol.descripcion],
                fechaDeIngreso :[resp.rol.fechaDeIngreso || ""],
                usuarioDeIngreso: [resp.rol.usuarioDeIngreso || ""],
                _id : [this.id]
              });
            }else{
              this.errorEdit = true;
              console.log("error");
            }
          },
          (err : HttpErrorResponse)=>{
            this.errorEdit = true;
            console.log("error");
          });
        }else{
          this.errorEdit = true;
          console.log("error");
        }
      },
      (err : HttpErrorResponse)=>{
        this.errorEdit = true;
        console.log("error");
      }
    )
  }

  checkedAllItem(root:any, checkeds: string[]){
    if(checkeds.includes(root.value)){
      root.checked = true; 
    }else{root.checked = false; }
    if(root.children === undefined){return;}
    for (let x = 0; x < root.children.length; x++) {
      const element2 = root.children[x];
      if(element2 === undefined){continue;}
      this.checkedAllItem(element2, checkeds);
    }
  }

  onSelectedChange(selectedView: string[]) {
    this.views = selectedView;
  }

  getNodesChecked(root:TreeviewItem, checkedNodes:string[]){
    if(root.children === undefined){ return};
    for (let index = 0; index < root.children.length; index++) {
      const element = root.children[index];
      this.getNodesChecked(element,checkedNodes);
      if(checkedNodes.includes(element.value))
      {
        continue;
      }
      if(element.children === undefined){ continue};
      for (let x = 0; x < element.children.length; x++) {
        const element2 = element.children[x];
        if(element2 === undefined){continue;}
        if (checkedNodes.includes(element2.value)) {
          checkedNodes.push(element.value);
          break;
        }
      }
    }
  }

  OnSubmit(form) {
    this.getNodesChecked(this.items[0], this.views);
    if(this.views.length > 0)
    {
      if(!this.views.includes(this.items[0].value)){
        this.views.push(this.items[0].value);
      }
    }
    form.vistas = this.views;
    this.rolService.updateRol(form)
       .subscribe((data: any) => {
         if (data.ok == true) {
           this.router.navigate(['/rolindex']);
         }
         else
         this.errorEdit = true;
         console.log(data);
       },
       (err : HttpErrorResponse)=>{
         this.errorEdit = true;
         console.log(err);
       });
   }
}
