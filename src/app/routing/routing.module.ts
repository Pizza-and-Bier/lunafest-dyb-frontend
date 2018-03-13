import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "../login/login.component";
import { AuthWrapperComponent } from '../auth-wrapper/auth-wrapper.component';
import { ItemListComponent } from '../item-list/item-list.component';
import { MyBidsComponent } from '../my-bids/my-bids.component';
import { RegistrationComponent } from '../registration/registration.component';
import { NewItemComponent } from '../new-item/new-item.component';
import { AuctionWrapperComponent } from '../auction-wrapper/auction-wrapper.component';
import { EditItemComponent } from '../edit-item/edit-item.component';
import { AuctionAdminComponent } from '../auction-admin/auction-admin.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { AuctionClosedComponent } from '../auction-closed/auction-closed.component';
import { AuctionGuard } from './auction.guard';
import { ItemWinnersComponent } from '../item-winners/item-winners.component';
import { ItemOrderComponent } from '../item-order/item-order.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { PasswordResetConfirmComponent } from '../password-reset-confirm/password-reset-confirm.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: "sign-up", component: RegistrationComponent },
  { path: "password/forgot", component: ForgotPasswordComponent},
  { path: "password/reset", component: PasswordResetConfirmComponent },
  { path: 'user', component: AuthWrapperComponent, canActivate: [ AuthGuard ],
    children: [
      { path: 'auction-closed', component: AuctionClosedComponent},
      { path: "items", component: AuctionWrapperComponent, canActivateChild: [AuthGuard, AuctionGuard], children: [
        { path: "list", component: ItemListComponent },
        { path: "bids", component: MyBidsComponent }
      ]},
      { path: "admin", canActivateChild: [AuthGuard, AdminGuard], children: [
        { path: "add", component: NewItemComponent },
        { path: "edit/:id", component: EditItemComponent},
        { path: "auction", component: AuctionAdminComponent },
        { path: "winners", component: ItemWinnersComponent },
        { path: "item-order", component: ItemOrderComponent }
      ]}
    ]
  },
  { path: "", redirectTo: "/login", pathMatch: "full"}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard, AdminGuard, AuctionGuard]
})
export class RoutingModule { }
