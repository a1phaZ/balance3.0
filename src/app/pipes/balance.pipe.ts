import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'balance'
})
export class BalancePipe implements PipeTransform {

  transform(value: number, locale: string = 'ru-RU', currency: string = 'RUB'): string {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
  }

}
