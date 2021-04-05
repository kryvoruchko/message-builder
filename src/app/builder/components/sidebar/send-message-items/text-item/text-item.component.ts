import { Component, Input } from '@angular/core';
import { IChild } from '../../../../models/child-item.model';
import { BuilderFunctionsService } from '../../../../services/builder-functions.service';

@Component({
  selector: 'app-text-item',
  templateUrl: './text-item.component.html',
  styleUrls: [
    '../../../../assets/general-style.scss',
    './text-item.component.scss',
  ]
})
export class TextItemComponent {
  @Input() item: IChild;
  @Input() opened: number;

  constructor(public builderFunctionsService: BuilderFunctionsService) {}
}
