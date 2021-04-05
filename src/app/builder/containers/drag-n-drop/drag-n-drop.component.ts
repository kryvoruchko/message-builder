import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IItem } from '../../models/builder-item.model';
import { BuilderService } from '../../services/builder.service';

@Component({
  template: ``
})
export class DragNDropComponent implements OnInit, AfterViewInit {
  @Input() config: IItem;
  @Input() scale: number;

  public positionX = 0;
  public positionY = 0;
  public count = 0;

  protected startContainerPositionX = 0;
  protected startContainerPositionY = 0;
  protected draggable = false;
  protected moving = false;
  protected isItem = false;

  private configMain: any;
  private startMousePositionX = 0;
  private startMousePositionY = 0;

  constructor (
    public readonly builderService: BuilderService,
    public cd: ChangeDetectorRef,
  ) { }

  ngOnInit () {
  }

  ngAfterViewInit() {
    this.positionX = this.config && this.config.x;
    this.positionY = this.config && this.config.y;
    this.cd.detectChanges();
  }

  public mouseDown(
    event: any,
    config: IItem,
    data: IItem[],
    elem: HTMLElement
  ): void {
    this.builderService.counter = 0;
    this.builderService.prev = [];
    this.isItem = !!event.target['dataset']['drag'];
    this.startContainerPositionX = this.positionX;
    this.startContainerPositionY = this.positionY;
    this.startMousePositionX = event.clientX;
    this.startMousePositionY = event.clientY;
    this.builderService.elem = elem;
    this.builderService.scale = this.scale;
    this.builderService.config = this.config;
    this.draggable = true;
    this.moving = true;

    this.builderService.getPointsPosition(config, elem);
    this.builderService.sortOutData(data, config);
    this.configMain = JSON.parse(JSON.stringify(config));
  }

  public mouseUp(): void {
    this.builderService.checkOpenSidebar = true;
    this.startMousePositionX = 0;
    this.startMousePositionY = 0;
    this.draggable = false;
    this.moving = false;
    this.isItem = false;
    if (this.configMain && this.configMain.uuid === this.config.uuid) {
      if (this.configMain.x !== this.config.x || this.configMain.y !== this.config.y) {
        this.configMain = null;
      }
    }
    if (this.count === 0) {
      if (this.builderService.obj && this.builderService.requestDataSidebar.type !== 'default' &&
        this.builderService.parentElem.uuid !== this.builderService.config.uuid) {
        this.builderService.setLink();
      } else if (this.builderService.obj && this.builderService.requestDataSidebar.type !== 'default' &&
        this.builderService.parentElem.uuid === this.builderService.config.uuid) {
        this.builderService.removeLastLink();
      }
    }
  }

  public move(event: MouseEvent, config: IItem, data): void {
    if (this.moving && this.draggable && this.isItem) {
      this.builderService.counter++;
      const zpx = event.clientX - this.startMousePositionX;
      const zpy = event.clientY - this.startMousePositionY;
      this.positionX = this.startContainerPositionX + zpx / this.scale;
      this.positionY = this.startContainerPositionY + zpy / this.scale;
      this.config.x = this.positionX;
      this.config.y = this.positionY;

      this.builderService.openSidebar = false;
      this.builderService.requestDataSidebar = {
        type: 'default',
        name: 'Send Message',
        widget_content: []
      };

      this.moveArrow(config, this.positionX, this.positionY, data);
    }
  }

  private moveArrow (config: IItem, x: number, y: number, data) {
    config.arrow.from.fromItemX = x + 400;
    config.arrow.from.fromItemY = y;
    this.builderService.forId();
    this.builderService.prev.forEach((item) => {
      item.toItemX = x;
      item.toItemY = y;
    });
  }
}