import { Pipe, PipeTransform } from '@angular/core';

import { Item } from '../../models';

@Pipe({
  name: 'winnerTotal'
})
export class WinnerTotalPipe implements PipeTransform {

  transform(items: {name: string, amount: number}[]): any {
    if (items === null) {
      return;
    }
    return items.reduce((acc, curr) => acc + curr.amount, 0);
  }

}
