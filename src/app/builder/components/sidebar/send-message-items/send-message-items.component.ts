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

    if (item.next_step) {
      if (!dataIds) {
        this.replaceDataIds.push(item.next_step);
      } else {
        item.next_step = this.replaceId(item.next_step, dataIds);
      }
    }

    switch (item.type) {
      case 'send_message':
        this.replaceSendMessage(item, dataIds);
        break;
      case 'randomizer':
        this.replaceRandomizer(item, dataIds);
        break;
    }
  }

  public replaceRandomizer(data, dataIds) {
    data.widget_content[0].randomData.forEach((item) => {
      if (!dataIds) {
        this.replaceDataIds.push(item.uuid);
        this.replaceArrows(item.arrow, dataIds);
      } else {
        item.uuid = this.replaceId(item.uuid, dataIds);
        this.replaceArrows(item.arrow, dataIds);
      }
      if (item.next_step) {
        if (!dataIds) {
          this.replaceDataIds.push(item.next_step);
        } else {
          item.next_step = this.replaceId(item.next_step, dataIds);
        }
      }
    });
  }

  public replaceArrows(arrow, dataIds) {
    if (arrow.from.id) {
      if (!dataIds) {
        this.replaceDataIds.push(arrow.from.id);
      } else {
        arrow.from.id = this.replaceId(arrow.from.id, dataIds);
        arrow.from.fromItemX = arrow.from.fromItemX + this.replaceDataCoordinates.differenceX;
        arrow.from.fromItemY = arrow.from.fromItemY + this.replaceDataCoordinates.differenceY;
      }
    }
    if (arrow.to.id) {
      if (!dataIds) {
        this.replaceDataIds.push(arrow.to.id);
      } else {
        arrow.to.id = this.replaceId(arrow.to.id, dataIds);
        arrow.to.toItemX = arrow.to.toItemX + this.replaceDataCoordinates.differenceX;
        arrow.to.toItemY = arrow.to.toItemY + this.replaceDataCoordinates.differenceY;
      }
    }
  }

  public replaceSendMessage(data, dataIds) {
    data.widget_content.forEach(item => {
      switch (item.type) {
        case 'text':
          if (!dataIds) {
            this.replaceDataIds.push(item.uuid);
          } else {
            item.uuid = this.replaceId(item.uuid, dataIds);
          }
          this.replaceButton(item.params.buttons, dataIds);
          break;
        case 'image':
          if (!dataIds) {
            this.replaceDataIds.push(item.uuid);
          } else {
            item.uuid = this.replaceId(item.uuid, dataIds);
          }
          this.replaceButton(item.params.buttons, dataIds);
          break;
        case 'card':
          if (!dataIds) {
            this.replaceDataIds.push(item.uuid);
          } else {
            item.uuid = this.replaceId(item.uuid, dataIds);
          }
          item.params.cards_array.forEach(card => {
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
        if (button.next_step) {
          if (!dataIds) {
            this.replaceDataIds.push(button.next_step);
          } else {
            button.next_step = this.replaceId(button.next_step, dataIds);
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
