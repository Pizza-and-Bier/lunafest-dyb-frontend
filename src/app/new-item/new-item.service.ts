import { Injectable } from '@angular/core';

import { BaseItemService } from '../base-services';
import { Item } from '../models';

@Injectable()
export class NewItemService {

  constructor(private itemService: BaseItemService) { }


  public addNew(newItem: Item): Promise<any> {
    return this.itemService.create(newItem);
  }
}
