import { Injectable } from '@angular/core';
import { DEFAULT_BUILDER_DATA } from '../core/constants/builder-default';
import { IArrow } from '../models/arrow.model';
import { IItem } from '../models/builder-item.model';
import { IButton } from '../models/button.model';
import { ILink, ILinkItem } from '../models/link.model';
import { IRandom, IRandomizer } from '../models/randomizer.model';

@Injectable()
export class BuilderService {
  public requestDataSidebar: IItem = DEFAULT_BUILDER_DATA;
  public requestDataItems: IItem[] = [
    {
      uuid: '27c5a143-9d9b-43b7-af14-11cbba435faa',
      arrow: {
        from: {
          id: '27c5a143-9d9b-43b7-af14-11cbba435faa',
          toItemX: null,
          toItemY: null,
          fromItemX: 9844.285714285714,
          fromItemY: 9789.285714285714
        },
        to: {
          id: 'e8433e9f-55f3-4438-84cc-f3d83e5fc280',
          toItemX: 10141.42857142857,
          toItemY: 9653.57142857143,
          fromItemX: null,
          fromItemY: null
        }
      },
      type: 'sendMessage',
      name: 'Send Message',
      nextStep: 'e8433e9f-55f3-4438-84cc-f3d83e5fc280',
      startStep: false,
      widgetContent: [
        {
          uuid: '29fe73d9-9ce2-43da-bba7-1583b7e7b884',
          type: 'text',
          params: {
            description: '',
            buttons: []
          }
        }
      ],
      x: 9444.285714285714,
      y:9789.285714285714
    },
    {
      uuid: 'e8433e9f-55f3-4438-84cc-f3d83e5fc280',
      arrow: {
        from: {
          id: 'e8433e9f-55f3-4438-84cc-f3d83e5fc280',
          toItemX: null,
          toItemY: null,
          fromItemX: 10541.42857142857,
          fromItemY:9653.57142857143
        },
        to: {
          id: null,
          toItemX: null,
          toItemY: null,
          fromItemX: null,
          fromItemY: null
        }
      },
      type: 'sendMessage',
      name: 'Send Message',
      nextStep: null,
      startStep: false,
      widgetContent: [
        {
          uuid: '608ccbc4-e8a7-480a-82a5-43268efc4d86',
          type: 'text',
          params: {
            description: '',
            buttons: []
          }
        }
      ],
      x: 10141.42857142857,
      y: 9653.57142857143
    }
  ];

  public linksArray: ILink[] = [];
  public prev: IArrow[] = [];
  public openSidebar: boolean = false;
  public checkOpenSidebar: boolean = false;
  public counterDrag: number = 0;
  public zeroPointX: number = 0;
  public zeroPointY: number = 0;
  public counter: number = 0;
  public statusCreateLink: string = '';
  public elemLocation: ClientRect;
  public ids: (IRandom | IButton)[];
  public elem: HTMLElement;
  public config: IItem;
  public scale: number;
  public obj: ILink;
  public parentElem: IItem;

  dragRequest(): void {
    if (this.counterDrag === 0) {
      this.getPointsPosition();
    }
    this.counterDrag++;
  }

  removeLastLink(): void {
    this.statusCreateLink = null;
    this.obj = null;
    this.linksArray.pop();
  }

  onMouseMove(e: any, moving: boolean): void {
    if (this.obj) {
      let moveTop = 0;
      let moveLeft = 0;
      if (moving) {
        moveTop = this.zeroPointY;
        moveLeft = this.zeroPointX;
      } else {
        moveTop = 0;
        moveLeft = 0;
      }

      const pointLocationTop = ((e.pageY - this.elemLocation.top) / this.scale + this.config.y) - moveTop;
      const pointLocationLeft = ((e.pageX - this.elemLocation.left) / this.scale + this.config.x) - moveLeft;
      this.obj.toArr[0].toObj.toItemX = pointLocationLeft;
      this.obj.toArr[0].toObj.toItemY = pointLocationTop;
    }
  }

  scaleMove(): void {
    if (this.obj) {
      setTimeout(() => this.elemLocation = this.elem.getBoundingClientRect(), 10);
    }
  }

  createMouseLink(button: IButton): void {
    this.openSidebar = false;
    this.statusCreateLink = 'all';
    this.linksArray.push({
      to: button.arrow.to.id,
      toArr: [{
        fromObj: button.arrow.from,
        toObj: {
          id: 'mouse',
          toItemX: button.arrow.from.fromItemX,
          toItemY: button.arrow.from.fromItemY,
          fromItemX: null,
          fromItemY: null,
        }
      }],
    });
    this.parentElem = this.config;
    this.obj = this.linksArray.find(link => link.toArr[0].toObj.id === 'mouse');
  }

  setLink(): void {
    const res = this.linksArray.find(link => link.toArr[0].toObj.id === 'mouse');
    this.obj.toArr[0].toObj.toItemX = this.config.x;
    this.obj.toArr[0].toObj.toItemY = this.config.y;
    this.obj.toArr[0].toObj.id = this.config.uuid;
    this.obj.to = this.config.uuid;

    this.requestDataItems.forEach((item: any) => {
      if (item.type === 'sendMessage') {
        this.setLinkData(item, res);
        item.widgetContent.forEach((data) => {
          if (data.type === 'text' || data.type === 'image') {
            data.params.buttons.forEach((button) => {
              this.setLinkData(button, res);
            });
          } else if (data.type === 'card') {
            data.params.cardsArray.forEach((card) => {
              card.buttons.forEach((button) => {
                this.setLinkData(button, res);
              });
            });
          }
        });
      } else if (item.type === 'randomizer') {
        (item.widgetContent[0] as IRandomizer).randomData.forEach((data) => {
          this.setLinkData(data, res);
        });
      } else {
        this.setLinkData(item, res);
      }
    });

    this.deleteOldLink(this.obj.toArr[0]);
    this.obj = null;
    this.statusCreateLink = null;
  }

  setLinkData(item: any, res: any): void {
    if (item.uuid === res.toArr[0].fromObj.id) {
      item.arrow.to = this.obj.toArr[0].toObj;
      item.nextStep = this.config.uuid;
    }
  }

  deleteOldLink(arrow: ILinkItem): void {
    const arr = [];
    this.linksArray.forEach((link, index) => {
      if (link.toArr[0].fromObj.id === arrow.fromObj.id) {
        arr.push(index);
      }
    });

    if (arr.length > 1) {
      this.linksArray.splice(arr[0], 1);
    }
  }

  sortOutData(data: IItem[], config: IItem): void {
    data.forEach((item) => {
      if (item.arrow) {
        if (item.arrow.to.id === config.uuid) {
          this.prev.push(item.arrow.to);
        }
      }
      this.bustData(item, config.uuid);
    });
  }

  bustData(item: IItem, uuid: string): void {
    if (item.type === 'sendMessage') {
      item.widgetContent.forEach((data) => {
        if (data.type === 'text' || data.type === 'image') {
          data.params.buttons.forEach((button) => {
            if (button.arrow.to.id === uuid) {
              this.prev.push(button.arrow.to);
            }
          });
        } else if (data.type === 'card') {
          data.params.cardsArray.forEach((card) => {
            card.buttons.forEach((button) => {
              if (button.arrow.to.id === uuid) {
                this.prev.push(button.arrow.to);
              }
            });
          });
        }
      });
    } else if (item.type === 'randomizer') {
      (item.widgetContent[0] as IRandomizer).randomData.forEach((data) => {
        if (data.arrow.to.id === uuid) {
          this.prev.push(data.arrow.to);
        }
      });
    }
  }

  getPointsPosition(
    config: IItem = this.config,
    elem: HTMLElement = this.elem
  ): void {
    if (elem) {
      this.elemLocation = this.elem.getBoundingClientRect();
      this.ids = this.collectionItemsId(config);
      this.config = config;
      this.forId();
    }
  }

  forId(): void {
    if (this.elem) {
      this.elemLocation = this.elem.getBoundingClientRect();
      if (this.ids && this.ids.length > 0) {
        this.ids.forEach(item => {
          const point = document.getElementById(item.uuid);
          const location = point.getBoundingClientRect();
          const pointLocationTop = (location.top - this.elemLocation.top) / this.scale + this.config.y;
          const pointLocationLeft = (location.left - this.elemLocation.left) / this.scale + this.config.x;
          item.arrow.from.fromItemX = pointLocationLeft + 5;
          item.arrow.from.fromItemY = pointLocationTop - 15;
        });
      }
    }
  }

  collectionItemsId(config: IItem): (IRandom | IButton)[] {
    const idArray = [];
    if (config.type === 'sendMessage') {
      config.widgetContent.forEach((data) => {
        if (data.type === 'text' || data.type === 'image') {
          data.params.buttons.forEach((button) => {
            idArray.push(button);
          });
        } else if (data.type === 'card') {
          data.params.cardsArray.forEach((card) => {
            card.buttons.forEach((button) => {
              idArray.push(button);
            });
          });
        }
      });
    } else if (config.type === 'randomizer') {
      (config.widgetContent[0] as IRandomizer).randomData.forEach((data) => {
        idArray.push(data);
      });
    }
    return idArray;
  }
}
