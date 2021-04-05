import { builderUUID } from '../core/utils/uuid-generator';
import { Arrow, IArrow } from './arrow.model';
import { Child, IChild } from './child-item.model';
import { IRandomizer } from './randomizer.model';

export interface IItem {
    x?: number;
    y?: number;
    name?: string;
    next_step?: string;
    uuid?: string;
    type?: string;
    start_step?: boolean;
    widget_content?: IChild[] | IRandomizer[];
    arrow?: {
        from: IArrow,
        to: IArrow
    };
}
  
export class Item implements IItem {
    public x: number;
    public y: number;
    public uuid: string;
    public type: string;
    public name: string;
    public next_step: string;
    public start_step: boolean;
    public widget_content: IChild[] | IRandomizer[];
    public arrow: {
        from: IArrow,
        to: IArrow
    };
  
    constructor(data?: IItem) {
        this.uuid = data.hasOwnProperty('uuid') ? data.uuid : builderUUID();
        this.arrow = this.createArrowObj(data);
        this.type = data.hasOwnProperty('type') ? data.type : 'send_message';
        this.name = data.hasOwnProperty('name') ? data.name : 'Send message';
        this.next_step = data.hasOwnProperty('next_step') ? data.next_step : null;
        this.start_step = data.hasOwnProperty('start_step') ? data.start_step : false;
        this.widget_content = data.hasOwnProperty('widget_content') ? data.widget_content : [new Child({})];
        this.x = data.hasOwnProperty('x') ? data.x : 9800;
        this.y = data.hasOwnProperty('y') ? data.y : 9800;
    }
  
    private createArrowObj (data: IItem): any {
        const toArrowData = data.hasOwnProperty('arrow') ? data.arrow.to : null;
        const fromArrowData = data.hasOwnProperty('arrow') ? data.arrow.from : null;
        return { from: new Arrow(fromArrowData), to: new Arrow(toArrowData) };
    }
}