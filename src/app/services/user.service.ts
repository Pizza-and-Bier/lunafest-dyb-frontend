import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs/Observable';

import { ConfigService } from "./config.service";
import { Item } from "../models";

@Injectable()
export class UserService {
  private readonly USER_API_BASE = ConfigService.getApiBase() + "userItems";
  
  constructor(private http: HttpClient) { }


  public getUsersItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.USER_API_BASE);
  }
}
