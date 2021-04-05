import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DragNDropComponent } from '../../../containers/drag-n-drop/drag-n-drop.component';
import { BuilderFunctionsService } from '../../../services/builder-functions.service';
import { BuilderService } from '../../../services/builder.service';
import { IItem } from '../../../models/builder-item.model';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: [
    './randomizer.component.scss',
    '../../../assets/general-style.scss'
  ]
})
export class RandomizerComponent extends DragNDropComponent implements OnInit {
  @Input() config: IItem;

  constructor(
    public builderService: BuilderService,
    public cd: ChangeDetectorRef,
    public readonly builderFunctionsService: BuilderFunctionsService,
  ) {
    super(builderService, cd);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
