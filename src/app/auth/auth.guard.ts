import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AppUtils } from '../app.utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(localStorage.getItem("userToken") != null){
        let view = next.data["menuID"];
        if( AppUtils.matchView(view))
        {
          return true;
        }else{
          this.router.navigate(['/unauthorized']);
          return false;
        }
      }
      else{
        this.router.navigate(['/login']);
        return false;
      }
  }
}
