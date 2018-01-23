import { Bid } from "./bid";
import { DybImage } from "./dyb-image";

export class Item {
    public id: number|null;
    public name: string;
    public description: string;
    public estimatedValue: number;
    public openingBid: Bid;
    public category: string;
    public images: DybImage[];
}
