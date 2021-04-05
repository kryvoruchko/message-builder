import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeIconButton'
})
export class TypeIconButtonPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    switch (value) {
      case 'send_message':
        value = '../../../../../assets/img/send_message.svg';
        break;
      case 'randomizer':
        value = '../../../../../assets/img/randomizer.svg';
        break;
    }
    return value;
  }
}
