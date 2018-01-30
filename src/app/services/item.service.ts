import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs/Observable';

import { ConfigService } from "./config.service";
import { Item } from "../models";

@Injectable()
export class ItemService {

  private readonly ITEM_API_BASE = ConfigService.getApiBase() + "items";

  constructor(private http: HttpClient) { }

  public getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.ITEM_API_BASE);
  }

}
