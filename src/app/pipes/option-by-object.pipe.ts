import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'optionByObject'
})
export class OptionByObjectPipe implements PipeTransform {

  transform(value: any, key?: string): string {
    if (typeof value === 'string') {
      return value;
    }
    return value[key];
  }

}
