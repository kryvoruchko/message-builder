import { Component, DoCheck, IterableDiffers } from '@angular/core';
import { Arrow, IArrow } from '../../models/arrow.model';
import { IItem } from '../../models/builder-item.model';
import { IRandom, IRandomizer } from '../../models/randomizer.model';
import { BuilderService } from '../../services/builder.service';
import set = Reflect.set;

@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.scss']
})
export class ArrowComponent implements DoCheck {
  public arrows = Array<IArrow>();
  private differ: any;
  public arr: any;
  public openBtn = false;

  constructor(
    public readonly builderService: BuilderService,
    private readonly differs: IterableDiffers
  ) {
    this.differ = differs.find([]).create(null);
  }

  ngDoCheck() {
    const change = this.differ.diff(this.builderService.requestDataItems);
    if (change) {
      this.builderService.linksArray = [];
      this.builderService.requestDataItems.forEach((data: any) => {
        this.setToLink(data);

        if (data.type === 'send_message') {
          data.widget_content.forEach(item => {
            if (item.type === 'text' || item.type === 'image') {
              item.params.buttons.forEach((button) => {
                this.setToLink(button);
              });
            } else if (item.type === 'card') {
              item.params.cards_array.forEach((card) => {
                card.buttons.forEach((button) => {
                  this.setToLink(button);
                });
              });
            }
          });
        } else if (data.type === 'randomizer') {
          (data.widget_content[0] as IRandomizer).randomData.forEach((item) => {
            this.setToLink(item);
          });
        }
      });
    }
  }

  public deleteLink() {
    this.builderService.requestDataItems.forEach((item: any) => {
      if (item.type === 'send_message') {
        this.setDefaultLink(item, this.arr.fromObj.id, false);
        item.widget_content.forEach((data) => {
          if (data.type === 'text' || data.type === 'image') {
            data.params.buttons.forEach((button) => {
              this.setDefaultLink(button, this.arr.fromObj.id, true);
            });
          } else if (data.type === 'card') {
            data.params.cards_array.forEach((card) => {
              card.buttons.forEach((button) => {
                this.setDefaultLink(button, this.arr.fromObj.id, true);
              });
            });
          }
        });
      } else if (item.type === 'randomizer') {
        item.widget_content[0].randomData.forEach((data) => {
          this.setDefaultLink(data, this.arr.fromObj.id, true);
        });
      } else {
        this.setDefaultLink(item, this.arr.fromObj.id, false);
      }
    });
    this.openBtn = false;
    const index = this.builderService.linksArray.findIndex(link => link.toArr[0] === this.arr);
    this.builderService.linksArray.splice(index, 1);
    this.arr = null;
  }

  public openRemoveBtn(arrow, value) {
    this.arr = arrow;
    this.openBtn = value;
  }

  private setToLink(item: IItem | IRandom): void {
    if (item.arrow.to.id) {
      this.builderService.linksArray.push({
        to: item.arrow.to.id,
        toArr: [{ fromObj: item.arrow.from, toObj: item.arrow.to }],
      });
    }
  }

  private setDefaultLink(data: any, id: string, setType: boolean = false): void {
    if (data.uuid === id) {
      data.arrow.to = new Arrow();
      data.next_step = null;

      if (setType) data.type = null;
    }
  }
}
