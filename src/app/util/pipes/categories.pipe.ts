import { Pipe, PipeTransform } from '@angular/core';
import { intersection } from "lodash";

import { Item } from '../../models';

@Pipe({
  name: 'categories'
})
export class CategoriesPipe implements PipeTransform {

  transform(items: Item[], selectedCategories: {[key: string]: boolean}|null): any {
    if (selectedCategories === null) {
      return items;
    }
    const newItems = items.filter(
      (item) => {
        if (item.categories === undefined) {
          return true;
        }
        for (const key in selectedCategories) {
          if (selectedCategories[key] !== item.categories[key]) {
            return false;
          }
        }
        return true;
      }
    );
    console.log(newItems);
    return newItems;
  }

}
