import { Component, Input } from '@angular/core';
import { Arrow } from '../../../models/arrow.model';
import { IItem } from '../../../models/builder-item.model';
import { Random, IRandom } from '../../../models/randomizer.model';
import { builderUUID } from '../../../core/utils/uuid-generator';
import { BuilderFunctionsService } from '../../../services/builder-functions.service';
import { BuilderService } from '../../../services/builder.service';

@Component({
  selector: 'app-randomizer-items',
  templateUrl: './randomizer-items.component.html',
  styleUrls: [
    '../../../assets/general-style.scss',
    './randomizer-items.component.scss',
  ]
})
export class RandomizerItemsComponent {
  @Input() config: IItem;

  constructor(
    public builderFunctionsService: BuilderFunctionsService,
    public builderService: BuilderService,
  ) { }

  changeRangeValue(item: IRandom, value: string) {
    item.value = Number(value);
  }

  setRam(value: KeyboardEvent, item: IRandom): void {
    item.value = Number((value.target as HTMLInputElement).value);
  }

  createNewRandomVariation(data: IRandom[]): void {
    const randomLetter = ['A', 'B', 'C', 'D', 'E', 'F'];
    const dataLetter = [];
    const letterCreate = [];

    data.forEach((item) => dataLetter.push(item.randomLeter));

    randomLetter.forEach((letter, i) => {
      const lt = dataLetter.indexOf(letter);
      if (lt === -1) letterCreate.push({ name: letter, index: i });
    });

    const nextData = data.splice(letterCreate[0].index);
    const i1 = builderUUID();
    data.push(new Random({
      uuid: i1,
      value: 50,
      randomLeter: letterCreate[0].name,
      arrow: {
        from: new Arrow({
          id: i1
        }),
        to: new Arrow()
      }
    }));

    nextData.forEach((item) => data.push(item));
    setTimeout(() => this.builderService.getPointsPosition(), 100);
  }

  deleteAction(config: IRandom[], i: number): void {
    if (config.length > 2) {
      const removeItem = config.splice(i , 1);
      this.builderService.linksArray = this.builderService.linksArray.filter((link, index) => link.toArr[0].fromObj.id !== removeItem[0].uuid);
      setTimeout(() => this.builderService.getPointsPosition(
        this.builderService.config, this.builderService.elem
      ), 10);
    }
  }
}
