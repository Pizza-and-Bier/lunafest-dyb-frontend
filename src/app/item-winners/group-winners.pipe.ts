import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupWinners'
})
export class GroupWinnersPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
