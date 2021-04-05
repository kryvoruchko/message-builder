import { Component, Input } from '@angular/core';
import { IItem } from '../../../models/builder-item.model';

@Component({
  selector: 'app-send-message-child',
  templateUrl: './send-message-child.component.html',
  styleUrls: ['./send-message-child.component.scss']
})
export class SendMessageChildComponent {
  @Input() config: IItem;
}
