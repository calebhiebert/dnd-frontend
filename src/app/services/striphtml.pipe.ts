import { Pipe, PipeTransform } from '@angular/core';
import * as striptags from 'striptags';

@Pipe({
  name: 'striphtml'
})
export class StriphtmlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return striptags(value);
  }

}
