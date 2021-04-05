import { Component, Input } from '@angular/core';
import { BuilderService } from '../../services/builder.service';
import { IButton } from '../../models/button.model';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
  @Input() type: string;
  @Input() opened: any;
  @Input() buttons: IButton[];

  constructor(public builderService: BuilderService) {}
}
