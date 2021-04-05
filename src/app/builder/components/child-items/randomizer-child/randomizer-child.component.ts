import { Component, Input } from '@angular/core';
import { BuilderService } from '../../../services/builder.service';

@Component({
  selector: 'app-randomizer-child',
  templateUrl: './randomizer-child.component.html',
  styleUrls: ['./randomizer-child.component.scss']
})
export class RandomizerChildComponent {
  @Input() config;

  constructor(public builderService: BuilderService) {}
}
