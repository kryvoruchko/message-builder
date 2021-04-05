import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DragulaModule } from 'ng2-dragula';

import { BuilderComponent } from './containers/builder/builder.component';
import { DragNDropComponent } from './containers/drag-n-drop/drag-n-drop.component';
import { SendMessageComponent } from './components/main-items/send-message/send-message.component';
import { RandomizerComponent } from './components/main-items/randomizer/randomizer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SendMessageItemsComponent } from './components/sidebar/send-message-items/send-message-items.component';
import { TextItemComponent } from './components/sidebar/send-message-items/text-item/text-item.component';
import { ImageItemComponent } from './components/sidebar/send-message-items/image-item/image-item.component';
import { CardItemComponent } from './components/sidebar/send-message-items/card-item/card-item.component';
import { ButtonsItemComponent } from './components/sidebar/buttons-item/buttons-item.component';
import { RandomizerItemsComponent } from './components/sidebar/randomizer-items/randomizer-items.component';
import { SendMessageChildComponent } from './components/child-items/send-message-child/send-message-child.component';
import { TextChildComponent } from './components/child-items/text-child/text-child.component';
import { ImageChildComponent } from './components/child-items/image-child/image-child.component';
import { CardChildComponent } from './components/child-items/card-child/card-child.component';
import { RandomizerChildComponent } from './components/child-items/randomizer-child/randomizer-child.component';
import { CreateMainItemComponent } from './components/create-main-item/create-main-item.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ArrowComponent } from './containers/arrow/arrow.component';

import { DynamicChildSendMessageDirective } from './core/directives/dynamic-child-send-message.directive';
import { DragItemDirective } from './core/directives/drag-item.directive';
import { MouseWheelDirective } from './core/directives/mousewheel.directive';
import { DynamicChildDirective } from './core/directives/dynamic-child.directive';
import { DynamicItemsDirective } from './core/directives/dynamic-items.directive';
import { ClickOutsideDirective } from './core/directives/click-outside.directive';

import { TypeIconButtonPipe } from './core/pipes/type-icon-button.pipe';
import { NameNextStepPipe } from './core/pipes/name-next-step.pipe';
import { SumRandomsValuePipe } from './core/pipes/sum-randoms-value.pipe';
import { TypeNextStepPipe } from './core/pipes/type-next-step.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DragulaModule.forRoot(),
  ],
  declarations: [
    BuilderComponent,
    DragNDropComponent,
    SendMessageComponent,
    RandomizerComponent,
    SidebarComponent,
    SendMessageItemsComponent,
    TextItemComponent,
    ImageItemComponent,
    CardItemComponent,
    ButtonsItemComponent,
    RandomizerItemsComponent,
    SendMessageChildComponent,
    TextChildComponent,
    ImageChildComponent,
    CardChildComponent,
    RandomizerChildComponent,
    CreateMainItemComponent,
    ButtonsComponent,
    ArrowComponent,

    DynamicChildSendMessageDirective,
    DragItemDirective,
    MouseWheelDirective,
    DynamicItemsDirective,
    DynamicChildDirective,
    ClickOutsideDirective,

    TypeIconButtonPipe,
    NameNextStepPipe,
    SumRandomsValuePipe,
    TypeNextStepPipe,
  ],
  exports: [
    BuilderComponent,
  ],
})

export class BuilderModule { }
