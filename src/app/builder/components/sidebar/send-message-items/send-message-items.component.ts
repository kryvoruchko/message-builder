import { Component, Input, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { BuilderFunctionsService } from '../../../services/builder-functions.service';
import { BuilderService } from '../../../services/builder.service';

@Component({
  selector: 'app-send-message-items',
  templateUrl: './send-message-items.component.html',
  styleUrls: [
    './send-message-items.component.scss',
    '../../../assets/general-style.scss',
  ]
})
export class SendMessageItemsComponent implements OnInit {
  @Input() config: any;

  public replaceDataIds = [];
  public replaceDataCoordinates = {
    differenceX: 0,
    differenceY: 0
  };

  constructor(
    public builderService: BuilderService,
    public builderFunctionsService: BuilderFunctionsService,
    private dragulaService: DragulaService
  ) {
    dragulaService.destroy('HANDLES');

    dragulaService.createGroup('HANDLES', {
      moves: (el, container, handle) => {
        return handle.className === 'fas fa-arrows-alt-v';
      }
    });

    dragulaService.dropModel().subscribe((value) => {
      if (this.builderService.counterDrag === 0) {
        setTimeout(() => this.builderService.dragRequest(), 10);
      }
    });
  }

  ngOnInit() {
    this.dragulaService.drag().subscribe(() => {
      this.builderService.counterDrag = 0;
    });
  }

  public setInputValue(object, key, value) {
    object[key] = value;
  }

  public replaceMainItems(item, dataIds) {
    if (!dataIds) {
      this.replaceDataIds.push(item.uuid);
      this.replaceArrows(item.arrow, dataIds);
    } else {
      item.uuid = this.replaceId(item.uuid, dataIds);
      this.replaceArrows(item.arrow, dataIds);
      item.x = item.x + this.replaceDataCoordinates.differenceX;
      item.y = item.y + this.replaceDataCoordinates.differenceY;
    }

    if (item.nextStep) {
      if (!dataIds) {
        this.replaceDataIds.push(item.nextStep);
      } else {
        item.nextStep = this.replaceId(item.nextStep, dataIds);
      }
    }

    switch (item.type) {
      case 'sendMessage':
        this.replaceSendMessage(item, dataIds);
        break;
      case 'randomizer':
        this.replaceRandomizer(item, dataIds);
        break;
    }
  }

  public replaceRandomizer(data, dataIds) {
    data.widgetContent[0].randomData.forEach((item) => {
      if (!dataIds) {
        this.replaceDataIds.push(item.uuid);
        this.replaceArrows(item.arrow, dataIds);
      } else {
        item.uuid = this.replaceId(item.uuid, dataIds);
        this.replaceArrows(item.arrow, dataIds);
      }
      if (item.nextStep) {
        if (!dataIds) {
          this.replaceDataIds.push(item.nextStep);
        } else {
          item.nextStep = this.replaceId(item.nextStep, dataIds);
        }
      }
    });
  }

  public replaceArrows(arrow, dataIds) {
    const keys = ['from', 'to'];
    keys.forEach(k => {
      if (arrow[k].id) {
        if (!dataIds) {
          this.replaceDataIds.push(arrow[k].id);
        } else {
          arrow[k].id = this.replaceId(arrow[k].id, dataIds);
          arrow[k].fromItemX = arrow[k].fromItemX + this.replaceDataCoordinates.differenceX;
          arrow[k].fromItemY = arrow[k].fromItemY + this.replaceDataCoordinates.differenceY;
        }
      }
    });
  }

  public replaceSendMessage(data, dataIds) {
    data.widgetContent.forEach(item => {
      (!dataIds) ?
        this.replaceDataIds.push(item.uuid) :
        item.uuid = this.replaceId(item.uuid, dataIds);

      switch (item.type) {
        case 'text':
          this.replaceButton(item.params.buttons, dataIds);
          break;
        case 'image':
          this.replaceButton(item.params.buttons, dataIds);
          break;
        case 'card':
          item.params.cardsArray.forEach(card => {
            this.replaceButton(card.buttons, dataIds);
          });
          break;
      }
    });
  }

  public replaceButton(data, dataIds) {
    if (data && data.length > 0) {
      data.forEach(button => {
        if (!dataIds) {
          this.replaceDataIds.push(button.uuid);
        } else {
          button.uuid = this.replaceId(button.uuid, dataIds);
        }
        this.replaceArrows(button.arrow, dataIds);
        if (button.nextStep) {
          if (!dataIds) {
            this.replaceDataIds.push(button.nextStep);
          } else {
            button.nextStep = this.replaceId(button.nextStep, dataIds);
          }
        }
      });
    }
  }

  public replaceId(id, data) {
    let returnID = '';
    data.forEach(item => {
      if (item.oldId === id) {
        returnID = item.newId;
      }
    });
    return returnID;
  }
}
