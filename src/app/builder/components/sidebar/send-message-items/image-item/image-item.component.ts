import { Component, Input } from '@angular/core';
import { IChild } from '../../../../models/child-item.model';
import { IImage } from '../../../../models/image.model';
import { BuilderFunctionsService } from '../../../../services/builder-functions.service';
import { BuilderService } from '../../../../services/builder.service';

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: [
    '../../../../assets/general-style.scss',
    './image-item.component.scss',
  ]
})
export class ImageItemComponent {
  @Input() item: IChild;
  @Input() opened: number;

  constructor(
    public readonly builderFunctionsService: BuilderFunctionsService,
    public readonly builderService: BuilderService,
  ) {}

  uploadFile(item: IImage, files: FileList): void {
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
