import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { IItem } from '../../models/builder-item.model';
import { BuilderService } from '../../services/builder.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit, AfterViewInit {
  @Input() public view: string = 'edit';

  @ViewChild('builderContainer') public builderContainer: ElementRef;

  public scaleList = [1, .95, .9, .85, .8, .75, .7, .65, .6, .55, .5, .45, .4, .35];
  public items = Array<IItem>();
  public canvasSize = 20000;
  public positionX = 10000;
  public positionY = 10000;
  public scale = .7;

  private startContainerPositionX = 0;
  private startContainerPositionY = 0;
  private startMousePositionX = 0;
  private startMousePositionY = 0;
  private containerHeight = 0;
  private containerWidth = 0;
  private draggable = false;
  private moving = false;
  private isItem = false;

  constructor(
    public readonly builderService: BuilderService,
    private cdRef: ChangeDetectorRef
  ) { }

  public ngOnInit() {
    this.items = this.builderService.requestDataItems;
    this.builderService.openSidebar = false;
    this.builderService.scale = this.scale;
  }

  public ngAfterViewInit() {
    this.containerWidth = this.builderContainer.nativeElement.clientWidth;
    this.containerHeight = this.builderContainer.nativeElement.clientHeight;
    this.positionX = (this.containerWidth / 2) - (this.canvasSize / 2);
    this.positionY = (this.containerHeight / 2) - (this.canvasSize / 2);
    this.cdRef.detectChanges();
  }

  public mouseUp(): void {
    setTimeout(() => {
      if (this.builderService.checkOpenSidebar) {
        this.builderService.openSidebar = false;
        this.builderService.requestDataSidebar = {
          type: 'default',
          name: 'Send message',
          widget_content: []
        };
      }
    }, 50);
    this.startMousePositionX = 0;
    this.startMousePositionY = 0;
    this.draggable = false;
    this.moving = false;
    this.isItem = false;
  }

  public mouseDown(event: MouseEvent): void {
    this.builderService.counter = 0;
    this.isItem = !!event.target['dataset']['drag'];
    this.startContainerPositionX = this.positionX;
    this.startContainerPositionY = this.positionY;
    this.startMousePositionX = event.clientX;
    this.startMousePositionY = event.clientY;
    this.draggable = true;
    this.moving = true;
  }

  public overToCanvasContainer(): void {
    this.moving = true;
  }

  public leaveFromCanvasContainer(): void {
    this.moving = false;
  }

  public wheelCanvasContainer(obj: any) {
    const index = this.scaleList.indexOf(this.scale);
    obj.direction > 0 ? this.incrementScale(index) : this.decrementScale(index);
    this.builderService.scaleMove();
  }

  private incrementScale(value: number) {
    const scale = this.scaleList[value + 1];
    if (scale) {
      this.scale = scale;
      this.builderService.scale = scale;
    }
  }

  private decrementScale(value: number) {
    const scale = this.scaleList[value - 1];
    if (scale) {
      this.scale = scale;
      this.builderService.scale = scale;
    }
  }

  public zoomBuilder(event, number) {
    const index = this.scaleList.indexOf(this.scale);
    (number > 0) ? this.incrementScale(index) : this.decrementScale(index);
    this.builderService.scaleMove();
    const e = window.event;

    e.returnValue = false;
    if (e.preventDefault) {
      e.preventDefault();
    }
  }

  public move(event: MouseEvent): void {
    this.builderService.onMouseMove(event, this.draggable);

    if (this.moving && this.draggable && !this.isItem) {
      const zpx = event.clientX - this.startMousePositionX;
      const zpy = event.clientY - this.startMousePositionY;
      this.positionX = this.startContainerPositionX + zpx;
      this.positionY = this.startContainerPositionY + zpy;
      this.builderService.zeroPointX = zpx;
      this.builderService.zeroPointY = zpy;
      this.builderService.counter++;
      this.builderService.openSidebar = false;
      this.builderService.requestDataSidebar = {
        type: 'default',
        name: 'Send message',
        widget_content: []
      };
    }
  }
}

