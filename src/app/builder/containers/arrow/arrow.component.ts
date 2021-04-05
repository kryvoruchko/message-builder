import { Component, DoCheck, IterableDiffers } from '@angular/core';
import { Arrow, IArrow } from '../../models/arrow.model';
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
        if (data.arrow.to.id) {
          this.builderService.linksArray.push({
            to: data.arrow.to.id,
            toArr: [{ fromObj: data.arrow.from, toObj: data.arrow.to }],
          });
        }

        if (data.type === 'send_message') {
          data.widget_content.forEach((item: any) => {
            if (item.type === 'text' || item.type === 'image') {
              item.params.buttons.forEach((button) => {
                if (button.arrow.to.id) {
                  this.builderService.linksArray.push({
                    to: button.arrow.to.id,
                    toArr: [{ fromObj: button.arrow.from, toObj: button.arrow.to }],
                  });
                }
              });
            } else if (item.type === 'card') {
              item.params.cards_array.forEach((card) => {
                card.buttons.forEach((button) => {
                  if (button.arrow.to.id) {
                    this.builderService.linksArray.push({
                      to: button.arrow.to.id,
                      toArr: [{ fromObj: button.arrow.from, toObj: button.arrow.to }],
                    });
                  }
                });
              });
            }
          });
        } else if (data.type === 'randomizer') {
          (data.widget_content[0] as any).randomData.forEach((item) => {
            if (item.arrow.to.id) {
              this.builderService.linksArray.push({
                to: item.arrow.to.id,
                toArr: [{ fromObj: item.arrow.from, toObj: item.arrow.to }],
              });
            }
          });
        }
      });
    }
  }

  public deleteLink() {
    this.builderService.requestDataItems.forEach((item: any) => {
      if (item.type === 'send_message') {
        if (item.uuid === this.arr.fromObj.id) {
          item.arrow.to = new Arrow();
          item.next_step = null;
        }
        item.widget_content.forEach((data) => {
          if (data.type === 'text' || data.type === 'image') {
            data.params.buttons.forEach((button) => {
              if (button.uuid === this.arr.fromObj.id) {
                button.arrow.to = new Arrow();
                button.next_step = null;
                button.type = null;
              }
            });
          } else if (data.type === 'card') {
            data.params.cards_array.forEach((card) => {
              card.buttons.forEach((button) => {
                if (button.uuid === this.arr.fromObj.id) {
                  button.arrow.to = new Arrow();
                  button.next_step = null;
                  button.type = null;
                }
              });
            });
          }
        });
      } else if (item.type === 'randomizer') {
        item.widget_content[0].randomData.forEach((data) => {
          if (data.uuid === this.arr.fromObj.id) {
            data.arrow.to = new Arrow();
            data.next_step = null;
            data.type = null;
          }
        });
      } else {
        if (item.uuid === this.arr.fromObj.id) {
          item.arrow.to = new Arrow();
          item.next_step = null;
        }
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
}
