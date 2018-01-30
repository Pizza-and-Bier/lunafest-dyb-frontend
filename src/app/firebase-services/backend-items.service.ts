import { Injectable } from '@angular/core';

import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";
import { Item } from '../models/item';

@Injectable()
export class BackendItemsService {

  constructor(private db: AngularFireDatabase) { }

  public initConnection(): Observable<Item[]> {
    return this.db.list<Item>("items").valueChanges();
  }

}
