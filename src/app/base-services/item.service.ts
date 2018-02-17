import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";

import { Item } from '../models';

@Injectable()
export class BaseItemService {
    constructor(private db: AngularFireDatabase) { }

    all (): Observable<Item[]> {
        return this.db.list<Item>("items").valueChanges();
    }
}
