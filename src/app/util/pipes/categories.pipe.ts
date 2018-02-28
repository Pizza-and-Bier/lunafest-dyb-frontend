import { Pipe, PipeTransform } from '@angular/core';
import { unionBy } from "lodash";

import { Item } from '../../models';

@Pipe({
  name: 'categories'
})
export class CategoriesPipe implements PipeTransform {

  transform(items: Item[], selectedCategories: string[] |null): any {
    if (selectedCategories === null) {
      return items;
    }
    let filteredItems = [];
    for (let i = 0; i < selectedCategories.length; i++) {
      const key = selectedCategories[i];
      // If we already have all the items, no point in going on.
      if (filteredItems.length === items.length) {
        return filteredItems;
      }
      // unionBy will remove any duplications from joining our currently filtered items with any
      // new items that have our category.
      filteredItems = unionBy(filteredItems, items.filter(elem => elem.categories[key]), "key");
    }
    return filteredItems;
  }

}
