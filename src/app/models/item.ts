import { Bid } from "./bid";

export class Item {
    public key?: string|null;
    public name: string;
    public description?: string;
    public estimatedValue?: number;
    public currentBid?: Bid;
    public openingBid: number;
    public bidFloor: number;
    public categories?: string[];
    public images?: any[];
    public bidders?: Object;
    public donorInfo?: string;
}
