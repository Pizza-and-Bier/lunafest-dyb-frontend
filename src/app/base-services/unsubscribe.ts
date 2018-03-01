import { Subscriber } from "rxjs";

/**
 * @author Anthony Pizzimenti
 * @desc Decorator to remove all Subscriptions from services.
 * @param {Function} constructor    Constructor for the decorated class.
 * @returns {undefined} 
 */
export function Unsubscribe (constructor: Function): void {

    /**
     * @author Anthony Pizzimenti
     * @desc Reimplements the ngOnDestroy method in each service class.
     * @returns {undefined}
     */
    constructor.prototype.ngOnDestroy = function () {
        console.log("called");
        for (let sub in this.subs) {
            if (sub) {
                sub["unsubscribe"]();
            }
        }
    }
}
