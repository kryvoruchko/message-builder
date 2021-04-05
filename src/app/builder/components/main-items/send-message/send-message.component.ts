import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DragNDropComponent } from '../../../containers/drag-n-drop/drag-n-drop.component';
import { BuilderService } from '../../../services/builder.service';
import { BuilderFunctionsService } from '../../../services/builder-functions.service';
import { IItem } from '../../../models/builder-item.model';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: [
    './send-message.component.scss',
    '../../../assets/general-style.scss'
  ]
})
export class SendMessageComponent extends DragNDropComponent implements OnInit {
  @Input() config: IItem;

  constructor(
    public readonly builderService: BuilderService,
    public cd: ChangeDetectorRef,
    public readonly builderFunctionsService: BuilderFunctionsService,
  ) {
    super(builderService, cd);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
