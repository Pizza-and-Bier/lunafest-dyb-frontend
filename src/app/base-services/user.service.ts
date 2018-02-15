import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { AngularFireDatabase } from "angularfire2/database"
import "rxjs/add/operator/take";
import { Reference } from "firebase/database";
import { pull } from "lodash";

import { User, Item, Bid } from "../models";

@Injectable()
export class BaseUserService {
    constructor(private db: AngularFireDatabase) { };

    /**
     * @author Anthony Pizzimenti
     * @desc Returns a user as it's represented in the database.
     * @param {string} uID  A user's unique ID.
     * @returns {Observable<User>} An Observable; can be subscribed to to listen for changes.
     */
    public user(uID: string): Observable<User> {
        return this.db.object<User>("/users/" + uID).valueChanges();
    }
    
    /**
     * @author Anthony Pizzimenti
     * @desc Consumes a user's unique ID and retrieves the Items they are currently following.
     * @param {string} uID A user's unique ID, as assigned by Google.
     * @returns {Observable<Item>} Emits Item objects as they're found.
     */
    public following(uID: string): Observable<Item> {
        let users: Observable<User> = this.user(uID);
        
        return Observable.create((obs) => {
            this.retrieveItemObject(users, obs);
        });
    }

    /**
     * @author Anthony Pizzimenti
     * @desc Given a user's a unique ID and an item number, add that item to the user's
     * followed-item list if it isn't there already.
     * @param {string} uID              A user's unique ID, as assigned by Google.
     * @param {string | number} iID     An item's id number.
     * @returns {Promise<any>}          Resolves if the addition was successful, rejects if not.
     */
    public follow(uID: string, iID: string | number): Promise<any> {
        let itemID: string = iID.toString(),
            userReference: Reference = this.db.object<User>("/users/" + uID);

        return new Promise((resolve, reject) => {
            this.followOrUnfollow(userReference, itemID, true, resolve, reject);
        });
    }

    /**
     * @author Anthony Pizzimenti
     * @desc Given a user's unique ID and an item number, remove that item from the user's follow-item
     * list if it exists there.
     * @param {string} uID              A user's unique ID, as assigned by Google.
     * @param {string | number} iID     An item's ID number.
     * @returns {Promise<any>}          Resolves if the removal was successful, rejects if not.
     */
    public unfollow(uID: string, iID: string | number): Promise<any> {
        let itemID: string = iID.toString(),
            userReference: Reference = this.db.object<User>("/users/" + uID);

        return new Promise((resolve, reject) => {
            this.followOrUnfollow(userReference, itemID, false, resolve, reject);
        });
    }

    /**
     * @author Anthony Pizzimenti
     * @desc Places a bid on the given item.
     * @param {string} uID          A user's unique ID.
     * @param {string | number} iID An item's ID number.
     * @param {number} bidValue     The amount to be bid.
     * @returns {Promise<any>}      Resolves if the bid was successful, rejects if not. 
     */
    public bid(uID: string, iID: string | number, bidValue: number): Promise<any> {
        let itemReference: Reference = this.db.object<Item>("/items/" + iID.toString());

        return new Promise((resolve, reject) => {
            itemReference.valueChanges().take(1).subscribe((item) => {
                let time = Date.now(),
                    bid: Bid = {
                        amount: bidValue,
                        createdAt: time,
                        createdBy: uID
                    };

                item.bidders[uID] = true;

                itemReference.update({ currentBid: bid }).then((_) => {
                    itemReference.update({ bidders: item.bidders }).then((_) => {
                        resolve("Successful update.");
                    });
                }).catch((err) => {
                    reject(err);
                });
            });
        });
    }

    /**
     * @author Anthony Pizzimenti
     * @desc Private method that does the grunt work for follow() and unfollow(). It's extremely important
     * to note that this function will reject(...) if the user tries to follow an item that they're already
     * following, or unfollow an item that they aren't following. You can deal with this however you want
     * (for now I'm just sending a console.warn(...)).
     * @param {Reference} userReference     A firebase.database User database reference.
     * @param {string} itemID               An item's id number.
     * @param {boolean} follow              Are we adding to a user's follow list, or removing from it? 
     * @param {function} resolve            Resolves the Promise. 
     * @param {function} reject             Rejects the promise on error.
     * @returns {undefined}
     * @private 
     */
    private followOrUnfollow(userReference: Reference, itemID: string, follow: boolean, resolve: Function, reject: Function) {
        let observable = userReference.valueChanges().take(1);

        observable.subscribe((user) => {
            if (follow && !user.following.includes(itemID)) {
                user.following.unshift(itemID);
            } else if (follow && user.following.includes(itemID)) {
                reject("User is already following this item.");
            } else if (!follow && user.following.includes(itemID)) {
                pull(user.following, itemID);
            } else {
                reject("User was not following the item attempting to be unfollowed.");
            }

            userReference.update({ following: user.following }).then((_) => {
                resolve(_);
            }).catch((err) => {
                reject(err);
            });
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
