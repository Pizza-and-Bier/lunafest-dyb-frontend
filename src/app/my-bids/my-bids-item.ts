import { Item } from "../models";

export class MyBidsItem extends Item {
    constructor() {
        super();
    }
    public userWinningItem(userId: string): boolean {
        if (this.currentBid === undefined || this.currentBid === null) {
            return false;
        }
        return this.currentBid.createdBy === userId;
    }
}