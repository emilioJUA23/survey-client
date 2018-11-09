import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../../shared/view/view.service';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview/src';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RolService } from '../../../../shared/rol/rol.service';
import { Router } from '@angular/router';
import { forEach } from '../../../../../../node_modules/@angular/router/src/utils/collection';

@Component({
  selector: 'app-insert-rol',
  templateUrl: './insert-rol.component.html',
  styleUrls: ['./insert-rol.component.css']
})
export class InsertRolComponent implements OnInit {
  dropdownEnabled = true;
  items: TreeviewItem[];
  values: number[];
  isErrorInsertRol = false;
  config = TreeviewConfig.create({
      hasAllCheckBox: false,
      hasCollapseExpand: true,
      decoupleChildFromParent: false,
      maxHeight: 400
  });
  rolForm: FormGroup;
  views: string[];

  buttonClasses = [
      'btn-outline-primary',
      'btn-outline-secondary',
      'btn-outline-success',
      'btn-outline-danger',
      'btn-outline-warning',
      'btn-outline-info',
      'btn-outline-light',
      'btn-outline-dark'
  ];

  constructor(private viewService : ViewService, private fb: FormBuilder,private rolService : RolService, private router : Router) {
    this.items = [new TreeviewItem({
      text: 'Cargando', value: 0})];

      this.rolForm = this.fb.group({
        nombre: [''],
        descripcion: ['']
      });

   }

  ngOnInit() {
    this.viewService.getViewTree()
    .subscribe((resp : any)=>{
      if(resp.ok){
        this.items = [new TreeviewItem(resp.tree[0])];
      }else{
        this.isErrorInsertRol = true;
        console.log("error");
      }
    },
    (err : HttpErrorResponse)=>{
      this.isErrorInsertRol = true;
      console.log("error");
    });
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
    this.rolService.createRol(form)
       .subscribe((data: any) => {
         if (data.ok == true) {
           this.router.navigate(['/rolindex']);
         }
         else
         this.isErrorInsertRol = true;
         console.log(data);
       },
       (err : HttpErrorResponse)=>{
         this.isErrorInsertRol = true;
         console.log(err);
       });
   }

}
