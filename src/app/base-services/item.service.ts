import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";

import { Item } from '../models';

@Injectable()
export class BaseItemService {
    constructor(private db: AngularFireDatabase) { }

    /**
     * @author Anthony Pizzimenti
     * @description Gets all the items wrapped in an Observable.
     * @returns {Observable<Item[]>} An Observable watching a list of items.
     */
    all(): Observable<Item[]> {
        return this.db.list<Item>("items").valueChanges();
    }

    /**
     * @author Anthony Pizzimenti
     * @description Gets an individual item.
     * @param {string | number} itemID  The desired item's unique ID.
     * @returns {Observable<Item>}
     */
    one(itemID: string | number): Observable<Item> {
        return this.db.object<Item>("/items/" + itemID).valueChanges();
    }
}
