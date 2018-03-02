import { Pipe, PipeTransform } from '@angular/core';

import { Item } from '../../models';

@Pipe({
  name: 'winnerTotal'
})
export class WinnerTotalPipe implements PipeTransform {

  transform(items: Item[]): any {
    return items.reduce((acc, curr) => acc + curr.currentBid.amount, 0);
  }

}
