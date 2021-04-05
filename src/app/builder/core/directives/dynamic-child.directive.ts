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
import { SendMessageChildComponent } from '../../components/child-items/send-message-child/send-message-child.component';
import { RandomizerChildComponent } from '../../components/child-items/randomizer-child/randomizer-child.component';
import { IItem } from '../../models/builder-item.model';

const components = {
  'send_message': SendMessageChildComponent,
  'randomizer': RandomizerChildComponent,
};

@Directive({
  selector: '[appDynamicChild]'
})
export class DynamicChildDirective implements OnInit, OnChanges {
  @Input() config: IItem;

  private component: ComponentRef<any>;

  constructor(
    private readonly resolver: ComponentFactoryResolver,
    private readonly container: ViewContainerRef,
    private readonly renderer: Renderer2,
  ) { }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      throw new Error('Trying to use an unsupported type (' + this.config.type + ')');
    }
    const component = this.resolver.resolveComponentFactory<IItem>(components[this.config.type]);
    this.component = this.container.createComponent(component);
    this.renderer.addClass(this.component.location.nativeElement, 'child-container');
    this.component.instance.config = this.config;
  }
}
