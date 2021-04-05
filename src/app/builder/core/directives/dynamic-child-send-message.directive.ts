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
import { TextChildComponent } from '../../components/child-items/text-child/text-child.component';
import { ImageChildComponent } from '../../components/child-items/image-child/image-child.component';
import { CardChildComponent } from '../../components/child-items/card-child/card-child.component';
import { IChild } from '../../models/child-item.model';

const components = {
  'text': TextChildComponent,
  'image': ImageChildComponent,
  'card': CardChildComponent,
};

@Directive({
  selector: '[appDynamicChildSendMessage]'
})
export class DynamicChildSendMessageDirective implements OnInit, OnChanges {
  @Input() config: IChild;
  @Input() opened: IChild;

  private component: ComponentRef<any>;

  constructor(
    private readonly resolver: ComponentFactoryResolver,
    private readonly container: ViewContainerRef,
    private readonly renderer: Renderer2
  ) { }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.opened = this.opened;
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      throw new Error('Trying to use an unsupported type (' + this.config.type + ')');
    }
    const component = this.resolver.resolveComponentFactory<IChild>(components[this.config.type]);
    this.component = this.container.createComponent(component);
    this.renderer.addClass(this.component.location.nativeElement, 'child-container');
    this.component.instance.config = this.config;
    this.component.instance.opened = this.opened;
  }
}
