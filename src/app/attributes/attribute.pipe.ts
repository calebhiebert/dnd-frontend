import {Pipe, PipeTransform} from '@angular/core';
import {Attribute} from '../types';

@Pipe({
  name: 'attribute'
})
export class AttributePipe implements PipeTransform {

  transform(value: Attribute[], keys: string[]): any {
    let attr: Attribute = null;

    if (value === null || value === undefined || !Array.isArray(keys)) {
      return null;
    }

    value.forEach(a => {
      keys.forEach(k => {
        if (a.key.trim().toLowerCase() === k.trim().toLowerCase()) {
          attr = a;
        }
      });
    });

    if (attr === null) {
      return '';
    }

    return attr.value;
  }
}
