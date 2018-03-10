import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { LoginService } from '../services/login.service';
import { BaseUserService, BaseAuthService } from '../base-services';
import { User } from '../models';

@Component({
  selector: 'app-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  styleUrls: ['./auth-wrapper.component.scss']
})
export class AuthWrapperComponent implements OnInit {

  public user: User;

  constructor(private loginService: LoginService, private router: Router, private authService: BaseAuthService, private userService: BaseUserService) { }

  ngOnInit() {
    this.getUser();
  }

  public logout(): void {
    this.loginService.logout().then(
      (data) => {
        this.router.navigate(["/login"]);
      }
    ); 
  }

  public addNewItem(): void {
    this.router.navigate(["user/admin/add"]);
  }

  private getUser(): void {
    this.authService.uniqueID().then(
      (id) => {
        this.userService.user(id).subscribe(
          (user) => {
            console.log(user);
            this.user = user;
          }
        );
      }
    );
  }

}
