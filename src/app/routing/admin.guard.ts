import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from "rxjs/operators";
import { BaseAuthService, BaseUserService } from '../base-services';

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor(private authService: BaseAuthService, private userService: BaseUserService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return Observable.fromPromise(this.authService.uniqueID()).pipe(
      mergeMap(
        (id) => {
          return this.userService.user(id).map(
            (user) => {
              this.router.navigate(["/user/items/list"]);
              return user.role === "admin";
            }
          );
        }
      )
    );
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(next, state);
  }
}
