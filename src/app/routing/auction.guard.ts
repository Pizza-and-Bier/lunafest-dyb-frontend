import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BaseAuthService, BaseUserService } from '../base-services';
import { mergeMap } from 'rxjs/operators';
import { BaseAuctionService } from '../base-services/auction.service';
import { AuctionStatus } from '../models/auction-status.enum';

@Injectable()
export class AuctionGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private auctionService: BaseAuctionService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.auctionService.getAuction().valueChanges().map(
      (auction) => {
        if ( auction.status === AuctionStatus.STARTED || auction.status === AuctionStatus.ENTERING_DATA) {
          return true;
        }
        else {
          this.router.navigate(["/auction-closed"]);
          return false;
        }
      }
    );
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(next, state);
  }
}
