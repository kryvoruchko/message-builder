import { createArrowObj } from '../core/utils/create-arrow';
import { builderUUID } from '../core/utils/uuid-generator';
import { IArrow } from './arrow.model';

export interface IButton {
    uuid?: string;
    title?: string;
    type?: string;
    click?: number;
    btnValue?: string;
    viewSize?: string;
    nextStep?: string;
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
    public nextStep?: string;
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
        this.nextStep = data.hasOwnProperty('nextStep') ? data.nextStep : null;
        this.arrow = createArrowObj(data);
    }
}