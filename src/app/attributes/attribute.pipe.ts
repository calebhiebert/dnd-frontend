import {Pipe, PipeTransform} from '@angular/core';
import {Attribute} from '../types';

@Pipe({
  name: 'attribute'
})
export class AttributePipe implements PipeTransform {

  transform(value: Attribute[], key: string[]): any {
    let attr: Attribute = null;

    if (value === null || value === undefined) {
      return null;
    }

    value.forEach(a => {
      key.forEach(k => {
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
