import { Component, Input } from '@angular/core';
import { IChild } from '../../../models/child-item.model';

@Component({
  selector: 'app-card-child',
  templateUrl: './card-child.component.html',
  styleUrls: ['./card-child.component.scss']
})
export class CardChildComponent {
  @Input() config: IChild;
  @Input() opened: any;
}
