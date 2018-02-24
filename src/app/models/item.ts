import { Bid } from "./bid";
import { DybImage } from "./dyb-image";

export class Item {
    public key?: string|null;
    public name: string;
    public description?: string;
    public estimatedValue?: number;
    public currentBid?: Bid;
    public openingBid: number;
    public bidFloor: number;
    public categories?: string[];
    public images?: string[];
    public bidders?: Object;
    public donor?: string;
}
