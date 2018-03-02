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

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: "sign-up", component: RegistrationComponent },
  { path: 'user', component: AuthWrapperComponent, canActivate: [ AuthGuard ],
    children: [
      { path: "items", component: AuctionWrapperComponent, canActivateChild: [AuthGuard], children: [
        { path: "list", component: ItemListComponent },
        { path: "bids", component: MyBidsComponent }
      ]},
      { path: "admin", canActivateChild: [AuthGuard, AdminGuard], children: [
        { path: "add", component: NewItemComponent },
        { path: "edit/:id", component: EditItemComponent},
        { path: "auction", component: AuctionAdminComponent }
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
  providers: [AuthGuard, AdminGuard]
})
export class RoutingModule { }
