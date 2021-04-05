import { Component, Input } from '@angular/core';
import { IChild } from '../../../models/child-item.model';

@Component({
  selector: 'app-image-child',
  templateUrl: './image-child.component.html',
  styleUrls: ['./image-child.component.scss']
})
export class ImageChildComponent {
  @Input() config: IChild;
  @Input() opened: any;
}
