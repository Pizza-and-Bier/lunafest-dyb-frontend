import { Item } from "../models";

export class MyBidsItem extends Item {
    constructor() {
        super();
    }
    public userWinningItem(userId: string): boolean {
        return this.currentBid.createdBy === userId;
    }
}