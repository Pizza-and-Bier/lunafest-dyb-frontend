import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  styleUrls: ['./auth-wrapper.component.scss']
})
export class AuthWrapperComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
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

}
