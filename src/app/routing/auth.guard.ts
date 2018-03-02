import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BaseAuthService } from '../base-services';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: BaseAuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.authService.uniqueID().then(
      (id) => {
        console.log(id);
        return id !== null;
      }
    ).catch(
      (err) => {
        this.router.navigate(["/login"]);
        return false;
      }
    );
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.canActivate(route, state);
  }
}
