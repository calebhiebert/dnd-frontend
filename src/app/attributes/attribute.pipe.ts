import {Pipe, PipeTransform} from '@angular/core';
import {Attribute} from '../types';

@Pipe({
  name: 'attribute'
})
export class AttributePipe implements PipeTransform {

  transform(value: Attribute[], key: string): any {
    let attr: Attribute = null;

    if (value === null || value === undefined) {
      return '';
    }

    value.forEach(a => {
      if (a.key.trim().toLowerCase() === key.trim().toLowerCase()) {
        attr = a;
      }
    });

    if (attr === null) {
      return '';
    }

    return `${attr.key}: ${(attr.nValue || attr.sValue)}`;
  }
}
