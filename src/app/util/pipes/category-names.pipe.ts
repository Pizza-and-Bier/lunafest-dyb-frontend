import { Pipe, PipeTransform } from '@angular/core';

import { dybCategories } from "../../models/categories.const";

@Pipe({
  name: 'categoryNames'
})
export class CategoryNamesPipe implements PipeTransform {

  transform(categories: {[key: string]: boolean}): any {
    const controls = Object.keys(categories);
    const categoryNames = [];
    controls.map(
      (key) => {
        if (categories[key]) {
          categoryNames.push(dybCategories.filter(c => c.controlName === key).pop().label);
        }
      }
    );
    console.log(categoryNames);
    return categoryNames;
  }

}
