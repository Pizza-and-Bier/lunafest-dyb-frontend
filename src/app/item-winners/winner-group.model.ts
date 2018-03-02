import { Item } from "../models";

export class WinnerGroup {
    public winner: {
        id: string;
        name: string;
        paid: boolean;
    };
    public items: Item[];
}