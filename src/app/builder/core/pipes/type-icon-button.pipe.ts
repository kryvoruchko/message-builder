import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeIconButton'
})
export class TypeIconButtonPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    switch (value) {
      case 'sendMessage':
        value = '../../../../../assets/img/sendMessage.svg';
        break;
      case 'randomizer':
        value = '../../../../../assets/img/randomizer.svg';
        break;
    }
    return value;
  }
}
