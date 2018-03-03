import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models';

@Pipe({
  name: 'itemOrder'
})
export class ItemOrderPipe implements PipeTransform {

  transform(items: Item[]): Item[] {
    if (items === null) {
      return;
    }
    return items.sort(
      (a, b) => {
        if ((a.ordered && !b.ordered) || (a.order > b.order)) {
          return 1;
        }
        if ((b.ordered && !a.ordered) || (b.order > a.order)) {
          return -1;
        }
        if ((!a.hasOwnProperty("order")) || (!b.hasOwnProperty("order")) || (b.order === a.order)) {
          return 0;
        }
      }
    );
  }

}
