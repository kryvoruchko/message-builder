import { Component, Input } from '@angular/core';
import { IChild } from '../../../models/child-item.model';

@Component({
  selector: 'app-text-child',
  templateUrl: './text-child.component.html',
  styleUrls: ['./text-child.component.scss']
})
export class TextChildComponent {
  @Input() config: IChild;
  @Input() opened: any;
}
