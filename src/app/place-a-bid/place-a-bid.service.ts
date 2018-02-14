import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Injectable()
export class PlaceABidService {

  constructor() { }

  public placeBid(itemId: number, bidAmount: number): Observable<any> {
    return Observable.of({});
  }

}
