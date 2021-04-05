import { builderUUID } from '../core/utils/uuid-generator';
import { Arrow, IArrow } from './arrow.model';

export interface IButton {
    uuid?: string;
    title?: string;
    type?: string;
    click?: number;
    btnValue?: string;
    viewSize?: string;
    next_step?: string;
    arrow?: {
        from?: IArrow,
        to?: IArrow
    };
}
  
export class Button implements IButton {
    public uuid?: string;
    public title?: string;
    public type?: string;
    public click?: number;
    public btnValue?: string;
    public viewSize?: string;
    public next_step?: string;
    public arrow?: {
        from?: IArrow,
        to?: IArrow
    };

    constructor(data?: IButton) {
        this.uuid = data.uuid ? data.uuid : builderUUID();
        this.title = data.hasOwnProperty('title') ? data.title : null;
        this.type = data.hasOwnProperty('type') ? data.type : null;
        this.click = data.hasOwnProperty('click') ? data.click : 0;
        this.btnValue = data.hasOwnProperty('btnValue') ? data.btnValue : null;
        this.viewSize = data.hasOwnProperty('viewSize') ? data.viewSize : 'native';
        this.next_step = data.hasOwnProperty('next_step') ? data.next_step : null;
        this.arrow = this.createArrowObj(data);
    }
  
    private createArrowObj (data?: IButton): any {
        const toArrowData = data.hasOwnProperty('arrow') ? data.arrow.to : null;
        const fromArrowData = data.hasOwnProperty('arrow') ? data.arrow.from : null;
        return { from: new Arrow(fromArrowData), to: new Arrow(toArrowData) };
    }
}