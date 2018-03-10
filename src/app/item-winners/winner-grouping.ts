import { Item } from "../models";

export class WinnerGrouping {
    uid?: string;
    winner?: string;
    items?: {name: string, amount: number}[];
    paid?: boolean;
}