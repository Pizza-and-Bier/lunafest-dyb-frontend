import { Injectable } from '@angular/core';

import { Observable } from "rxjs";

import { UserService } from "../services/user.service";
import { Item } from '../models';

@Injectable()
export class UserBidService {

  constructor(private userService: UserService) { }


  public getUsersItems(): Observable<Item[]> {
    return this.userService.getUsersItems();
  }
}
