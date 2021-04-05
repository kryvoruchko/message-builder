import { Injectable } from '@angular/core';
import { BuilderService } from './builder.service';
import { Arrow } from '../models/arrow.model';
import { Child } from '../models/child-item.model';
import { IText, Text } from '../models/text.model';
import { Image } from '../models/image.model';
import { Card, CardChild, ICard, ICardChild } from '../models/card.model';
import { IRandomizer, Random, Randomizer } from '../models/randomizer.model';
import { IItem, Item } from '../models/builder-item.model';
import { IChild } from '../models/child-item.model';
import { IButton } from '../models/button.model';
import { builderUUID } from '../core/utils/uuid-generator';

@Injectable({
  providedIn: 'root'
})
export class BuilderFunctionsService {
  public uuid = builderUUID();
  public openListMainItemsCheck = false;
  public position = 10500;

  constructor(
    private readonly builderService: BuilderService,
  ) { }

  deleteMainItem(config: IItem): void {
    this.builderService.openSidebar = false;
    this.builderService.requestDataSidebar = {
      type: 'default',
      name: 'Send message',
      widget_content: []
    };
    this.builderService.requestDataItems.forEach((data, index) => {
      if (data.uuid === config.uuid && data.start_step) {
      } else if (data.uuid === config.uuid && !data.start_step) {
        this.builderService.requestDataItems.splice(index, 1);
        this.deleteAllConnectors(config.uuid);
      }
    });
  }

  deleteAllConnectors(uuid: string): void {
    this.builderService.linksArray.forEach((item, i) => {
      if (item.toArr[0].fromObj.id === uuid) {
        console.log('1');
        this.builderService.linksArray.splice(i, 1);
      } else if (item.toArr[0].toObj.id === uuid) {
        this.builderService.requestDataItems.forEach((data: any) => {
          if (data.arrow.to.id === uuid) {
            data.next_step = null;
            data.arrow.to = new Arrow();
            console.log('2');
            this.builderService.linksArray.splice(i, 1);
          }
          this.deleteVlogElem(data, i, uuid);
        });
      }
    });
  }

  deleteVlogElem(item: IItem, i: number, uuid: string): void {
    if (item.type === 'send_message') {
      item.widget_content.forEach((data) => {
        if (data.type === 'text' || data.type === 'image') {
          data.params.buttons.forEach((button) => {
            if (button.arrow.to.id === uuid) {
              button.next_step = null;
              button.arrow.to = new Arrow();
              console.log('3');
              this.builderService.linksArray.splice(i, 1);
            }
          });
        } else if (data.type === 'card') {
          data.params.cards_array.forEach((card) => {
            card.buttons.forEach((button) => {
              if (button.arrow.to.id === uuid) {
                button.next_step = null;
                button.arrow.to = new Arrow();
                console.log('4');
                this.builderService.linksArray.splice(i, 1);
              }
            });
          });
        }
      });
    } else if (item.type === 'randomizer') {
      (item.widget_content[0] as IRandomizer).randomData.forEach((data) => {
        if (data.arrow.to.id === uuid) {
          data.next_step = null;
          // data.type = null;
          data.arrow.to = new Arrow();
          console.log('5');
          this.builderService.linksArray.splice(i, 1);
        }
      });
    }
  }

  addItemFromSidebar(type: string, array: Child[]): void {
    const data = new Child({
      uuid: builderUUID(),
      type: type,
    });

    switch (type) {
      case 'text':
        data.params = new Text({
          description: '',
          buttons: []
        });
        break;
      case 'image':
        data.params = new Image({
          img_url: '',
          buttons: []
        });
        break;
      case 'card':
        data.params = new CardChild([
          {
            title: '',
            subtitle: '',
            img_url: '',
            url_page: '',
            active: true,
            activeTitlePanel: false,
            activeSubtitlePanel: false,
            buttons: []
          }
        ]);
        break;
      default:
        break;
    }
    array.push(data);

    setTimeout(() => this.builderService.getPointsPosition(), 50);
  }

  deleteItemFromSidebar(item: IChild): void {
    this.builderService.requestDataSidebar.widget_content.forEach((data, index) => {
      if (data.uuid === item.uuid) {
        this.deleteItemsSidebar(item);
        this.builderService.requestDataSidebar.widget_content.splice(index, 1);
        setTimeout(() => this.builderService.getPointsPosition(), 10);
      }
    });
  }

  deleteItemsSidebar(item: IChild): void {
    if (item.hasOwnProperty('type')) {
      if (item.type === 'text' || item.type === 'image') {
        (item.params as IText).buttons.forEach((button) => {
          const index = this.builderService.linksArray.findIndex((link) => link.toArr[0].fromObj.id === button.uuid);
          if (index !== -1) {
            console.log('6');
            this.builderService.linksArray.splice(index, 1);
          }
        });
      } else if (item.type === 'card') {
        (item.params as ICardChild).cards_array.forEach((card) => {
          card.buttons.forEach(button => {
            const index = this.builderService.linksArray.findIndex((link) => link.toArr[0].fromObj.id === button.uuid);
            if (index !== -1) {
              console.log('7');
              this.builderService.linksArray.splice(index, 1);
            }
          });
        });
      }
    }
  }

  cloneItemFromSidebar(item: IChild): void {
    const data = this.cloneObjects(item);
    this.builderService.requestDataSidebar.widget_content.push(data);
  }

  cloneObjects(obj: IChild): IChild {
    const data = JSON.parse(JSON.stringify(obj));

    switch (data.type) {
      case 'text':
        data.uuid = builderUUID();
        this.resetButtonUUID(data.params.buttons);
        break;
      case 'image':
        data.uuid = builderUUID();
        this.resetButtonUUID(data.params.buttons);
        break;
      case 'card':
        data.uuid = builderUUID();
        data.params.cards_array.forEach((card) => {
          this.resetButtonUUID(card.buttons);
        });
        break;
      default:
        break;
    }

    setTimeout(() => this.builderService.getPointsPosition(), 10);

    return data;
  }

  cloneSendMessage(config: IItem): void {
    const data = JSON.parse(JSON.stringify(config));
    const id = builderUUID();
    data['id'] = data['id'] + 1;
    data['uuid'] = id;
    data['start_step'] = false;
    data['x'] = data['x'] + 20;
    data['y'] = data['y'] + 20;
    data['next_step'] = null;
    data.arrow.to = new Arrow();
    data.arrow.from = new Arrow({
      id: id,
      fromItemX: data['x'] + 20 + 400,
      fromItemY: data['y'] + 20,
    });

    data.widget_content.forEach((item) => {
      switch (item.type) {
        case 'text':
          item.uuid = builderUUID();
          this.resetButtonUUID(item.params.buttons);
          break;
        case 'image':
          item.uuid = builderUUID();
          this.resetButtonUUID(item.params.buttons);
          break;
        case 'card':
          item.uuid = builderUUID();
          item.params.cards_array.forEach((card) => {
            this.resetButtonUUID(card.buttons);
          });
          break;
        default:
          break;
      }
    });

    this.builderService.requestDataItems.push(data);
  }

  cloneRandomizer(config: IItem): void {
    const data = JSON.parse(JSON.stringify(config));

    data['id'] = data['id'] + 1;
    data['uuid'] = builderUUID();
    data['start_step'] = false;
    data['x'] = data['x'] + 20;
    data['y'] = data['y'] + 20;

    data.widget_content[0].randomData.forEach((item) => {
      const id = builderUUID();
      item.uuid = id;
      item.next_step = null;
      item.arrow.to = new Arrow();
      item.arrow.from = new Arrow({
        id: id
      });
    });

    this.builderService.requestDataItems.push(data);
  }

  resetButtonUUID(buttons: IButton[]): void {
    buttons.forEach((button) => {
      const id = builderUUID();
      button.uuid = id;
      button.next_step = null;
      if (button.type !== 'open_website' && button.type !== 'call_number') {
        button.type = null;
      }
      button.arrow.to = new Arrow();
      button.arrow.from = new Arrow({
        id: id
      });
    });
  }

  requestDataToSidebar(item: IItem): void {
    this.builderService.checkOpenSidebar = false;
    if (this.builderService.counter === 0 && !this.builderService.statusCreateLink) {
      this.builderService.openSidebar = true;
    } else if (this.builderService.counter === 1 && !this.builderService.statusCreateLink) {
      this.builderService.openSidebar = true;
    }
    if (this.builderService.requestDataSidebar['uuid'] !== item.uuid) {
      this.builderService.requestDataSidebar = item;
    }
  }

  setInputValue(object: any, key: string, value: any) {
    object[key] = value;
  }

  prevCardItem(array: ICard[], index: number): void {
    array[index].active = false;
    array[index - 1].active = true;
  }

  nextCardItem(array: ICard[], index: number): void {
    array[index].active = false;
    array[index + 1].active = true;
  }

  createNewCardItem(array: ICard[], index: number): void {
    array[index].active = false;
    array.push(new Card({}));
  }

  deleteCardItem(array, index, item): void {
    this.deleteItemsSidebar(array[index]);
    if (array.length - 1 === index && array.length !== 1) {
      array[index - 1].active = true;
      array.splice(index, 1);
    } else if (array.length === 1) {
      this.deleteItemFromSidebar(item);
    } else if (array.length - 1 !== index) {
      array[index + 1].active = true;
      array.splice(index, 1);
    }
    setTimeout(() => this.builderService.getPointsPosition(), 10);
  }

  deleteImageCardItem(card: ICard): void {
    card.img_url = null;
  }

  openListMainItems(value: boolean): void {
    this.openListMainItemsCheck = value;
  }

  createMainItemComponent(
    type: string,
    name: string
  ): IItem {
    this.openListMainItemsCheck = false;
    const dataId = builderUUID();
    const data = new Item({
      uuid: dataId,
      arrow: {
        to: new Arrow(),
        from: new Arrow({
          id: dataId,
          fromItemX: this.position + 400,
          fromItemY: this.position
        })
      },
      type: type,
      name: name,
      next_step: null,
      start_step: false,
      widget_content: [],
      x: this.position,
      y: this.position
    });

    this.switchMainData(type, data.widget_content);

    this.builderService.requestDataItems.push(data as any);
    return data;
  }

  switchMainData(type: string, data: IChild[] | IRandomizer[]): void {
    switch (type) {
      case 'send_message':
        data.push(new Child({
          uuid: builderUUID(),
          type: 'text',
          params: new Text({})
        }));
        break;
      case 'randomizer':
        const id1 = builderUUID();
        const id2 = builderUUID();
        data.push(
          new Randomizer({
            randomData: [
              new Random({
                random_leter: 'A',
                uuid: id1,
                arrow: {
                  from: new Arrow({
                    id: id1
                  }),
                  to: new Arrow()
                }
              }),
              new Random({
                random_leter: 'B',
                uuid: id2,
                arrow: {
                  from: new Arrow({
                    id: id2
                  }),
                  to: new Arrow()
                }
              })
            ]
          })
        );
        break;
    }
  }

  deleteNextStep(item: IButton): void {
    item.next_step = null;
    if (!item.hasOwnProperty('widget_content')) {
      if (item.type !== 'open_website') {
        item.type = null;
      }
    }

    this.builderService.linksArray.forEach((link, i) => {
      if (link.toArr[0].fromObj.id === item.uuid) {
        console.log('8');
        this.builderService.linksArray.splice(i, 1);
      }
    });
    if (item.hasOwnProperty('answer_check')) {
      item['buttons'][0].arrow.to = new Arrow();
    } else {
      item.arrow.to = new Arrow();
    }
    setTimeout(() => this.builderService.getPointsPosition(), 10);
  }

  deleteTypeButton(button: IButton): void {
    button.type = null;
    button.btnValue = null;
  }

  deleteButton(array: IButton[], i: number): void {
    this.deleteNextStep(array[i]);
    const item = array.splice(i, 1);
  }

  transitionToNextStep(next_step: string): void {
    this.builderService.requestDataItems.forEach((item) => {
      if (item.uuid === next_step) {
        this.builderService.requestDataSidebar = item;
      }
    });
  }

  setStartingStep(config: IItem): void {
    this.builderService.requestDataItems.forEach((data) => {
      data.start_step = false;
    });
    config.start_step = true;
  }
}
