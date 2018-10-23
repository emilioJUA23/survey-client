import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user/user.service';
import { AppUtils } from '../app.utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userClaims: any;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    /*this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;

    });*/
  }

  Logout() {
    AppUtils.deleteLocal('userToken');
    AppUtils.deleteLocal('userData');
    this.router.navigate(['/login']);
  }
}
