import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { UserService } from "../shared/user/user.service";
import 'rxjs/add/operator/do';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {AppUtils} from "../app.utils";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }
//getLocal
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.get('Authorization'))
            return next.handle(req.clone());

        if (localStorage.getItem('userToken') != null) {
            let  userToken =AppUtils.getLocal('userToken');
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", userToken)
            });
            return next.handle(clonedreq)
                .do(
                succ => { },
                err => {
                    if (err.status === 401)
                        this.router.navigateByUrl('/login');
                }
                );
        }
        else {
            this.router.navigateByUrl('/login');
        }
    }
}