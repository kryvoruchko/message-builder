import { Component, Input, OnInit } from '@angular/core';
import { BuilderService } from '../../../services/builder.service';
import { BuilderFunctionsService } from '../../../services/builder-functions.service';
import { Button } from '../../../models/button.model';
import { builderUUID } from '../../../core/utils/uuid-generator';

@Component({
  selector: 'app-buttons-item',
  templateUrl: './buttons-item.component.html',
  styleUrls: ['./buttons-item.component.scss']
})
export class ButtonsItemComponent implements OnInit {
  @Input() config: any;
  @Input() opened: number;
  @Input() type: string;

  constructor(
    public readonly builderFunctionsService: BuilderFunctionsService,
    private readonly builderService: BuilderService,
  ) {}

  ngOnInit() {
    if (this.config && this.config.length > 0) {
      this.config.forEach(button => {
        if (!button.viewSize) {
          button.viewSize = 'native';
        }
      });
    }
  }

  createNewButton(): void {
    const id = builderUUID();
    this.config.push(new Button({
      uuid: id,
      title: 'New Button #' + (this.config.length + 1),
      type: '',
      next_step: '',
      arrow: {
        from: {
          id: id,
          fromItemX: 10000,
          fromItemY: 10000
        },
        to: {
          id: null,
          toItemX: null,
          toItemY: null
        }
      }
    }));

    setTimeout(() => this.builderService.getPointsPosition(), 10);
  }
}
