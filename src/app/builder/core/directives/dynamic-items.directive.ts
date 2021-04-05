import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import { SendMessageComponent } from '../../components/main-items/send-message/send-message.component';
import { RandomizerComponent } from '../../components/main-items/randomizer/randomizer.component';
import { IItem } from '../../models/builder-item.model';

const components = {
  'send_message': SendMessageComponent,
  'randomizer': RandomizerComponent,
};

@Directive({
  selector: '[appDynamicItems]'
})
export class DynamicItemsDirective implements OnInit, OnChanges {
  @Input() config: IItem;
  @Input() scale: number;

  private component: ComponentRef<any>;

  constructor(
    private readonly resolver: ComponentFactoryResolver,
    private readonly container: ViewContainerRef,
    private readonly renderer: Renderer2,
  ) { }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.scale = this.scale;
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      throw new Error('Trying to use an unsupported type (' + this.config.type + ')');
    }
    const component = this.resolver.resolveComponentFactory<IItem>(components[this.config.type]);
    this.component = this.container.createComponent(component);
    this.renderer.addClass(this.component.location.nativeElement, 'item-container');
    this.component.instance.config = this.config;
    this.component.instance.scale = this.scale;
  }
}
