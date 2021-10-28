import { Pipe, PipeTransform } from '@angular/core';
import { formatBalance }       from '../shared/handlers';

@Pipe({
  name: 'balance'
})
export class BalancePipe implements PipeTransform {

  transform(value: number, locale: string = 'ru-RU', currency: string = 'RUB'): string {
    return formatBalance(locale, currency, value);
  }

}
