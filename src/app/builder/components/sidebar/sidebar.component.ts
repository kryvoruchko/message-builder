import { Component, Input } from '@angular/core';
import { DEFAULT_BUILDER_DATA } from '../../core/constants/builder-default';
import { IItem } from '../../models/builder-item.model';
import { BuilderService } from '../../services/builder.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() config: IItem;

  constructor(public readonly builderService: BuilderService) {}

  public openBuilderSidebar() {
    this.builderService.openSidebar = !this.builderService.openSidebar;
    this.builderService.requestDataSidebar = DEFAULT_BUILDER_DATA;
  }
}
