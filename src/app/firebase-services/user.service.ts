import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { AngularFireDatabase } from "angularfire2/database"
import { User, Item } from "../models";
import "rxjs/add/operator/take";

@Injectable()
export class UserService {
    constructor(private db: AngularFireDatabase) { };
    
    /**
     * @author Anthony Pizzimenti
     * @desc Consumes a user's unique ID and retrieves the Items they are currently following.
     * @param {string} uid A user's unique ID, as assigned by Firebase.
     * @returns {Observable<Item>} Emits Item objects as they're found.
     */
    public following(uid: string): Observable<Item> {
        let users: Observable<User> = this.db.object<User>("/users/" + uid).valueChanges().take(1);
        
        return Observable.create((obs) => {
            this.retrieveItemObject(users, obs);
        });
    }
    
    /**
     * @author Anthony Pizzimenti
     * @desc This does the grunt work for following().
     * @param {Observable<User>} users  Observable that contains a reference to a specific user.
     * @param {Observer<any>} parent    Parent observable through which we emit Items.
     * @returns {undefined}
     * @private
     */
    private retrieveItemObject(users: Observable<User>, parent: Observer<any>) {
        users.subscribe((user) => {
            let following = user.following;
        
            for (let itemID of following) {
                let path = "/items/" + itemID.toString(),
                    itemQuery: Observable<Item> = this.db.object<Item>(path).valueChanges();

                itemQuery.subscribe((item) => {
                    parent.next(item);
                });
            }
        });
    }
}
