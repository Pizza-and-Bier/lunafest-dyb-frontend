import { Injectable, OnDestroy } from "@angular/core";
import { AngularFireDatabase, AngularFireObject, AngularFireList } from "angularfire2/database";
import { Observable, Subscription } from "rxjs";
import { flatten, compact } from "lodash";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/operator/take"

import { BaseImageService } from "./image.service";
import { Unsubscribe } from "./unsubscribe";
import { Item } from '../models';
import { ItemWinner } from "../models/item-winner.model";


@Injectable()
export class BaseItemService implements OnDestroy {

    private subs: Subscription[] = [];
    constructor(private db: AngularFireDatabase, private image: BaseImageService) { }

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
     * @returns {Observable<Item>}      A single-return Observable watching a single item.
     */
    one(itemID: string | number): Observable<Item> {
        return this.db.object<Item>("/items/" + itemID).valueChanges().take(1);
    }

    oneWithSubscribe(itemId: string | number): AngularFireObject<Item> {
        return this.db.object<Item>("/items/" + itemId);
    }

    /**
     * @author Anthony Pizzimenti
     * @desc Creates an item.
     * @param {Object} item     Item object.
     * @returns {Promise<any>} Creates a new object in the database.
     */
    create(item: Item): Promise<any> {
        return new Promise((resolve, reject) => {

            // check if item contains required properties
            if (!(item.hasOwnProperty("name") || item.hasOwnProperty("openingBid") || item.hasOwnProperty("bidFloor"))) {
                reject("The provided Item object does not contain the required properties.");
                return;
            }

            if (!(item.hasOwnProperty('ordered'))) {
                item.ordered = false;
            }

            // check if item has a non-empty, non-null list of images attached
            if (item.hasOwnProperty("images") && item["images"] !== null && item["images"].length > 0) {
                let __this = this;

                this.subs.push(this.convertAndUploadImages(item["images"], __this).subscribe((urls) => {
                    item["images"] = urls;
                    this.transcribeObject(item, resolve, reject);
                }));
            } else {
                this.transcribeObject(item, resolve, reject);
            }
        });
    }

    /**
     * @author Anthony Pizzimenti
     * @desc Updates an Item.
     * @param {string | number} itemID  Unique ID for the Item to be updated.
     * @param {Item} item               Item object.
     * @returns {Promise<any>}          Returns true if successful, and an error if it fails.
     */
    update(itemID: string | number, item: Item): Promise<any> {
        let files: File[] = [],
            __this = this;

        // if there's a File object in the new list of images, then add it to a new Files list
        for (let image of item.images) {
            if (image instanceof File)
                files.push(image);
        }
        console.log("files from update", files);
        // create a new Promise
        return new Promise((resolve, reject) => {
            if (files.length !== 0) {
                // if there are File objects in the list of images, store the images
                this.subs.push(this.convertAndUploadImages(files, __this).take(1).subscribe((urls) => {

                    // flatten/remove falsy values from the list so it's flat in the db
                    item.images = compact(flatten(item.images.concat(urls)));
                    this.db.list<Item>("/items").set(itemID.toString(), item)
                        .then(_ => resolve(true))
                        .catch(err => reject(err));
                    return;
                }));
            } else {
                // otherwise, just update the existing values without changing images around
                this.db.list<Item>("/items").update(itemID.toString(), item)
                        .then(_ => resolve(true))
                        .catch(err => reject(err));
                return;
            }
        });
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

    /**
     * @author Anthony Pizzimenti
     * @desc Takes in an Object generic type and assigns all its properties to those of the same name
     * on a new Item.
     * @param {Object} item         Item object.
     * @param {Function} resolve    Promise resolution.
     * @param {Function} reject     Promise rejection.
     * @returns {undefined}
     * @private
     */
    private transcribeObject (item: Object, resolve: Function, reject: Function): void {
        let I = new Item();
        // assign properties to new Item object
        for (let key in item) {
            I[key] = item[key];
        }
        this.db.list("/items").push(I).then((_) => {
            if (_) resolve(_);
            else reject("An error occurred while creating a new Item.");
        });
    }

    /**
     * @author Anthony Pizzimenti
     * @desc Combines all Observables returned from BaseImageService.store() into a single
     * Observable that emits when the last BaseImageService.store() Observable completes.
     * @param {File[]} images            A list of File objects (representing images) to be uploaded.
     * @param {BaseItemService} context  A reference to the current instance's context.
     * @returns {Observable<any>}
     * @private
     */
    private convertAndUploadImages (images: File[], context: BaseItemService): Observable<any> {
        let uploads: Observable<any>[] = [];
        for (let image of images)
            uploads.push(context.image.store(image));

        return Observable.forkJoin(...uploads);
    }

    ngOnDestroy () { }
}
