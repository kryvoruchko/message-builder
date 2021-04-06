import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { DEFAULT_BUILDER_DATA } from '../../core/constants/builder-default';
import {
  CANVAS_SIZE,
  DEFAULT_POSITION_X,
  DEFAULT_POSITION_Y,
  DEFAULT_SCALE,
  MAX_ZOOM,
  MIN_ZOOM,
  SCALE_STEP,
} from '../../core/constants/host.constants';
import { scalingRange } from '../../core/utils/set-scaling-values';
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

  public items = Array<IItem>();
  public scaleList = [];
  public canvasSize = CANVAS_SIZE;
  public positionX = DEFAULT_POSITION_X;
  public positionY = DEFAULT_POSITION_Y;
  public scale = DEFAULT_SCALE;
  public minZoom = MIN_ZOOM;
  public maxZoom = MAX_ZOOM;

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
  ) {
    this.scaleList = scalingRange(this.maxZoom, this.minZoom, SCALE_STEP);
  }

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
        this.builderService.requestDataSidebar = DEFAULT_BUILDER_DATA;
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

  public toggleCanvasContainer(value: boolean): void {
    this.moving = value;
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
      this.builderService.requestDataSidebar = DEFAULT_BUILDER_DATA;
    }
  }
}

