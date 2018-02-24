import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs";

@Injectable()
export class BaseItemService {
    constructor(private db: AngularFireDatabase) { }

    /**
     * @author Anthony Pizzimenti
     * @description Gets all the items wrapped in an Observable.
     * @returns {Observable<Item[]>} An Observable watching a list of items.
     */
    all(): AngularFireList<Item[]> {
        return this.db.list<Item[]>("items");
    }

    /**
     * @author Anthony Pizzimenti
     * @description Gets an individual item.
     * @param {string | number} itemID  The desired item's unique ID.
     * @returns {Observable<Item>}
     */
    one(itemID: string | number): AngularFireObject<Item> {
        return this.db.object<Item>("/items/" + itemID);
    }

    /**
     * @author Anthony Pizzimenti
     * @desc Creates an item.
     * @param {Object} props   The properties assigned to the new object.
     * @returns {Promise<any>}
     */
    create(props: Object): Promise<any> {
        return new Promise((resolve, reject) => {
            let I = new Item();

            // check if item contains required properties
            if (!(props.hasOwnProperty("name") || props.hasOwnProperty("openingBid") || props.hasOwnProperty("bidFloor")))
                reject("The provided Item object does not contain the required properties.");
            
            // assign properties to new Item object
            for (let key in props) {
                I[key] = props[key];
            }
            this.db.list("/items").push(I).then((_) => {
                if (_) resolve(_);
                else reject("An error occurred while creating a new Item.");
            });
        });
    }

    /**
     * @author Anthony Pizzimenti
     * @desc Updates an Item.
     * @param {string | number} itemID  Unique ID for the Item to be updated.
     * @param {Item} props              Object containing property name and desired updated value.
     * @returns {Promise<any>}
     */
    update(itemID: string | number, props: Item): Promise<any> {
        return this.db.list<Item>("/items").update(itemID.toString(), props);
    }

    /**
     * @author Anthony Pizzimenti
     * @desc Removes the given item.
     * @param {string | number} itemID  Unique ID for the item to be deleted.
     * @returns {Promise<any>}
     */
    remove(itemID: string | number): Promise<any> {
        return this.db.list<Item>("/items").remove(itemID.toString());
    }
}
