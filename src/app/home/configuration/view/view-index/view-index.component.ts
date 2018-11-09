import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../../shared/view/view.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AppConstants } from '../../../../app.constants';
import { TreeviewItem, TreeviewConfig   } from 'ngx-treeview/src';

@Component({
  selector: 'app-view-index',
  templateUrl: './view-index.component.html',
  styleUrls: ['./view-index.component.css']
})
export class ViewIndexComponent implements OnInit {
  dropdownEnabled = true;
  items: TreeviewItem[];
  values: number[];
  config = TreeviewConfig.create({
      hasAllCheckBox: false,
      hasCollapseExpand: true,
      decoupleChildFromParent: false,
      maxHeight: 400
  });

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
  buttonClass = this.buttonClasses[0];


  isTreeError = false;
  constructor(private viewService : ViewService) {
    this.items = [new TreeviewItem({
      text: 'Cargando', value: 0})];
   }

  ngOnInit() {
    this.viewService.getViewTree()
    .subscribe((resp : any)=>{
      if(resp.ok){
        console.log(resp.tree[0]);
        this.items = [new TreeviewItem(resp.tree[0])];
      }else{
        this.isTreeError = true;
        console.log("error");
      }
    },
    (err : HttpErrorResponse)=>{
      this.isTreeError = true;
      console.log("error");
    });
  }

  onFilterChange(value: string) {
    console.log('filter:', value);
}
}
