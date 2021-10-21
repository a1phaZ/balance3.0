import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFixed'
})
export class ToFixedPipe implements PipeTransform {

  transform(value: number = 0, n: number = 0): number {
    return Number(value.toFixed(n));
  }

}
