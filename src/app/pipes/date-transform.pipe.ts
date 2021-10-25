import { Pipe, PipeTransform } from '@angular/core';
import { compareDate }         from '../shared/handlers';

@Pipe({
  name: 'dateTransform'
})
export class DateTransformPipe implements PipeTransform {

  transform(value: number): string {
    const today = new Date();
    const _value = new Date(value);

    if (compareDate(today, _value)) {
      return 'Сегодня';
    }
    return new Intl.DateTimeFormat('ru-RU', {day: 'numeric', month: 'short', year: 'numeric'}).format(new Date(value));
  }

}

