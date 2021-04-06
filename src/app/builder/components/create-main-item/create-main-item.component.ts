import { Component, Input } from '@angular/core';
import { BuilderService } from '../../services/builder.service';
import { Arrow } from '../../models/arrow.model';
import { Item } from '../../models/builder-item.model';
import { Child, IChild } from '../../models/child-item.model';
import { Text } from '../../models/text.model';
import { IRandomizer, Random, Randomizer } from '../../models/randomizer.model';
import { builderUUID } from '../../core/utils/uuid-generator';
import { IListItem } from '../../models/list-items.model';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-create-main-item',
  templateUrl: './create-main-item.component.html',
  styleUrls: [
    './create-main-item.component.scss',
    '../../assets/general-style.scss',
  ]
})
export class CreateMainItemComponent {
  @Input() size: number;
  @Input() positionX: number;
  @Input() positionY: number;
  @Input() container: HTMLElement;

  listMainItems: IListItem[] = [];
  openListMainItemsCheck: boolean = false;

  constructor(
    private readonly builderService: BuilderService,
    private readonly settingsService: SettingsService,
  ) {
    this.listMainItems = this.settingsService.listMainItems;
  }

  test() {
    console.log(this.builderService.requestDataItems);
  }

  toggle(): void {
    this.openListMainItemsCheck = !this.openListMainItemsCheck;
  }

  close(): void {
    this.openListMainItemsCheck = false;
  }

  createMainItemComponent(type: string, name: string): void {
    const containerWidth = this.container.clientWidth;
    const containerHeight = this.container.clientHeight;
    const x = this.positionX > 0 ? -this.positionX : Math.abs(this.positionX);
    const y = this.positionY > 0 ? -this.positionY : Math.abs(this.positionY);

    this.openListMainItemsCheck = false;
    const dataId = builderUUID();
    const data = new Item({
      uuid: dataId,
      arrow: {
        to: new Arrow(),
        from: new Arrow({
          id: dataId,
          fromItemX: x + containerWidth / 2 + 200,
          fromItemY: y + containerHeight / 2 - 125
        })
      },
      type,
      name,
      start_step: false,
      next_step: null,
      widget_content: [],
      x: x + containerWidth / 2 - 200,
      y: y + containerHeight / 2 - 125
    });

    this.switchMain(type, data.widget_content);
    this.builderService.requestDataItems.push(data as any);
  }

  switchMain(type: string, data: IChild[] | IRandomizer[]): void {
    const i1 = builderUUID();
    const i2 = builderUUID();

    switch (type) {
      case 'send_message':
        data.push(new Child({
          uuid: i1,
          type: 'text',
          params: new Text({})
        }));
        break;
      case 'randomizer':
        data.push(new Randomizer({
          randomData: [
            new Random({
              random_leter: 'A',
              uuid: i1,
              arrow: {
                from: new Arrow({
                  id: i1
                }),
                to: new Arrow()
              }
            }),
            new Random({
              random_leter: 'B',
              uuid: i2,
              arrow: {
                from: new Arrow({
                  id: i2
                }),
                to: new Arrow()
              }
            })]
        }));
        break;
      default:
        break;
    }
  }
}
