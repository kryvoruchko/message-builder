import { createArrowObj } from '../core/utils/create-arrow';
import { builderUUID } from '../core/utils/uuid-generator';
import { IArrow } from './arrow.model';
import { Child, IChild } from './child-item.model';
import { IRandomizer } from './randomizer.model';

export interface IItem {
    x?: number;
    y?: number;
    name?: string;
    nextStep?: string;
    uuid?: string;
    type?: string;
    startStep?: boolean;
    widgetContent?: IChild[] | IRandomizer[];
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
    public nextStep: string;
    public startStep: boolean;
    public widgetContent: IChild[] | IRandomizer[];
    public arrow: {
        from: IArrow,
        to: IArrow
    };
  
    constructor(data?: IItem) {
        this.uuid = data.hasOwnProperty('uuid') ? data.uuid : builderUUID();
        this.arrow = createArrowObj(data);
        this.type = data.hasOwnProperty('type') ? data.type : 'sendMessage';
        this.name = data.hasOwnProperty('name') ? data.name : 'Send message';
        this.nextStep = data.hasOwnProperty('nextStep') ? data.nextStep : null;
        this.startStep = data.hasOwnProperty('startStep') ? data.startStep : false;
        this.widgetContent = data.hasOwnProperty('widgetContent') ? data.widgetContent : [new Child({})];
        this.x = data.hasOwnProperty('x') ? data.x : 9800;
        this.y = data.hasOwnProperty('y') ? data.y : 9800;
    }
}