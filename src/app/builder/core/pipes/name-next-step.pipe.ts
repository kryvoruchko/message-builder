import { Pipe, PipeTransform } from '@angular/core';
import { BuilderService } from '../../services/builder.service';

@Pipe({
  name: 'nameNextStep'
})
export class NameNextStepPipe implements PipeTransform {
  constructor(private builderService: BuilderService) {}

  transform(value: any, args?: any): any {
    let name = '';
    this.builderService.requestDataItems.forEach((item) => {
      if (item.uuid === value) name = item.name;
    });
    return name;
  }
}
