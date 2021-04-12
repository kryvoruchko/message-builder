import { Component, Input } from '@angular/core';
import { ICard } from 'src/app/builder/models/card.model';
import { IChild } from '../../../../models/child-item.model';
import { BuilderFunctionsService } from '../../../../services/builder-functions.service';
import { BuilderService } from '../../../../services/builder.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: [
    './card-item.component.scss',
    '../../../../assets/general-style.scss',
  ]
})
export class CardItemComponent {
  @Input() item: IChild;
  @Input() opened: number;

  constructor(
    public readonly builderFunctionsService: BuilderFunctionsService,
    public readonly builderService: BuilderService
  ) {}

  uploadFile(item: ICard, files: FileList): void {
    if (files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(files[0]); 
      reader.onload = () => { 
        const imgURL = reader.result;
        item.imgUrl = imgURL as string;

        setTimeout(() => this.builderService.getPointsPosition(), 10);
      }
    }
  }
}
